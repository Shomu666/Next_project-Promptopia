import { connectToDb } from "@/utils/database";
import Prompt from "@/models/Prompt";


export const GET = async(req, { params }) => {
   try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate('creator')
    if(!prompt){
        return new Response("Prompt not found", {status: 404})
    }

    return new Response(JSON.stringify(prompt), {status: 200})
   } catch (error) {
    return new Response("Failed to load the prompts", { status: 500})
   }
}

export const PATCH = async (req, { params }) => {
  const {prompt, tag} = await req.json()

   try {
    await connectToDb();
    const existsingPrompt = await Prompt.findById(params.id)
    if(!existsingPrompt){
        return new Response("Prompt not found" , {status: 404})
    }
    existsingPrompt.prompt = prompt;
    existsingPrompt.tag = tag;

    await existsingPrompt.save();
    return new Response(JSON.stringify(existsingPrompt), {status: 200})
   } catch (error) {
    return new Response("Failde to update prompt", {status: 500})
   }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDb();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }
}