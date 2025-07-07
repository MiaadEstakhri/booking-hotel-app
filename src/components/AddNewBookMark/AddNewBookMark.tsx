import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";

function AddNewBookMark() {
  const navigate = useNavigate();
  const [latNum, lngNum] = useUrlLocation();
  console.log(latNum, lngNum);
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="cityName">CityName</label>
        <input
          type="text"
          id="cityName"
          className="border-2 border-gray-300 rounded-md p-2"
          placeholder="Enter City Name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          className="border-2 border-gray-300 rounded-md p-2"
          placeholder="Enter Country"
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
  );
}

export default AddNewBookMark;
