import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";

const BASE_GEOLOCATION_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookMark() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const [latNum, lngNum] = useUrlLocation();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `${BASE_GEOLOCATION_URL}?latitude=${latNum}&longitude=${lngNum}&localityLanguage=en`
        );
        const data = await response.json();
        setCityName(data?.city || data?.locality || "");
        setCountry(data?.countryName || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocationData();
  }, [latNum, lngNum]);

  return (
    <div className="flex flex-col gap-4 me-4">
      <h2 className="text-2xl font-bold">Add New Bookmark</h2>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="cityName">CityName</label>
          <input
            type="text"
            id="cityName"
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="Enter City Name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="p-1 px-2  bg-white border-2 border-gray-300 font-semibold rounded-lg shadow-sm"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </button>
          <button className="p-1 px-3 bg-violet-500 text-white font-semibold rounded-lg shadow-sm">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookMark;
