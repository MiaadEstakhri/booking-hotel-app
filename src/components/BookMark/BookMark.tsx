import ReactCountryFlag from "react-country-flag";
import { useBookMark } from "../context/BookMarkProvider";
import { Link } from "react-router-dom";
import { TrashIcon } from "../../assets/icons";

function BookMark() {
  const { isLoading, bookMarks, currentBookmark, deleteBookMark } =
    useBookMark();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string | number
  ) => {
    e.preventDefault();
    await deleteBookMark(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        Bookmarks List ({bookMarks.length})
      </h2>
      {bookMarks.map(
        ({ id, countryCode, cityName, country, latitude, longitude }) => (
          <Link key={id} to={`${id}?lat=${latitude}&lng=${longitude}`}>
            <div
              className={`flex justify-between items-center p-4 border rounded-xl shadow-md md:me-3 ${
                id === currentBookmark?.id ? " border-2 border-violet-500" : ""
              }`}
            >
              <div>
                <ReactCountryFlag countryCode={countryCode} />
                &nbsp; <strong>{cityName}</strong> &nbsp; <span>{country}</span>
              </div>
              <button
                onClick={(e) => handleDelete(e, id)}
                className="text-red-500 cursor-pointer"
              >
                <TrashIcon fill="red" className="w-5 h-5" />
              </button>
            </div>
          </Link>
        )
      )}
    </div>
  );
}

export default BookMark;
