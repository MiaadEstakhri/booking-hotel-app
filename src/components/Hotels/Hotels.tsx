import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import notImg from "../../assets/images/hoteldesign.webp";
import { HotelTypes } from "../LocationList/LocationList.type";

function Hotels() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options") || "")?.Room;
  const { isLoading, data } = useFetch(
    "http://localhost:3000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) <div>Loading...</div>;
  return (
    <div className="mt-5  ms-3">
      <h2 className="text-xl font-semibold text-nowrap mb-6">
        Search Result : ({data.length})
      </h2>
      {data.map(
        ({
          picture_url: { filename },
          xl_picture_url,
          smart_location,
          name,
          price,
          id,
          latitude,
          longitude,
        }: HotelTypes) => {
          return (
            <Link
              key={id}
              to={`/hotels/${id}?lat=${latitude}&lng=${longitude}`}
            >
              <div className="flex gap-3 mt-4" key={id}>
                <div className="w-28 h-28 border rounded-xl text-xs text-wrap">
                  <img
                    className="w-full h-full text-wrap rounded-lg"
                    src={xl_picture_url === null ? notImg : xl_picture_url}
                    alt={filename}
                  />
                </div>
                <div className="mt-2 text-sm">
                  <p className="">{smart_location}</p>
                  <p className="text-gray-400">{name}</p>
                  <p className="">
                    <span className="text-gray-400">€</span>
                    <span className="mx-1">{price} </span>
                    <span className="text-gray-400">night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
}

export default Hotels;
