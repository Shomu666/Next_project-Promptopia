'use client';

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@/components/Profile';


const UserProfile = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id')
    const userName = searchParams.get('name')
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
      const fetchUserPosts = async () => {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setUserPosts(data)
      }

      if(userId){
        fetchUserPosts()
      }
    }, [userId])

  return (
    <div>
      <Profile name={userName} desc={`Welcome to ${userName}'s profile`} data={userPosts}/>
    </div>
  )
}

export default UserProfile
