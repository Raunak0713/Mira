import React from 'react'

type Params = Promise<{ orgId : string }>

const OrganizationPage = async ( props : { params : Params }) => {
  const params = await props.params;
  const orgId = params.orgId

  return (
    <div>{orgId}</div>
  )
}

export default OrganizationPage
