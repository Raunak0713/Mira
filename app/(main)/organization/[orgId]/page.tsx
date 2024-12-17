import { getOrganization } from '@/actions/organization';
import OrgSwitcher from '@/components/org-switcher';
import React from 'react';

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
    <div className='mx-auto container'>
      <div className='mb-4 flex flex-col sm:flex-row justify-between items-start'>
        <h1 className='text-5xl font-bold gradient-title pb-2'>
          {organization.name}'s Projects
        </h1>
        <OrgSwitcher />
      </div>
      <div className='mb-4'>Show org Projects</div>
      <div className='mt-8'>Show user assigned and reported issues here</div>
    </div>
  )
}

export default OrganizationPage
