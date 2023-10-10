import Link from "next/link";

const Logo = async () => {
  return (
    <Link
      className="flex flex-row gap-2 items-center cursor-pointer"
      href="/"
      prefetch={false}
    >
      <label className="cursor-pointer font-bold text-2xl bg-gradient-to-r from-black to-amber-500 dark:from-white dark:to-amber-500  text-transparent bg-clip-text">
        Chess Thing
      </label>
    </Link>
  );
};

export default Logo;
