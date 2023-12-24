import DisplayChessboard from "./DisplayChessboard";

const HeroAnimatedLogo = async () => {
  return (
    <div className="relative hidden h-[800px] overflow-visible rounded-full lg:block">
      <DisplayChessboard />
    </div>
  );
};

export default HeroAnimatedLogo;
