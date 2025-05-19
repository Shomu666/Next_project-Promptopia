import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className='w-full'>
      <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>{name} Profile</h1>
      <p className='mt-2 text-sm text-gray-700 font-medium'>{desc}</p>
      <div className='mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
       {data.map((prompt) => {
        return (
          <PromptCard key={prompt._id} prompt={prompt} handleEdit={() => handleEdit && handleEdit(prompt)} handleDelete={() => handleDelete && handleDelete(prompt)}/>
        )
       })}
    </div>
    </section>
  )
}

export default Profile
