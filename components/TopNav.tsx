import Image from "next/image";
import Link from "next/link";
import { LinkQuiet } from "@/components/LinkQuiet";

/**
 * Top nav appears on every page: wordmark on the left (links home),
 * primary nav links on the right.
 */
export function TopNav() {
  return (
    <header className="relative z-[3] flex items-center justify-between px-10 pt-7 sm:px-10 max-sm:px-5 max-sm:pt-5">
      <Link
        href="/"
        aria-label="Purpl home"
        className="inline-flex items-center opacity-80 outline-none transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100"
      >
        <Image
          src="/brand/purpl-mark-white.svg"
          alt="purpl"
          width={72}
          height={38}
          priority
          className="h-8 w-auto max-sm:h-6"
        />
      </Link>
      <nav aria-label="Primary" className="flex gap-9 max-sm:gap-5">
        <LinkQuiet href="/about" className="text-base max-sm:text-sm">
          about us
        </LinkQuiet>
        <LinkQuiet href="/work" className="text-base max-sm:text-sm">
          our work
        </LinkQuiet>
        <LinkQuiet href="/#contact" className="text-base max-sm:text-sm">
          contact
        </LinkQuiet>
      </nav>
    </header>
  );
}
