import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import loading from '../assets/icons/gears-spinner.svg'

const Form = ({ type, post, setPost, submit, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex flex-col flex-start gap-3'>
      <h1 className='text-4xl font-extrabold bg-gradient-to-r from-teal-500 via-blue-200 to-red-400 bg-clip-text text-transparent'>{type} form</h1>
      <p>Create and share unique prompts with the world and use any prompt to have fun with any AI-platform</p>
      <form className='w-full flex flex-col mt-6 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5'>
        <label>
          <span className='text-sm font-semibold'>
             Your AI prompt
          </span>
          <textarea value={post.prompt} onChange={(e) => setPost({
            ...post,
            prompt: e.target.value
          })} className='w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 bg-white' placeholder='Write your AI PROMPT'>

          </textarea>
        </label>
        <label>
          <span className='text-sm font-semibold'>
             Tags {'(#web-development, #kitng etc)'}
          </span>
          <input value={post.tag} onChange={(e) => setPost({
            ...post,
            tag: e.target.value
          })} className='w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 bg-white' placeholder='#Tag'/>
        </label>
      </form>
      <div className='flex justify-end gap-3 mx-4'>
        <Link href='/' className='text-sm text-gray-600 border-1 border-gray-900 rounded-md px-3 py-2'>
        Cancel
        </Link>
        <button type='submit' className='text-sm border-1 cursor-pointer border-gray-900 rounded-md px-3 py-2' disabled={submit} onClick={handleSubmit}>
          {submit? (
            <div>
              <Image src={loading} alt='Loading' height={20} width={25}></Image>
            </div>
          ): type}
        </button>
      </div>

    </section>
  )
}

export default Form
