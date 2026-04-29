import { LinkQuiet } from "@/components/LinkQuiet";

/**
 * The same top nav appears on every page: brand on the left
 * (placeholder for the future logo), primary nav links on the right.
 */
export function TopNav() {
  return (
    <header className="relative z-[3] flex items-center justify-between px-10 pt-7 sm:px-10 max-sm:px-5 max-sm:pt-5">
      <LinkQuiet href="/" aria-label="Purpl home" className="text-base max-sm:text-sm">
        home
      </LinkQuiet>
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
