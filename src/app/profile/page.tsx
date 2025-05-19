'use client';

import React, { useEffect, useState } from 'react'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
const {data: session} = useSession()
const router = useRouter();

  const [posts, setPosts] = useState([])
  const handleEdit = (post) => {
     router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE"
        })
        const filteredPosts = posts.filter((p) => p._id !== post._id );
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {

    if(!session?.user?.id){
      return 
    }
      const fetchUserPosts = async () => {
        const res = await fetch(`api/users/${session.user.id}/posts`)
        const data =await res.json()
        setPosts(data)
      }

      fetchUserPosts()
  }, [])
  return (
    <div>
      <Profile name='My' desc='Welcome to your personalized profile page' handleEdit={handleEdit} handleDelete={handleDelete} data={posts}/>
    </div>
  )
}

export default MyProfile
