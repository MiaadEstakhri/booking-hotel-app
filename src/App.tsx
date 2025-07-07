import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMarksLayout from "./components/BookMarkLayout/BookMarksLayout";
import BookMarkProvider from "./components/context/BookMarkProvider";
import BookMark from "./components/BookMark/BookMark";
import SingleBookMark from "./components/SingleBookMark/SingleBookMark";
import AddNewBookMark from "./components/AddNewBookMark/AddNewBookMark";

function App() {
  return (
    <BookMarkProvider>
      <HotelsProvider>
        <main className="px-5 md:px-8 lg:px-16">
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookMarksLayout />}>
              <Route index element={<BookMark />} />
              <Route path=":id" element={<SingleBookMark />} />
              <Route path="add" element={<AddNewBookMark />} />
            </Route>
          </Routes>
        </main>
      </HotelsProvider>
    </BookMarkProvider>
  );
}

export default App;
