import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useHotels } from "../context/HotelsProvider";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({
  markerLocations,
}: {
  markerLocations: {
    id: number;
    latitude: number;
    longitude: number;
    host_location?: string;
  }[];
}) {
  const { isLoading } = useHotels();
  const [mapCenter, setMapCenter] = useState<[number, number]>([50, 3]);
  const [latNum, lngNum] = useUrlLocation();

  useEffect(() => {
    if (latNum && lngNum) setMapCenter([latNum, lngNum]);
  }, [latNum, lngNum]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[300px] md:h-[780px] w-full rounded-xl md:ms-3 z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <ChangeCenter position={mapCenter} />
      <DetectClick />
      {markerLocations.map(({ id, latitude, longitude, host_location }) => {
        return (
          <Marker key={id} position={[Number(latitude), Number(longitude)]}>
            <Popup>{host_location}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    navigate(`/bookmark/add?lat=${lat}&lng=${lng}`);
  });
  return null;
}
