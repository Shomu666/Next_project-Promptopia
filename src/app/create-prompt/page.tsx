"use client";


import Form from "@/components/Form"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useSession } from "next-auth/react";
export default function CreatePrompt() {

    const { data: session } = useSession()
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    
    const router = useRouter();
    
    const createPrompt = async (e) => {
      e.preventDefault();
      setSubmit(true)
      try {
        const response = await fetch("api/prompt/new", {
          method: "POST", 
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id
          })
        })

        if(response.ok){
         router.push('/')
        }
      } catch (error) {
        console.log(error)
      } finally{
        setSubmit(false)
      }
    }
    return (
        <div>
            <Form type="Create" submit={submit} setSubmit={setSubmit} post={post} setPost={setPost} handleSubmit={createPrompt}/>
        </div>
    )
}