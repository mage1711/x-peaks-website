import { TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const MapLayer = ({
  steps,
  highlightedLocation,
  handleMarkerClick,
  centre,
  zoom,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(centre, zoom);
  }, [map, centre, zoom]);
  return (
    <>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}?api_key=16da90d1-ad1f-4574-aeee-132f8aa51256"
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        ext="png"
      />
      {steps.map((location, index) => (
        <Marker
          key={index}
          icon={L.divIcon({
            className: `custom-icon${
              highlightedLocation === location.name + location.stepNumber
                ? "-active"
                : ""
            }`,
            html: `<div class="custom-icon-inner">${location.stepNumber}</div>`,
          })}
          position={[location.lat, location.long]}
          eventHandlers={{
            click: () => handleMarkerClick(location),
          }}
        >
          {location.stepNumber}
        </Marker>
      ))}
    </>
  );
};
export default MapLayer;
