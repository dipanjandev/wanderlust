"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UserRound, X } from "lucide-react";
import { cn } from "cn";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/add-destination", label: "Add Destination" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
];

const linkStyles =
  "transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export default function NavBar() {
  const { data: session } = useSession();
  // console.log(session);
  const user = session?.user;
  // console.log(user);
  const handleSignOut = () => {
    signOut();
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-18 lg:px-10">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="-ml-2 flex size-10 items-center justify-center text-neutral-900 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <X className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} />
            )}
          </button>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[15px] font-medium text-neutral-900 xl:text-base",
                    linkStyles,
                    active && "text-brand hover:text-brand",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link href="/" className="shrink-0" aria-label="Wanderlust home">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlust"
            width={162}
            height={24}
            priority
            className="h-5 w-auto sm:h-6"
          />
        </Link>

        <div className="flex items-center gap-4 text-[15px] font-medium text-neutral-900 sm:gap-6 xl:gap-8 xl:text-base">
          <Link
            href="/profile"
            className={cn("hidden items-center gap-1.5 sm:flex", linkStyles)}
          >
            <UserRound className="size-4" strokeWidth={1.75} />
            Profile
          </Link>

          {/* Conditional Rendering */}
          {user ? (
            // if Logged in then show this
            <Popover>
              <PopoverTrigger
                nativeButton={false}
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy={"no-referrer"}
                      src={user?.image ?? undefined}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent className={"p-5"}>
                <PopoverHeader>
                  <PopoverTitle className={"text-lg"}>
                    {user?.name}
                  </PopoverTitle>
                  <PopoverDescription>{user?.email}</PopoverDescription>
                  <Button variant={"destructive"} onClick={handleSignOut}>
                    Signout
                  </Button>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            // if not loggedin then show login and signup button
            <>
              <Link href="/login" className={linkStyles}>
                Login
              </Link>
              <Link
                href="/signup"
                className={cn("hidden font-semibold sm:inline", linkStyles)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-neutral-200 bg-white px-5 pb-5 pt-3 shadow-xl lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "py-3 text-base font-medium text-neutral-900",
                    active && "text-brand",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-2 flex items-center gap-6 border-t border-neutral-200 pt-4 text-sm font-medium">
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5"
            >
              <UserRound className="size-4" strokeWidth={1.75} />
              Profile
            </Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
