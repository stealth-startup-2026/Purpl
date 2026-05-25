import { TopNav } from "@/components/TopNav";
import { CaseStudiesSection } from "@/components/case-studies/CaseStudiesSection";

export const metadata = {
  title: "case studies · purpl",
  description: "A closer look at what we build and why, one project at a time.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <TopNav />
      <CaseStudiesSection />
    </>
  );
}
