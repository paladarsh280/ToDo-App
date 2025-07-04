import Link from "next/link"
import Button from "@mui/material/Button"
import Image from "next/image"

export default function Home() {
  return (
    <>
      
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-extrabold text-blue-600 tracking-wide">
              Team<span className="text-gray-800">ToDo</span>
            </div>

            <nav className="flex items-center gap-4">
              <Link href="/our_team" passHref>
                <Button
                  variant="outlined"
                  className="!text-blue-600 !border-blue-600 hover:!bg-blue-50"
                >
                  Our Team
                </Button>
              </Link>

              <Link href="/login" passHref>
                <Button
                  variant="outlined"
                  className="!text-green-600 !border-green-600 hover:!bg-green-50"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup" passHref>
                <Button
                  variant="outlined"
                  className="!text-purple-600 !border-purple-600 hover:!bg-purple-50"
                >
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      
   <div className="w-full  mt-0">
  <img
    src="/teamwork2.png"
    alt="Teamwork illustration"
    className="w-full h-full object-cover"
  />
</div>

    </>
  )
}
