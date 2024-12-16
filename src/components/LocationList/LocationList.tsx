import useFetch from "../../hooks/useFetch";
import notImg from "../../assets/images/hoteldesign.webp";
import { HotelTypes } from "./LocationList.type";

export default function LocationList() {
  const { isLoading, data } = useFetch("http://localhost:3000/hotels", "");

  if (isLoading) <p>Loading...</p>;
  return (
    <div className="w-full ">
      <h2 className="mt-8 text-center font-bold text-2xl">Nearby Locations</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 justify-items-center ">
        {data.map(
          ({
            picture_url: { filename },
            xl_picture_url,
            smart_location,
            name,
            price,
          }: HotelTypes) => {
            return (
              <div className="mt-10">
                <div className="w-80 h-56 border rounded-lg">
                  <img
                    className="w-full h-full text-wrap rounded-lg"
                    src={xl_picture_url === null ? notImg : xl_picture_url}
                    alt={filename}
                  />
                </div>
                <div className="mt-2">
                  <p className="">{smart_location}</p>
                  <p className="text-gray-400">{name}</p>
                  <p className="">
                    <span className="text-gray-400">€</span>
                    <span className="mx-1">{price} </span>
                    <span className="text-gray-400">night</span>
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}