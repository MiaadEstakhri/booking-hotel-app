import ReactCountryFlag from "react-country-flag";
import { useBookMark } from "../context/BookMarkProvider";
import { Link } from "react-router-dom";

function BookMark() {
  const { isLoading, bookMarks } = useBookMark();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {bookMarks.map(
        ({ id, countryCode, cityName, country, latitude, longitude }) => (
          <Link key={id} to={`${id}?lat=${latitude}&lng=${longitude}`}>
            <div key={id} className="p-4 border rounded-xl shadow-md md:me-3">
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
