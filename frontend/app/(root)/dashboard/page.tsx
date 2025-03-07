"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewPostForm from "@/components/new-post-form"
import UserPostsList from "@/components/user-post-list"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"


export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [userPosts, setuserPosts] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (!localStorage.getItem("blogs-token")){
      router.push('/login')
      return
    }
    getUserPosts()
  }, []);
  const getUserPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/mine`, {
        headers: {
          "Authorization": `${localStorage.getItem("blogs-token")}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const posts = data.posts
        setuserPosts(posts)
        return
      } else {
        toast(data.message)
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam === "new" || tabParam === "posts") {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="new">New Post</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <UserPostsList posts={userPosts} />
        </TabsContent>

        <TabsContent value="new">
          <NewPostForm getUserPosts={getUserPosts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

