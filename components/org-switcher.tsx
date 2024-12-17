"use client";
import { OrganizationSwitcher, SignedIn, useOrganization, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";

interface OrgSwitcherProps {
  appearance?: Record<string, any>; // Define the type for appearance prop
}

export const OrgSwitcher = ({ appearance }: OrgSwitcherProps) => {
  const { isLoaded: isOrgLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname();

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  return (
    <div>
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          createOrganizationMode={
            pathname === "/onboarding" ? "navigation" : undefined
          }
          afterCreateOrganizationUrl="/organization/:slug"
          afterSelectOrganizationUrl="/organization/:slug"
          createOrganizationUrl="/onboarding"
          appearance={{
            ...appearance, // Merge the passed appearance prop
            elements: {
              organizationSwitcherTrigger:
                "border border-gray-300 rounded-md px-5 py-2",
              organizationSwitcherTriggerIcon: "text-white",
              ...(appearance?.elements || {}), // Allow further overrides
            },
          }}
        />
      </SignedIn>
    </div>
  );
};

