import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try{
  const { title, content } = req.body;
  if(!title || !content){
    return res.status(400).json({success:false,message:"Missing fields"})
  }
  const user = await User.findById(req.user.id) 
  if(!user) return res.status(400).json({success:false,message:"User doesn't exist"})
  const post = new Post({ title, content, authorId: user.id });
  await post.save();
  res.status(201).json({success:true,post,message:"Posted successfully"});
} catch (error) {
  console.log(error);
  res.json({ success: false, message: "Internal server error" });
}
};

export const getPosts = async (req, res) => {
  try {
    const { author } = req.query;

    if (author && !mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ error: "Not a valid userId" });
    }

    let authorEmail = null;

    if (author) {
      const authorDetails = await User.findById(author).select("email");
      if (!authorDetails) {
        return res.status(404).json({ error: "Author not found" });
      }
      authorEmail = authorDetails.email;
    }

    let posts = author
      ? await Post.find({ authorId: author }).sort({ createdAt: -1 })
      : await Post.find().sort({ createdAt: -1 });

    // If there's no author filter, fetch emails manually for all posts
    const postsWithAuthors = author
      ? posts.map((post) => ({
          ...post._doc,
          authorEmail,
        }))
      : await Promise.all(
          posts.map(async (post) => {
            const authorDetails = await User.findById(post.authorId).select(
              "email"
            );
            return {
              ...post._doc,
              authorEmail: authorDetails ? authorDetails.email : null,
            };
          })
        );

    res.json({success:true,postsWithAuthors});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const { id } = req.user;
    const author = id;
    const posts = await Post.find({ authorId: author }).sort({ createdAt: -1 })
    res.json( {success: true, message:"Fetched successfully",posts});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};
