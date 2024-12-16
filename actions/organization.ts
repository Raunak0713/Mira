'use server';

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface getOrganizationProps {
  slug: string;
}

export async function getOrganization({ slug }: getOrganizationProps) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized User ❌");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User doesn't exist ❌🔍");

  const client = clerkClient();
  const organization = await client.organizations.getOrganization({ slug });

  if (!organization) return null;

  const { data: membership } = await client.organizations.getOrganizationMembershipList({
    organizationId: organization.id,
  });

  const userExist = membership.find((member) => member.publicUserData?.userId === userId);

  return userExist ? organization : null;
}
