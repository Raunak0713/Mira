import { getOrganization } from '@/actions/organization';
import React from 'react'

type OrganizationPageProps = Promise<{ orgId : string }>

const OrganizationPage = async ( props : { params : OrganizationPageProps }) => {
  const params = await props.params;
  const orgId = params.orgId

  const organization = await getOrganization({slug : orgId})

  if(!organization){
    return(
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
