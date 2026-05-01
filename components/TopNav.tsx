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
        className="group inline-flex items-center gap-2 opacity-80 outline-none transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="h-8 w-auto shrink-0 max-sm:h-6"
          aria-hidden="true"
        >
          <path
            d="M 95,35 C 115,28 140,35 155,52 C 168,66 172,80 166,96 C 162,106 150,110 152,124 C 154,138 158,155 140,168 C 124,180 96,184 68,176 C 40,168 28,145 28,118 C 28,90 36,62 55,48 C 68,38 80,40 95,35 Z"
            fill="white"
          />
        </svg>
        <span className="opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
          <Image
            src="/brand/purpl-mark-white.svg"
            alt="purpl"
            width={72}
            height={38}
            priority
            className="h-8 w-auto max-sm:h-6"
          />
        </span>
      </Link>
      <nav aria-label="Primary" className="flex gap-9 max-sm:gap-5">
        <LinkQuiet href="/about" className="text-base max-sm:text-sm">
          about us
        </LinkQuiet>
        <LinkQuiet href="/work" className="text-base max-sm:text-sm">
          our work
        </LinkQuiet>
        <LinkQuiet href="/contact" className="text-base max-sm:text-sm">
          contact
        </LinkQuiet>
      </nav>
    </header>
  );
}
