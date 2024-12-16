import { getOrganization } from '@/actions/organization';
import React from 'react'

interface OrganizationPageProps {
  params: { orgId: string }
}

const OrganizationPage = async ({ params }: OrganizationPageProps) => {
  const { orgId } = params;

  const organization = await getOrganization({ slug: orgId });

  if (!organization) {
    return (
      <div>Organization Not Found</div>
    )
  }

  return (
    <div>
      <h1>{organization.name}'s Projects</h1>
    </div>
  )
}

export default OrganizationPage