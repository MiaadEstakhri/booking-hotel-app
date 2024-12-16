import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <div className="m-5">
      <Toaster />
      <Header />
      <LocationList />
    </div>
  );
}

export default App;
