"use client"

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Testimonials from "@/components/common/Testimonials";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/utils/constant";
import { useRouter } from "next/navigation";


const Home = () => {
  const router = useRouter()

  const navToSignUp = () => {
    router.push(ROUTES.SIGN_UP)
  }

  const navToLogIn = () => {
    router.push(ROUTES.LOGIN)
  }

  const navToEvents = () => {
    router.push(ROUTES.USER_EVENTS)
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="flex">
          <Link
            className="flex title-font font-medium items-center text-gray-900 md:mb-0"
            href={ROUTES.HOME}
          >
            <Image
              src={"/assets/eventlyLogo1.png"}
              alt='logo'
              className='object-contain'
              width={130}
              height={60}
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700">
          <Link href="#">Home</Link>
          <Link href="#">Browse Events</Link>
          <Link href="#">Contact Us</Link>
        </nav>
        <div className="flex gap-4">
          <button onClick={navToLogIn} className="px-4 py-2 cursor-pointer border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50">
            Login
          </button>
          <button onClick={navToSignUp} className="px-4 py-2 cursor-pointer font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Signup
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center bg-gradient-to-b from-indigo-50 to-white p-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">
          Find and Book Your Next Event
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
          Concerts, festivals, workshops, and more — explore unforgettable experiences.
        </p>
        <button onClick={navToEvents} className="px-8 py-3 bg-indigo-600 text-white rounded-full font-black cursor-pointer hover:bg-indigo-700 text-lg">
          Browse Events
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose EventBook?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="text-indigo-600 mb-4 text-5xl">🎉</div>
              <h3 className="text-xl font-semibold mb-2">Discover Local Events</h3>
              <p className="text-gray-600">
                Find concerts, festivals, and workshops happening near you.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-indigo-600 mb-4 text-5xl">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Easy & Secure Booking</h3>
              <p className="text-gray-600">
                Book your tickets safely with just a few clicks.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-indigo-600 mb-4 text-5xl">📲</div>
              <h3 className="text-xl font-semibold mb-2">Instant E-Tickets</h3>
              <p className="text-gray-600">
                Get your tickets instantly on your phone — no need to print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;