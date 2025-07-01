import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useHotels } from "./context/hotelsProvider";
import { useState } from "react";

function Map() {
  const { isLoading, hotels } = useHotels();
  const [mapCenter] = useState<[number, number]>([20, 3]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[300px] md:h-[700px] w-full rounded-xl md:ms-3"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {hotels.map(({ id, latitude, longitude, host_location }) => {
        return (
          <Marker key={id} position={[latitude as number, longitude as number]}>
            <Popup>{host_location}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
