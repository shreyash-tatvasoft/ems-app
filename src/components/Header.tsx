"use client";

import Link from 'next/link';
import { ROUTES } from '@/utils/constant';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/utils/helper';

interface HeaderPageProps {
  toggleSidebar?: () => void, 
  isAdmiRole?: boolean
}

const  Header : React.FC<HeaderPageProps> = ({ toggleSidebar, isAdmiRole = false}) => {

    const [authToken, setAuthToken] = useState("")
    const router = useRouter()

    const navToLogIn = () => {
        router.push(ROUTES.LOGIN)
    }

    const navToSignUp = () => {
        router.push(ROUTES.SIGN_UP)
    }

    const handleLogout = () => {
        localStorage.clear()
        router.push(ROUTES.LOGIN)
    }

    const navToProfile = () => {
        router.push(ROUTES.USER_PROFILE)
    }

    useEffect(() => {
      const token = getAuthToken()
      if(token !== "") {
         setAuthToken(token)

      }
    }, [authToken])

    return (
      <div>
        <header className="text-gray-600 body-font border-b border-b-gray-200">
          <div className="mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
            <div className="flex gap-2">
              <Link
                className="flex title-font font-medium items-center text-gray-900 md:mb-0"
                href={ROUTES.HOME}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 130 60"
                  width="130"
                  height="40"
                  fill="url(#gradient)"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#67e8f9" />
                    </linearGradient>
                  </defs>
                  <text
                    x="0"
                    y="45"
                     fontFamily="'Poppins', sans-serif"
                    fontSize="40"
                    fontWeight="600"
                    fill="url(#gradient)"
                  >
                    Evently
                  </text>
                </svg>
              </Link>

              {isAdmiRole && (
                <button
                  onClick={toggleSidebar}
                  className="text-gray-700 md:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex gap-4 items-center">
              {authToken !== "" ? (
                <div className="flex gap-4 items-center">
                  <Image
                    src={"/assets/ProfileIcon.svg"}
                    width={40}
                    height={40}
                    alt="Logo"
                    className="cursor-pointer"
                    onClick={navToProfile}
                  />

                  <Button
                    variant="link"
                    onClick={handleLogout}
                    className="cursor-pointer text-base"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    variant="link"
                    onClick={navToLogIn}
                    className="cursor-pointer text-base"
                  >
                    Login
                  </Button>

                  <Button
                    variant="link"
                    onClick={navToSignUp}
                    className="cursor-pointer text-base"
                  >
                    Signup
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    );
}

export default Header