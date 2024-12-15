import React from 'react'

interface OrganizationPageProps {
  params : { orgId : string } 
}

const OrganizationPage = ({ params } : OrganizationPageProps ) => {
  const { orgId } = params 
  return (
    <div>{orgId}</div>
  )
}

export default OrganizationPage