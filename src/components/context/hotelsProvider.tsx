import { useContext, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { HotelTypes } from "../LocationList/LocationList.type";
import toast from "react-hot-toast";
import { SingleHotelTypes } from "../SingleHotel/SingleHotel.type";

type HotelsContextType = {
  isLoading: boolean;
  hotels: HotelTypes[];
  getHotel: (id: string | number) => Promise<void>;
  isLoadingCurrentHotel: boolean;
  currentHotel: SingleHotelTypes | null;
};

const HotelsContext = createContext<HotelsContextType>({
  isLoading: false,
  hotels: [],
  getHotel: async () => {},
  isLoadingCurrentHotel: false,
  currentHotel: null,
});

const BASE_URL = "http://localhost:3000/hotels";

function HotelsProvider({ children }: { children: React.ReactNode }) {
  const [currentHotel, setCurrentHotel] = useState<SingleHotelTypes | null>(
    null
  );
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] =
    useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const options = searchParams.get("options");
  const room = options ? JSON.parse(options).Room : [];
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id: string | number) {
    setIsLoadingCurrentHotel(true);
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        isLoading,
        hotels: hotels || [],
        getHotel,
        isLoadingCurrentHotel,
        currentHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;

export const useHotels = () => {
  return useContext(HotelsContext);
};
