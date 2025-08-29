"use server"

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";

class formData {
}

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
    ) => {
    const session = await auth();
//server action to validate session
    if(!session)
        return parseServerActionResponse(
        {error: 'Not signed in',
            status: "ERROR"
        })
//server action to check form and submit form response to sanity
    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key])=> key !== 'pitch'),
    )

// server action for slugify
    const slug=slugify(title as string, {lower: true, strict:true})

    try {
        const startup ={
            title,
            description,
            category,
            image: link,
            slug :{
                _type: "slug",
                current:slug,
            },
            author: {
                _type:'reference',
                _ref: session?.id,
            },
            pitch,
        }
        const result= await writeClient.create({_type:"startup", ...startup})
        return parseServerActionResponse({
            ...result,
            error: '',
            status: "SUCCESS",
        })
    } catch (error) {
        console.log(error)
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
            })
    }
}