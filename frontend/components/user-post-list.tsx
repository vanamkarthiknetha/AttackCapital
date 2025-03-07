import Link from "next/link"
import { Edit, Trash } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface UserPostsListProps {
  posts: {
    _id: string
    title: string
    content: string
    authorId: string
    authorEmail:string
    createdAt: string
  }[]
}

export default function UserPostsList({ posts }: UserPostsListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">You haven&apos;t created any posts yet.</p>
          <Button asChild>
            <Link href="/dashboard?tab=new">Create your first post</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post._id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              Published {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

