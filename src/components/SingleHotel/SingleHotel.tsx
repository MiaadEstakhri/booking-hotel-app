import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SingleHotelTypes } from "./SingleHotel.type";

function SingleHotel() {
  const { id } = useParams();
  const { data, isLoading } = useFetch(
    `http://localhost:3000/hotels/${id}`,
    ""
  );
  const singleHotelData = data as SingleHotelTypes | null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="">
        <h2 className="xl:text-lg font-bold">{singleHotelData?.name}</h2>
        <div className="text-sm xl:text-base text-gray-500">
          {singleHotelData?.number_of_reviews} reviews &bull;{" "}
          {singleHotelData?.smart_location}
        </div>
      </div>
      <img
        src={singleHotelData?.xl_picture_url}
        alt={singleHotelData?.name}
        className="h-[250px] w-full xl:w-[500px] object-cover rounded-xl"
      />
    </div>
  );
}

export default SingleHotel;
