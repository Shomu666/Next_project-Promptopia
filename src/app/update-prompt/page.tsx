"use client";


import Form from "@/components/Form"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
export default function UpdatePrompt() {

    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const router = useRouter();

    useEffect(() => {
      const getUserPrompt = async () => {
          const res = await fetch(`/api/prompt/${promptId}`)
          const data = await res.json();

          setPost({
            prompt: data.prompt,
            tag: data.tag
          })
      }
      if(promptId){
        getUserPrompt();
      }
    }, [promptId])
    
    
    const updatePrompt = async (e) => {
      e.preventDefault();
      setSubmit(true);
      if(!promptId){
        return alert("Prompt Id not found")
      }
      try {
        const response = await fetch(`api/prompt/${promptId}`, {
          method: "PATCH", 
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
            <Form type="Update" submit={submit} setSubmit={setSubmit} post={post} setPost={setPost} handleSubmit={updatePrompt}/>
        </div>
    )
}