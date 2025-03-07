"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loggedIn, setloggedIn] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  
  const [theme, setTheme] = useState("light"); // Default to 'light'
  const [mounted, setMounted] = useState(false); // Prevent hydration issue

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);
  
 

  useEffect(() => {
    if(localStorage.getItem("blogs-token")) setloggedIn(true)
    else setloggedIn(false)
  }, [pathname]);

  if (!mounted) return null; // Avoid hydration mismatch

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const logOut = () => {
    localStorage.removeItem("blogs-token")
    setloggedIn(false)
    router.push('/login')
  };



  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-xl font-bold">Blogs</span>
        </Link>

        <div className="hidden flex-1 items-center justify-between md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className={pathname === "/" ? "text-foreground" : "text-muted-foreground"}>
              Home
            </Link>
            {loggedIn && (
              <Link
                href="/dashboard"
                className={pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="" onClick={toggleTheme}>
              {theme=="light"?"dark":"light"}
            </Button>
            {loggedIn ? (
              <Button variant="ghost" onClick={logOut}>Sign Out</Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end md:hidden gap-4">
        <Button className="px-2" onClick={toggleTheme}>
              {theme=="light"?"dark":"light"}
            </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sticky inset-0 top-16 z-50 bg-background md:hidden">
          <div className="container flex h-full flex-col p-4">
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={closeMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>

            <nav className="mt-8 flex flex-col space-y-6 text-lg font-medium">
              <Link
                href="/"
                className={pathname === "/" ? "text-foreground" : "text-muted-foreground"}
                onClick={closeMenu}
              >
                Home
              </Link>
              {loggedIn && (
                <Link
                  href="/dashboard"
                  className={pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}
            </nav>

            <div className="mt-auto flex flex-col space-y-4 pb-8">
              {loggedIn ? (
                <Button onClick={logOut}>Sign Out</Button>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={closeMenu}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

