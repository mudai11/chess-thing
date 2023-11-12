import Link from "next/link";

const Logo = async () => {
  return (
    <Link className="flex flex-row gap-2 items-center cursor-pointer" href="/">
      <div className="cursor-pointer font-bold text-2xl bg-gradient-to-r from-black to-[#4b7399] dark:from-white dark:to-[#4b7399]  text-transparent bg-clip-text">
        Chess Thing
      </div>
    </Link>
  );
};

export default Logo;
