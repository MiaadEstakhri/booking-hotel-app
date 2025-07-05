import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookMark } from "../context/BookMarkProvider";

function BookMarksLayout() {
  const { bookMarks } = useBookMark();
  return (
    <div className="grid grid-cols-12 mt-8 ">
      <div className="col-span-12 mb-5 md:mb-0 md:col-span-5 max-h-[800px] overflow-y-auto">
        <Outlet />
      </div>
      <div className="col-span-12 md:col-span-7 w-full h-full">
        <Map markerLocations={bookMarks} />
      </div>
    </div>
  );
}

export default BookMarksLayout;
