import { Outlet } from "react-router-dom";
import Map from "../Map";

export default function AppLayout() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-5">
        <Outlet />
      </div>
      <div className="col-span-7">
        <Map />
      </div>
    </div>
  );
}
