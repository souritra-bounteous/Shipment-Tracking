import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Props = {
  lat?: number;
  lng?: number;
  label?: string;
};

const markerIcon = divIcon({
  className: "",
  html: '<div class="h-5 w-5 rounded-full border-4 border-white bg-red-500 shadow-lg shadow-red-500/40"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function LiveMap({ lat = 12.9716, lng = 77.5946, label = "Shipment location" }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-80 w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>{label}</Popup>
      </Marker>
    </MapContainer>
  );
}
