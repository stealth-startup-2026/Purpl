"use client";

import { usePathname } from "next/navigation";
import { DotGrid } from "@/components/DotGrid";
import { GrainOverlay } from "@/components/GrainOverlay";

/** Keep the original background and grain on legacy routes, off the new white homepage. */
export function SiteBackground() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <><DotGrid interactive={false} /><GrainOverlay /></>;
}
