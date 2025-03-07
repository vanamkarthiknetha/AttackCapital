"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function NewPostForm({getUserPosts}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/post`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("blogs-token")}`
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    if (data.success) {
      toast(data.message)
      setTitle("")
      setContent("")
      getUserPosts()
    } else {
      toast(data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter the title of your post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your post content here..."
          className="min-h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="text-center">
      <Button type="submit" className="w-[25%] ">
        Create Post
      </Button>
      </div>
    </form>
  )
}

