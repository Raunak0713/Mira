import { currentUser } from "@clerk/nextjs/server"
import { prisma } from './prisma'
import { NextResponse } from "next/server"

export const checkUser = async () => {
  const user = await currentUser()

  if(!user){
    return NextResponse.json({ message : "User not authenticated ❓" }, { status : 401 });
  }

  try {
    const loggedInUser = await prisma.user.findUnique({
      where : {
        clerkUserId : user.id,
      },
    })

    if(loggedInUser){
      return NextResponse.json(loggedInUser)
    }

    const userName = `${user.firstName} ${user.lastName}`

    const newUser = await prisma.user.create({
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