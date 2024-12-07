import { CalenderIcon, LocationIcon, SearchIcon } from "../../assets/icons";

export default function Header() {
  return (
    <div className=" m-5">
      <div className="grid grid-cols-4 border rounded-2xl p-4">
        <div className=" flex justify-center items-center gap-1">
          <LocationIcon fill="rgb(239 68 68)" />
          <input
            type="text"
            placeholder="where to go?"
            name="destination"
            id="destination"
          />
        </div>
        <div className="grid grid-cols-3">
          <span className="justify-self-start border  mx-4 h-10 "></span>

          <div className=" flex  items-center gap-1">
            <CalenderIcon fill="rgb(139 92 246)" />
            <div>2022/3/3</div>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="justify-self-start border  mx-4 h-10 "></span>
          <div className=" flex  items-center text-nowrap">
            1 adult . 2 children . 1 room
          </div>
        </div>
        <div className="grid grid-cols-3">
          <span className="justify-self-start border  mx-4 h-10 "></span>
          <div className=" flex  items-center gap-1">
            <button className="bg-violet-500 p-2 rounded-md">
              <SearchIcon stroke="#ffff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
