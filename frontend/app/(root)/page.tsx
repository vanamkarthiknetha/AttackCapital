import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BlogPostCard from "@/components/blog-post-card"


export default async function Home() {
  let posts = []

  const getAllPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`); // Adjust endpoint if needed
      const data= await response.json();
      if(data.success){
        return data.postsWithAuthors
      }
      return []
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  posts = await getAllPosts()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to Our Blog</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Discover the latest articles, tutorials, and insights from our team of experts.
        </p>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Posts</h2>
          <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-primary">
            Write a post
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

