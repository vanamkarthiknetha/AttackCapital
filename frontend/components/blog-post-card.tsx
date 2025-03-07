import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BlogPostCardProps {
  post: {
    _id: string
    title: string
    content: string
    authorId: string
    authorEmail:string
    createdAt: string
  }
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.authorEmail} alt={post.authorEmail} />
            <AvatarFallback>{post.authorEmail?post.authorEmail[0]:"U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.authorEmail?post.authorEmail.split("@")[0]:"Unknown"}</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  )
}

