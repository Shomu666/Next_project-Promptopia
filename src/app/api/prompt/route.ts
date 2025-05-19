import { connectToDb } from "@/utils/database";
import Prompt from "@/models/Prompt";
import { json } from "stream/consumers";

export const GET = async() => {
   try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), {status: 200})
   } catch (error) {
    return new Response("Failed to load the prompts", { status: 500})
   }
}