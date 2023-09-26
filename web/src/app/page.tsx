import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <Hero />
      </main>
    </>
  );
}
