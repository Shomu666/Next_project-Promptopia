"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import copy from '@/assets/icons/copy.svg'
import tick from '@/assets/icons/tick.svg'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('')
  

  const {data: session} = useSession()
  const pathname = usePathname();

  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/profile/?id=${prompt.creator.id}`)
  }

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {setCopied("")}, 2000)
  }
  return (
    <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
      <div className='flex justify-between items-start gap-5'>
        
        <div className='flex-1 flex items-center justify-start gap-3 cursor-pointer' onClick={() => handleProfileClick}>
          <Image src={prompt.creator.image} alt='user_image' width={30} height={30} className='rounded-full border-1 border-teal-600'/>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-semibold'>{prompt.creator.username}</h2>
            <p className='text-teal-950'>{prompt.creator.email}</p>
          </div>
        </div>
        
        <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer' onClick={handleCopy}>
           <Image src={copied === prompt.prompt ? tick : copy} alt='copy_btn' width={22} height={22}/>
        </div>
      </div>
      <p className='my-2 text-sm font-semibold'>
        {prompt.prompt}
      </p>
      <p className='text-sm text bg-gradient-to-r from-violet-500 via-blue-400 to-green-400 bg-clip-text text-transparent cursor-pointer' onClick={() => handleTagClick(prompt.tag)}>
        #{prompt.tag}
      </p>
      { session?.user.id === prompt.creator._id  && pathname === '/profile' && 
      (
        <div className='p-3 flex items-center justify-between gap-2'>
          <div className='py-1 px-4 rounded-full border-1 border-teal-600'>
          <p className='text-sm bg-gradient-to-r from bg-green-600 via-blue-900 to-teal-700 bg-clip-text text-transparent cursor-pointer' onClick={handleEdit}>
             Edit
          </p>
          </div>
          <div className='py-1 px-4 rounded-full border-1 border-amber-600'>
          <p className='text-sm bg-gradient-to-r from bg-red-600 via-yellow-900 to-orange-700 bg-clip-text text-transparent cursor-pointer' onClick={handleDelete}>
             Delete
          </p>
          </div>
          
        </div>
      )

      }
      
    </div>
  )
}

export default PromptCard
