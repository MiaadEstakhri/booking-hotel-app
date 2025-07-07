import { useContext, createContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";

export type BookMarkTypes = {
  id: number;
  countryCode: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
};

type BookMarkContextType = {
  isLoading: boolean;
  bookMarks: BookMarkTypes[];
  getBookMark: (id: string | number) => Promise<void>;
  isLoadingCurrBookmark: boolean;
  currentBookmark: BookMarkTypes | null;
};

const BookMarkContext = createContext<BookMarkContextType>({
  isLoading: false,
  bookMarks: [],
  getBookMark: async () => {},
  isLoadingCurrBookmark: false,
  currentBookmark: null,
});

const BASE_URL = "http://localhost:3000/bookmarks";

function BookMarkProvider({ children }: { children: React.ReactNode }) {
  const [currentBookmark, setCurrentBookmark] = useState<BookMarkTypes | null>(
    null
  );
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
        bookMarks: bookMarks || [],
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
