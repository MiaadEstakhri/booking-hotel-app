import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface CreateBookMarkTypes {
  countryCode: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
}
export interface BookMarkTypes extends CreateBookMarkTypes {
  id: number | string;
}

interface BookMarkContextType {
  isLoading: boolean;
  bookMarks: BookMarkTypes[];
  currentBookmark: BookMarkTypes | null;
  getBookMark: (id: string | number) => Promise<void>;
  createBookMark: (createBookMark: CreateBookMarkTypes) => Promise<void>;
  deleteBookMark: (id: string | number) => Promise<void>;
}

const BookMarkContext = createContext<BookMarkContextType>({
  isLoading: false,
  bookMarks: [],
  currentBookmark: null,
  getBookMark: async () => {},
  createBookMark: async () => {},
  deleteBookMark: async () => {},
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

  async function createBookMark(createBookMark: CreateBookMarkTypes) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}`, createBookMark);
      setCurrentBookmark(data);
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

  async function deleteBookMark(id: string | number) {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${id}`);

      setBookMarks((prev) =>
        prev.filter((bookmark: BookMarkTypes) => bookmark.id !== id)
      );
      setCurrentBookmark(null);
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
        deleteBookMark,
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
