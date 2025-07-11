import { useRef, useState } from "react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import useOutsideClick from "../../hooks/useOutsideClick.ts";
import { useAuth } from "../context/AuthProvider.tsx";
import {
  CalenderIcon,
  LocationIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from "../../assets/icons";
import {
  DateTypes,
  DateRangeTypes,
  GuestOptionListType,
  OptionItemType,
  OptionsType,
} from "./Header.type";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Header() {
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState<DateTypes>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState<OptionsType>({
    Adult: 1,
    Children: 0,
    Room: 1,
  });
  const [destination, setDestination] = useState<string>(
    searchParams.get("destination") || ""
  );
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOptions = (name: string, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const enCodeParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: enCodeParams.toString(),
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 mt-8">
      <UserInfo />
      <div className="w-full lg:max-w-[980px] 2xl:max-w-[1400px] grid grid-cols-1 gap-2 justify-items-start px-2  sm:gap-0 sm:grid-cols-3 border rounded-3xl sm:px-6 py-4 ">
        <div className="w-full flex justify-start items-center gap-2">
          <LocationIcon fill="rgb(239 68 68)" />
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            type="text"
            placeholder="where to go?"
            name="destination"
            id="destination"
            className="outline-none text-sm lg:text-md w-full"
          />
        </div>
        <div className="w-full flex items-center justify-center z-40 border  border-l-0 border-r-0 py-3 sm:py-0 sm:border-none">
          <span className="border  mx-4 h-10 hidden sm:block"></span>
          <div
            onClick={() => setIsOpenDate(!isOpenDate)}
            className="w-full flex sm:justify-center  items-center gap-1 cursor-pointer text-wrap text-sm lg:text-md "
            id="calenderDropdown"
          >
            <CalenderIcon fill="rgb(139 92 246)" />
            <span id="calenderDropdown">{`${format(
              date[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
          </div>
          {isOpenDate && (
            <DataRange
              date={date}
              setDate={setDate}
              setIsOpenDate={setIsOpenDate}
            />
          )}
        </div>
        <div className="w-full flex justify-between sm:justify-center items-center">
          <span className="border  mx-4 h-10 hidden sm:block"></span>
          <div className="w-full flex justify-center">
            <div
              className="w-full flex sm:justify-center items-center text-wrap text-sm lg:text-md  cursor-pointer"
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
          <button
            className="bg-violet-500 p-[.6rem] rounded-xl"
            onClick={handleSearch}
          >
            <SearchIcon stroke="#ffff" />
          </button>
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
      className="absolute w-60 bg-white shadow-xl top-20 py-3 px-4 z-50 rounded-lg"
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

function DataRange({ date, setDate, setIsOpenDate }: DateRangeTypes) {
  const dataRangeRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dataRangeRef, "calenderDropdown", () => setIsOpenDate(false));
  return (
    <div className="absolute top-20" ref={dataRangeRef}>
      <DateRange
        ranges={date}
        onChange={(item: RangeKeyDict) => {
          const selection = item.selection;
          setDate([
            {
              startDate: selection.startDate ?? new Date(),
              endDate: selection.endDate ?? new Date(),
              key: selection.key || "selection",
            },
          ]);
        }}
        minDate={new Date()}
        moveRangeOnFirstSelection={true}
      />
    </div>
  );
}

function UserInfo() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex flex-row justify-between px-4 sm:px-0 sm:flex-col items-center gap-4">
      <div>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="font-semibold hover:text-violet-500 hover:underline  cursor-pointer"
          >
            &larr; {user?.name}
          </button>
        ) : (
          <Link
            className="font-semibold hover:text-violet-500 hover:underline cursor-pointer "
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
      {isAuthenticated && (
        <Link
          className="font-semibold hover:text-violet-500 hover:underline cursor-pointer"
          to="/bookmark"
        >
          Bookmarks
        </Link>
      )}
    </div>
  );
}
