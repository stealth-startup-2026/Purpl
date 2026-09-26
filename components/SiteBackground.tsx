"use client";

import { usePathname } from "next/navigation";
import { DotGrid } from "@/components/DotGrid";
import { GrainOverlay } from "@/components/GrainOverlay";

/** Keep the original background and grain only on legacy routes. */
export function SiteBackground() {
  const pathname = usePathname();
  if (["/", "/about", "/contact"].includes(pathname)) return null;
  return <><DotGrid interactive={false} /><GrainOverlay /></>;
}
