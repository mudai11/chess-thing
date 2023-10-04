import Navbar from "@/components/Navbar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen">
      <Navbar />
      {children}
    </main>
  );
}
