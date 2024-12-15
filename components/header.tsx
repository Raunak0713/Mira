import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { DoorOpen, PenBox } from 'lucide-react';
import UserMenu from './user-menu';

const Header = () => {
  return (
    <header className="container mx-auto">
      <nav className="flex justify-between items-center py-6 h-20 mt-5">
        <Link href="/" className=''>
          <Image
            src={'/logo.png'}
            alt="Mira Logo"
            height={80} // Set a larger height
            width={180} // Set a larger width
            className="object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link href={'/project/create'}>
            <Button className="flex items-center gap-2">
              <span>Create Project</span>
              <PenBox size={18} />
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl={'/onboarding'}>
              <Button variant={'outline'}>
                Login
                <DoorOpen size={10}/>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
