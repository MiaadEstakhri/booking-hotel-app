import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export type BookMarkTypes = {
  countryCode: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  id?: number | string;
};

type BookMarkContextType = {
  isLoading: boolean;
  bookMarks: BookMarkTypes[];
  getBookMark: (id: string | number) => Promise<void>;
  currentBookmark: BookMarkTypes | null;
  createBookMark: (createBookMark: BookMarkTypes) => Promise<void>;
};

const BookMarkContext = createContext<BookMarkContextType>({
  isLoading: false,
  bookMarks: [],
  getBookMark: async () => {},
  currentBookmark: null,
  createBookMark: async () => {},
});

const BASE_URL = "http://localhost:3000/bookmarks";

function BookMarkProvider({ children }: { children: React.ReactNode }) {
  const [currentBookmark, setCurrentBookmark] = useState<BookMarkTypes | null>(
    null
  );
  const [bookMarks, setBookMarks] = useState<BookMarkTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getBookMarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}`);
        setBookMarks(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
    getBookMarkList();
  }, []);

  async function getBookMark(id: string | number) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);

      setCurrentBookmark(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookMark(createBookMark: BookMarkTypes) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}`, createBookMark);
      setBookMarks((prev) => [...prev, data]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookMarkContext.Provider
      value={{
        getBookMark,
        isLoading,
        currentBookmark,
        createBookMark,
        bookMarks,
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
