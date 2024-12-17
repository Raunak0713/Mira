'use client';

import OrgSwitcher from "@/components/org-switcher";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const CreateProjectPage = () => {
  const { isLoaded : isOrgLoaded, membership } = useOrganization();
  const { isLoaded : isUserLoaded } = useUser(); 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if(isOrgLoaded && isUserLoaded && membership){
      setIsAdmin(membership.role === "org:admin")
    }
  },[isOrgLoaded, isUserLoaded, membership])

  if(!isUserLoaded || !isOrgLoaded){
    return null;
  }

  if(!isAdmin){
    return(
      <div>
        <span>Oops only Admin can create Projects</span>
        <OrgSwitcher />
      </div>
    )
  }
  return (
    <div>CreateProjectPage</div>
  )
}

export default CreateProjectPage 