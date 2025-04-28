import React from 'react'

// Next Library support
import Image from 'next/image'

// Image Paths
import Instagram from "../../../public/assets/instagram.png"
import Facebook from "../../../public/assets/facebook.png"
import Twitter from "../../../public/assets/twitter.png"


function Footer() {
    return (
        <div>
            <footer className="bg-indigo-600 text-white py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Evently</h3>
                        <p className="text-gray-300">Experience more, worry less.</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-semibold mb-2">Quick Links</h4>
                        <a href="#" className="text-gray-300 hover:underline">Home</a>
                        <a href="#" className="text-gray-300 hover:underline">Browse Events</a>
                        <a href="#" className="text-gray-300 hover:underline">Contact Us</a>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Image
                                    src={Instagram}
                                    height={24}
                                    width={24}
                                    alt='instaIcons'
                                    className='bg-transparent'
                                />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Image
                                    src={Facebook}
                                    height={24}
                                    width={24}
                                    alt='instaIcons'
                                    className='bg-transparent'
                                />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <Image
                                    src={Twitter}
                                    height={24}
                                    width={24}
                                    alt='instaIcons'
                                    className='bg-transparent'
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-400 mt-8 text-sm">
                    © {new Date().getFullYear()} Evently. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Footer