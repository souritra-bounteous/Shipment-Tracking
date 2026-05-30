import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
  return (
    <LoadScript googleMapsApiKey="YOUR_KEY">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "300px" }}
        center={{ lat: 12.9, lng: 77.6 }}
        zoom={10}
      >
        <Marker position={{ lat: 12.9, lng: 77.6 }} />
      </GoogleMap>
    </LoadScript>
  );
}