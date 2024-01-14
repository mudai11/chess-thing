import Hero from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default async function Home() {
  return (
      <>
          <main className="flex flex-col items-center justify-center">
              <Hero/>
          </main>
          <Footer/>
      </>
  );
}
