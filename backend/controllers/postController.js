import mongoose from 'mongoose';
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, authorId: req.user.id });
  await post.save();
  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const { author } = req.query;
  if(author && !mongoose.Types.ObjectId.isValid(author))
    return res.json({error:"Not a valid userId"})
  const posts = author ? await Post.find({ authorId: author }) : await Post.find();
  res.json(posts);
};