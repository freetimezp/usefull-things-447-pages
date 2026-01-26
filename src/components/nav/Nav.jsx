'use client'

import { Link } from 'next-view-transitions'
import React from 'react'
import { usePathname } from 'next/navigation'

const Nav = () => {
  const pathname = usePathname()

  const handleClick = (e, href) =>{
    if (pathname === href) {
      e.preventDefault()
    }
  }
  return (
    <nav className='fixed h-fit text-xl inset-0 w-full p-6 z-50'>
      <div className='flex gap-8 text-white font-medium tracking-wide'>
        <Link href="/" onClick={(e) => handleClick(e, "/")}>Home</Link>
        <Link href="/services" onClick={(e) => handleClick(e, "/services")}>Services</Link>
      </div>
    </nav>
  )
}

export default Nav