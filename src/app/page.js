import DoctorsSection from "@/components/DoctorsSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
    <div className="min-h-screen">
      <Hero />
      <DoctorsSection isHome={true} />
    </div>
    </>
  );
}
