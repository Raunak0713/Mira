'use client';

import { SignIn } from '@clerk/nextjs';
import React, { useEffect } from 'react';

const SignInPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0); // Ensure scroll resets on hydration
    }
  }, []);

  return <SignIn />;
};

export default SignInPage;
