import Navbar from "@/components/Navbar";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      {children}
    </div>
  );
}
