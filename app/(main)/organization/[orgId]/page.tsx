import React from 'react'

interface OrganizationPageProps {
  params: { orgId: string }
}

const OrganizationPage = async ({ params }: OrganizationPageProps) => {
  const { orgId } = await params; // Awaiting the params

  return (
    <div>{orgId}</div>
  )
}

export default OrganizationPage
