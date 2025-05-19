'use client';

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
   return (
    <div className='mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
       {data.map((prompt) => {
        return (
          <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick}/>
        )
       })}
    </div>
   )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
     const fetchPosts = async () => {
       const res = await fetch('api/prompt');
       const data = await res.json();

       setPosts(data)
     }

     fetchPosts();
  }, [])

  const filteredPosts = posts.filter((post) => {
    const search = searchText.toLowerCase();

    return (
      post.prompt.toLowerCase().includes(search) || post.tag.toLowerCase().includes(search) || post.creator.username.toLowerCase().includes(search)
    )
  })
  return (
    <div className='my-10 p-2'>
      <form className='flex items-center'>
         <input className='w-full rounded-md px-3 shadow-xl border-1 border-teal-800 h-10' value={searchText} onChange={handleSearchChange} placeholder='Search for promt, tag or person'/>
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={(tag)=> setSearchText(tag)}/>
    </div>
  )
}

export default Feed
