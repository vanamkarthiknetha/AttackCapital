import Link from "next/link"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto flex h-screen max-w-md flex-col items-center justify-center px-4">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
        </div>
        <LoginForm />
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

