'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="nav ">
      <div className="flex  items-center justify-center container-fluid mx-auto px-5 border-b-[1px] border-solid border-black">
        <div className="nav logo">
          <a href="/" className="nav-logo">
            <Image src="/img/logo-1.png" alt="logo" width={80} height={80} />
          </a>
        </div>
        <div className={isOpen ? 'active links' : 'hide links'} id="links">
          <div className="cancel">
            <span
              className={isOpen ? 'cancel-btn active' : 'cancel-btn hide'}
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>

          <a href="/#about-id">Home</a>
          <a href="/#about-id">About Rafiki</a>
          <a href="/#care">Our Care Program</a>
          <a href="https://www.linkedin.com/company/rafikiai-app/">Resources</a>
          <button
            onClick={() => {
              router.push('https://calendly.com/culturelyft/rafiki-demo')
            }}
            className="uppercase block w-[200px] px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#13A8BD] border border-transparent rounded-lg active:bg-[#13A8BD] hover:bg-[#01382E] focus:outline-none focus:shadow-outline-purple lg:ml-10"
          >
            Speak To Our Team
          </button>
          <button className=" flex items-center justify-center gap-2  px-4 py-2 text-sm font-medium leading-5 text-center text-[#01382E] transition-colors duration-150 border-[#01382E]  border-solid border-2 rounded-lg active:bg-[#01382E] hover:bg-[#01382E] hover:text-white focus:outline-none focus:shadow-outline-purple mx-3"  onClick={() => {
              router.push('chat')
            }}>
            TRY RAFIKI FOR FREE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
        </div>
        <div className="menu-bar">
          <span className={isOpen ? 'hide text-white' : ' active'} onClick={() => setOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
