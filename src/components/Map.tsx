import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useHotels } from "./context/hotelsProvider";

function Map() {
  const { isLoading, hotels } = useHotels();
  const position = [51.505, -0.09];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[300px] md:h-[700px] w-full rounded-xl md:ms-3"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
