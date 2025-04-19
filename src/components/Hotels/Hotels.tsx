import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options") || "")?.Room;
  const { isLoading, data } = useFetch(
    "http://localhost:3000/hotels",
    `host_location=${destination || ""}&name_like=${
      destination || ""
    }&accommodates_gts=${room || 1}`
  );
  if (isLoading) <div>Loading...</div>;
  return <div>{data.length}</div>;
}

export default Hotels;
