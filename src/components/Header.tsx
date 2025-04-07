"use client";

import Link from 'next/link';
import { ROUTES } from '@/utils/constant';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/utils/helper';

const  Header : React.FC = () => {

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
        <header className="text-gray-600 body-font shadow-md border-b border-b-gray-200">
          <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              href={ROUTES.HOME}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="ml-3 text-xl">Evently</span>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"></nav>
            <div className="flex gap-4 items-center">
              {authToken !== "" ? (
                <div className='flex gap-4 items-center'>
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