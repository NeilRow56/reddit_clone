import React from "react";
import RedditText from "../../public/logo-name.svg";
import redditMobile from "../../public/reddit-full.svg";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="h-[10vh] w-full flex py-5 items-center border-b px-5 lg:px-14 justify-between">
      <Link href="/" className="flex items-center gap-x-3">
        <Image
          src={redditMobile}
          alt="Reddit mobile icon"
          className="h-10 w-fit"
        />
        <Image
          src={RedditText}
          alt="Reddit Desktop"
          className="h-9 w-fit hidden lg:block"
        />
      </Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {/* {user ? (
          <UserDropdown userImage={user.picture} />
        ) : (
          <div className="flex items-center gap-x-4">
            <Button variant="secondary" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
          </div>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
