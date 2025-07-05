import { useContext, createContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { HotelTypes } from "../LocationList/LocationList.type";
import toast from "react-hot-toast";
import { SingleHotelTypes } from "../SingleHotel/SingleHotel.type";

type BookMarkContextType = {
  isLoading: boolean;
  BookMark: HotelTypes[];
  getBookMark: (id: string | number) => Promise<void>;
  isLoadingCurrBookmark: boolean;
  currentBookmark: SingleHotelTypes | null;
};

const BookMarkContext = createContext<BookMarkContextType>({
  isLoading: false,
  BookMark: [],
  getBookMark: async () => {},
  isLoadingCurrBookmark: false,
  currentBookmark: null,
});

const BASE_URL = "http://localhost:3000/bookmarks";

function BookMarkProvider({ children }: { children: React.ReactNode }) {
  const [currentBookmark, setCurrentBookmark] =
    useState<SingleHotelTypes | null>(null);
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] =
    useState<boolean>(false);

  const { isLoading, data: bookMarks } = useFetch(BASE_URL);

  async function getBookMark(id: string | number) {
    setIsLoadingCurrBookmark(true);
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setCurrentBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookMarkContext.Provider
      value={{
        isLoading,
        BookMark: bookMarks || [],
        getBookMark,
        isLoadingCurrBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
}

export default BookMarkProvider;

export const useBookMark = () => {
  return useContext(BookMarkContext);
};
