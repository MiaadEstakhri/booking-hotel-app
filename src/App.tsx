import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/hotelsProvider";
import SingleHotel from "./components/SingleHotel/singleHotel";

function App() {
  return (
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
        </Routes>
      </main>
    </HotelsProvider>
  );
}

export default App;
