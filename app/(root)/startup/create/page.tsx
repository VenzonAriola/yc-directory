import React from 'react'
import StartupForm from "@/components/StartupForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Page = async () => {
    const session =await auth();

    if(!session) redirect("/")

    return (
        <>
        <section className="pink_container pattern min-h-[23opx]">
            <h1 className="heading">Submit your Startup</h1>
        </section>
            <StartupForm />
        </>
    )
}
export default Page
