"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton, SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Redirect to /sign-in if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center px-6 py-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100 text-lg font-semibold">PrepWise</h2>
        </Link>

        <div className="flex items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
