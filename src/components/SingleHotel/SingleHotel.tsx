import { useParams } from "react-router-dom";
import { useHotels } from "../context/hotelsProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, isLoadingCurrentHotel, getHotel } = useHotels();

  useEffect(() => {
    if (id) {
      getHotel(id);
    }
  }, [id, getHotel]);

  if (isLoadingCurrentHotel && !currentHotel) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="">
        <h2 className="xl:text-lg font-bold">{currentHotel?.name}</h2>
        <div className="text-sm xl:text-base text-gray-500">
          {currentHotel?.number_of_reviews} reviews &bull;{" "}
          {currentHotel?.smart_location}
        </div>
      </div>
      <img
        src={currentHotel?.xl_picture_url}
        alt={currentHotel?.name}
        className="h-[250px] w-full xl:w-[500px] object-cover rounded-xl"
      />
    </div>
  );
}

export default SingleHotel;
