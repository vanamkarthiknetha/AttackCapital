import Link from "next/link"
import SignupForm from "@/components/sign-up-form"

export default function SignupPage() {

  return (
    <div className="container mx-auto flex h-screen max-w-md flex-col items-center justify-center px-4">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">Enter your information to create an account</p>
        </div>
        <SignupForm />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

