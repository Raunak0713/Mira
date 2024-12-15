'use client'

import { OrganizationList, useOrganization } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const OnboardingPage = () => {
  const { organization } = useOrganization();
  const router = useRouter()

  useEffect(() => {
    if(organization){
      router.push(`/organization/${organization.slug}`)
    }
  }, [organization, router])

  return (
    <div className='flex justify-center items-center p-14'>
      <OrganizationList hidePersonal/>
    </div>
  )
}

export default OnboardingPage