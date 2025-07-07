import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import useUrlLocation from "../../hooks/useUrlLocation";

const BASE_GEOLOCATION_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookMark() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [errorGeoLocation, setErrorGeoLocation] = useState<string | null>("");
  const navigate = useNavigate();
  const [latNum, lngNum] = useUrlLocation();

  useEffect(() => {
    if (!latNum || !lngNum) return;
    const fetchLocationData = async () => {
      setIsLoadingGeoLocation(true);
      setErrorGeoLocation(null);
      try {
        const response = await fetch(
          `${BASE_GEOLOCATION_URL}?latitude=${latNum}&longitude=${lngNum}&localityLanguage=en`
        );
        const data = await response.json();
        if (!data?.countryCode) {
          throw new Error("This location is not city! Please try again.");
        }
        setCityName(data?.city || data?.locality || "");
        setCountry(data?.countryName || "");
        setCountryCode(data?.countryCode || "");
      } catch (error) {
        if (error instanceof Error) {
          setErrorGeoLocation(error?.message);
        } else {
          setErrorGeoLocation("An unexpected error occurred");
        }
      } finally {
        setIsLoadingGeoLocation(false);
      }
    };
    fetchLocationData();
  }, [latNum, lngNum]);

  if (isLoadingGeoLocation) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (errorGeoLocation) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {errorGeoLocation}
      </div>
    );
  }

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
          <div className="flex items-center justify-between border-2 border-gray-300 rounded-md p-2">
            <input
              type="text"
              id="country"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              className="w-6 h-6 "
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="p-1 px-2  bg-white border-2 border-gray-300 font-semibold rounded-lg shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
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
