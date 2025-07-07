import ReactCountryFlag from "react-country-flag";
import { useBookMark } from "../context/BookMarkProvider";
import { Link } from "react-router-dom";

function BookMark() {
  const { isLoading, bookMarks, currentBookmark } = useBookMark();

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
              key={id}
              className={`p-4 border rounded-xl shadow-md md:me-3 ${
                id === currentBookmark?.id ? " border-2 border-violet-500" : ""
              }`}
            >
              <ReactCountryFlag countryCode={countryCode} />
              &nbsp; <strong>{cityName}</strong> &nbsp; <span>{country}</span>
            </div>
          </Link>
        )
      )}
    </div>
  );
}

export default BookMark;
