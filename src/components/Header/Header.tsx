import { useRef, useState } from "react";
import {
  CalenderIcon,
  LocationIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from "../../assets/icons";
import {
  GuestOptionListType,
  OptionItemType,
  OptionsType,
} from "./Header.type";
import useOutsideClick from "../../hooks/useOutsideClick.ts";

export default function Header() {
  const [destination, setDestination] = useState<string>("");
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionsType>({
    Adult: 1,
    Children: 0,
    Room: 1,
  });

  const handleOptions = (name: string, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className=" m-5">
      <div className="grid grid-cols-4 border rounded-2xl p-4">
        <div className=" flex justify-center items-center gap-1">
          <LocationIcon fill="rgb(239 68 68)" />
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            type="text"
            placeholder="where to go?"
            name="destination"
            id="destination"
            className="outline-none"
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
          <div className="flex ">
            <div
              className=" flex  items-center text-nowrap cursor-pointer"
              onClick={() => setIsOpenOption(!isOpenOption)}
              id="optionDropdown"
            >
              {`Adult : ${options.Adult} , Children : ${options.Children} , room : ${options.Room}`}
            </div>
            <>
              {isOpenOption && (
                <GuestOptionList
                  options={options}
                  handleOptions={handleOptions}
                  setIsOpenOption={setIsOpenOption}
                />
              )}
            </>
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

function GuestOptionList({
  options,
  handleOptions,
  setIsOpenOption,
}: GuestOptionListType) {
  const optionRef = useRef<HTMLDivElement>(null);
  useOutsideClick(optionRef, "optionDropdown", () => setIsOpenOption(false));
  return (
    <div
      className="absolute w-60 bg-white shadow-xl top-20 py-3 px-4 z-40 rounded-lg"
      ref={optionRef}
    >
      <OptionItem
        type="Adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="Children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="Room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionItem({
  type,
  options,
  minLimit,
  handleOptions,
}: OptionItemType) {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="">{type}</div>
      <div className="flex items-center justify-between w-24 ">
        <button
          className={`${
            options[type] <= minLimit ? "cursor-not-allowed" : "cursor-pointer"
          } bg-slate-100 p-1 rounded-md`}
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}
        >
          <MinusIcon className="h-5 w-4" />
        </button>
        <span className="">{options[type]}</span>
        <button
          className="bg-slate-100 p-1 rounded-md"
          onClick={() => handleOptions(type, "inc")}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
