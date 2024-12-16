import { currentUser } from "@clerk/nextjs/server"
import { db } from './prisma'
import { NextResponse } from "next/server"

export const checkUser = async () => {
  const user = await currentUser()

  if(!user){
    return NextResponse.json({ message : "User not authenticated ❓" }, { status : 401 });
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where : {
        clerkUserId : user.id,
      },
    })

    if(loggedInUser){
      return NextResponse.json(loggedInUser)
    }

    const userName = `${user.firstName} ${user.lastName}`

    const newUser = await db.user.create({
      data : {
        clerkUserId : user.id,
        name : userName,
        imageUrl : user.imageUrl,
        email : user.emailAddresses[0].emailAddress
      }
    })

    return NextResponse.json(newUser)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message : "Error Creating User" }, { status : 500 })
  }
}