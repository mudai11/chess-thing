import PlayerShowcase from "./PlayerShowcase";

const index = () => {
  return (
    <div className="flex justify-between w-full p-2">
      <div className="flex flex-1 flex-row items-center justify-between">
        <PlayerShowcase side="left" />
        <div className="my-auto w-full text-sm">vs</div>
        <PlayerShowcase side="right" />
      </div>
    </div>
  );
};

export default index;
