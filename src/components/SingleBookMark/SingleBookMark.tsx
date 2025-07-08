import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { useBookMark } from "../context/BookMarkProvider";

function SingleBookMark() {
  const { id } = useParams();
  const { currentBookmark, isLoading, getBookMark } = useBookMark();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBookMark(id);
    }
  }, [id]);

  if (isLoading && !currentBookmark)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div>
      <button
        className="p-1 px-2 mb-4 bg-white border-2 border-gray-300 font-semibold rounded-lg shadow-sm"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      <div className="p-4 border rounded-xl shadow-md md:me-3">
        <ReactCountryFlag countryCode={currentBookmark?.countryCode || ""} />
        &nbsp; <strong>{currentBookmark?.cityName}</strong> &nbsp;{" "}
        <span>{currentBookmark?.country}</span>
      </div>
    </div>
  );
}

export default SingleBookMark;
