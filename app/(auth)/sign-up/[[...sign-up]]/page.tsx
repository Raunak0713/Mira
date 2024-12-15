'use client';

import { SignUp } from '@clerk/nextjs';
import React, { useEffect } from 'react';

const SignInPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0); // Ensure scroll resets on hydration
    }
  }, []);

  return <SignUp />;
};

export default SignInPage;
