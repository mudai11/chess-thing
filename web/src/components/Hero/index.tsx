import HeroAnimatedLogo from "./HeroAnimatedLogo";
import HeroButtons from "./HeroButtons";

const Hero = async () => {
  return (
    <section className="flex flex-row items-center">
      <div className="max-w-[500px] pt-20 lg:pt-0 flex flex-col justify-center items-center lg:items-start gap-3">
        <h1 className="text-[50px] md:text-[60px] lg:text-[80px] font-bold bg-gradient-to-r from-black to-[#4b7399] dark:from-white dark:to-[#4b7399] text-transparent bg-clip-text">
          Chess Thing
        </h1>
        <p className="text-xl text-black/60 dark:text-white/60 text-center lg:text-start">
          Play chess with your friend in a seemless experience. Unlock your
          inner grandmaster, sharpen your strategy, and conquer the chessboard
          with our ultimate chess game application !
        </p>
        <HeroButtons />
      </div>
      <HeroAnimatedLogo />
    </section>
  );
};

export default Hero;
