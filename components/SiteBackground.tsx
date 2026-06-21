"use client";

import { usePathname } from "next/navigation";
import { DotGrid } from "@/components/DotGrid";

/**
 * The dot-grid background for the whole site. The landing page ("/") gets the
 * full interactive version (cursor highlight + click-to-draw); every other page
 * gets the same dots, calm and non-interactive, sitting behind all content.
 * Rendered once in the root layout.
 */
export function SiteBackground() {
  const pathname = usePathname();
  return <DotGrid interactive={pathname === "/"} />;
}
