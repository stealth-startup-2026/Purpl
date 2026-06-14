import { TopNav } from "@/components/TopNav";
import { WorkSection } from "@/components/work/WorkSection";

export const metadata = {
  title: "our work",
  description: "A selection of projects built by purpl solutions — web apps, tools, and digital products for clients across industries.",
};

export default function WorkPage() {
  return (
    <>
      <TopNav />
      <WorkSection />
    </>
  );
}
