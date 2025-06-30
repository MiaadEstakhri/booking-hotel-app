import { useContext, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { HotelTypes } from "../LocationList/LocationList.type";

type HotelsContextType = {
  isLoading: boolean;
  hotels: HotelTypes[];
};

const HotelsContext = createContext<HotelsContextType>({
  isLoading: false,
  hotels: [],
});

function HotelsProvider({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const options = searchParams.get("options");
  const room = options ? JSON.parse(options).Room : "";
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:3000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelsContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;

export const useHotels = () => {
  return useContext(HotelsContext);
};
