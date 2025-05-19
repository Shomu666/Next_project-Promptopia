import { connectToDb } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDb();

        const userPosts = await Prompt.find({
            creator: params.id
        }).populate('creator') 

        return new Response(JSON.stringify(userPosts), {status: 200})

    } catch (error) {
        return new Response("Error in fetching user posts", {status: 500})
    }
}
