import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface createProjectData {
  name : string;
  key : string;
  description? : string;
}

export async function createProject(data : createProjectData){
  const { userId, orgId } = auth()

  if(!userId) throw new Error("Not Authorized")
  if(!orgId) throw new Error("No Organization Selected")
  
  const client = clerkClient()
  const { data: membership } = await client.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  const userExist = membership.find((member) => member.publicUserData?.userId === userId);

  if(!userExist || userExist.role !== "org:admin"){
    throw new Error("Only Organization's admins can create projects")
  }

  try {
    const project = await db.project.create({
      data : {
        name : data.name,
        key : data.key,
        description : data.description,
        organizationId : orgId
      },
    });

    return project
  } catch (error : any) {
    throw new Error("Error creating project" + error.message)
  }
}