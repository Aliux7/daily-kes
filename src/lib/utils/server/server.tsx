"use server"

import { cookies } from "next/headers"

export default async function getUserCookies() {
    const name = cookies().get("name")?.value as string
    const email = cookies().get("email")?.value as string

    return { name, email }
}