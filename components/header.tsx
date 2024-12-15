import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { DoorOpen, PenBox } from 'lucide-react';
import UserMenu from './user-menu';
import { checkUser } from '@/lib/checkUser';

const Header = async () => {
  await checkUser()
  return (
    <header className="container mx-auto">
      <nav className="flex justify-between items-center py-6 h-20 mt-5">
        <Link href="/" className=''>
          <Image
            src={'/logo.png'}
            alt="Mira Logo"
            height={80}
            width={180}
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
