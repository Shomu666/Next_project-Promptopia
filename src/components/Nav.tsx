"use client";

import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ClientSafeProvider } from 'next-auth/react';
import logo from '../assets/images/logo.svg'

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
     const fetchProviders = async () => {
       const response = await getProviders();

       setProviders(response)
     }
     fetchProviders()
  }, [])
  return (
    <nav className='w-full flex justify-between mb-16 pt-5 px-5'>
     <Link href="/" className='flex gap-2 items-center'>
       <Image src={logo} alt='Fucking hell' width={40} height={40} className='object-contain'/>
       <p className='font-bold text-md hidden sm:block'>Promptopia</p>
     </Link>
     
     {/*Desktop view */}
     <div className='sm:flex hidden'>
      {session?.user ? (
        <div className='flex gap-3'>
          <Link href='/create-prompt' className='text-center w-30 h-10 px-3 py-2 rounded-3xl bg-gray-600 text-teal-400 hover:bg-white hover:outline-1 hover:outline-indigo-500'>
           Create Post
          </Link>
          <button type='button' className='w-30 h-10 px-3 py-2 rounded-3xl outline-1 outline-indigo-500 text-teal-400 hover:bg-gray-600 hover:outline-0 cursor-pointer'
          onClick={() => signOut()} >
            Sign out
          </button>
          <Link href='/profile'>
             <Image src={session.user?.image} alt='profile' width={37} height={37} className='rounded-full'/>
          </Link>
        </div>
      ) : (
        <div>
           { providers && Object.values(providers).map((provider) => {
              return (
                   <button key={provider.name} onClick={()=> signIn(provider.id)} className='w-30 h-10 px-3 py-2 rounded-3xl outline-1 outline-indigo-500 text-teal-400 hover:bg-gray-600 hover:outline-0 cursor-pointer'>
                          Sign in
                   </button>)
              })
            }
        </div>
      )}
     </div>

     <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div>
            <Image src={session.user.image} alt='profile' width={37} height={37} className='cursor-pointer rounded-full' onClick={() => setToggleDropdown((prev) => !prev)}/>

              {toggleDropdown && (
                <div className='absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-gradient-to-b from-orange-100 via-red-100 to-yellow-100 min-w-[210px] flex flex-col gap-2 justify-end transition-all duration-300 ease-in'>
                    <Link href='/create-prompt' className='text-center px-3 py-2 rounded-3xl bg-gray-600 text-teal-400 text-md font-medium hover:bg-transparent hover:outline-1 hover:outline-indigo-500'>Create Post</Link>
                    <Link href='/profile' className='text-center px-3 py-2 rounded-3xl bg-gray-600 text-teal-400 text-md font-medium hover:bg-transparent hover:outline-1 hover:outline-indigo-500'>Profile</Link>
                    <button type='button' className='text-center px-3 py-2 rounded-3xl outline-1 outline-indigo-500 text-teal-400 text-md font-medium hover:bg-gray-500 hover:outline-0 cursor-pointer'>Sign Out</button>
                </div>
              )}
          </div>

        ): (
          <div>
            { providers && Object.values(providers).map((provider) => {
              return (
                   <button key={provider.name} onClick={()=> signIn(provider.id)} className='w-30 h-10 px-3 py-2 rounded-3xl outline-1 outline-indigo-500 text-teal-400 hover:bg-gray-600 hover:outline-0 cursor-pointer'>
                          Sign in
                   </button>
              )
              })
            }
          </div>
        )}
     </div>
    </nav>
  )
}

export default Nav
