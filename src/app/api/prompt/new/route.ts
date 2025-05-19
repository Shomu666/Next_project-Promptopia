import { connectToDb } from "@/utils/database";
import { NextResponse } from "next/server";

import Prompt from "@/models/Prompt";

export const POST = async (req: Request) => {
    const {userId, prompt, tag} = await req.json();

    try {
        connectToDb();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });
        await newPrompt.save();
        return NextResponse.json({message: "New prompt created"}, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'failed to creat prompt'}, {status: 500})
    }
}