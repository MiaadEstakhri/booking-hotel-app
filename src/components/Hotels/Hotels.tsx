import { Link } from "react-router-dom";
import notImg from "../../assets/images/hoteldesign.webp";
import { HotelTypes } from "../LocationList/LocationList.type";
import { useHotels } from "../context/hotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();

  if (isLoading) <div>Loading...</div>;
  return (
    <div className="">
      <h2 className="text-xl font-semibold text-nowrap mb-6">
        Search Result : ({hotels.length})
      </h2>
      {hotels.map(
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
              <div
                className={`flex gap-3 mt-4 ${
                  id === currentHotel?.id
                    ? "border-2 border-violet-500 rounded-lg me-2 p-2"
                    : ""
                }`}
                key={id}
              >
                <div className="w-20 h-20 md:w-28 md:h-28 xl:w-44 xl:h-32 border rounded-xl  text-wrap overflow-hidden">
                  <img
                    className="w-full h-full text-wrap rounded-lg"
                    src={xl_picture_url === null ? notImg : xl_picture_url}
                    alt={filename}
                  />
                </div>
                <div className="mt-2 text-sm xl:text-base">
                  <p className="xl:text-lg">{smart_location}</p>
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
