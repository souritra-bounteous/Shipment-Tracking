import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


type Props = {
  lat: number;
  lng: number;
};

export default function OpenMap({ lat, lng }: Props) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} className="h-72 w-full rounded-lg">
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>Shipment Location</Popup>
      </Marker>
    </MapContainer>
  );
}
