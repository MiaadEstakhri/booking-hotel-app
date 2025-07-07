import { useSearchParams } from "react-router-dom";

export default function useUrlLocation() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const latNum = Number(lat);
  const lngNum = Number(lng);

  return [latNum, lngNum];
}
