import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import MapLayer from "./MapLayer";

const getMapCentre = (locations) => {
  const lats = locations.map((location) => location.lat);
  const lngs = locations.map((location) => location.long);
  return [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
  ];
};

const getMapZoom = (locations) => {
  const lats = locations.map((location) => location.lat);
  const lngs = locations.map((location) => location.long);
  const maxLat = Math.max(...lats);
  const minLat = Math.min(...lats);
  const maxLng = Math.max(...lngs);
  const minLng = Math.min(...lngs);
  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;
  const latZoom = Math.ceil(Math.log2(360 / latDiff));
  const lngZoom = Math.ceil(Math.log2(360 / lngDiff));
  return Math.min(latZoom, lngZoom);
};

const avoidOverlap = (locations) => {
  // If there are multiple locations with the same coordinates, add a small offset to each location
  const newLocations = locations.map((location, index) => {
    const newLocation = { ...location };
    if (
      locations.filter(
        (l) => l.lat === location.lat && l.long === location.long
      ).length > 1
    ) {
      newLocation.lat += index * 0.01;
      newLocation.long += index * 0.01;
    }
    return newLocation;
  });
  return newLocations;
};

const Map = ({ basePrice, locations, setSelectedSteps, height }) => {
  const [highlightedLocation, setHighlightedLocation] = useState(null);
  const [optionalSteps, setOptionalSteps] = useState([]);
  const [steps, setSteps] = useState([]);
  const [zoom, setZoom] = useState(getMapZoom(locations));
  const [mapCentre, setMapCentre] = useState(getMapCentre(locations));

  const { t } = useTranslation();

  const handleMarkerClick = (location) => {
    setHighlightedLocation(location.name + location.stepNumber);
  };

  const handleListItemClick = (location) => {
    setHighlightedLocation(location.name + location.stepNumber);
  };

  useEffect(() => {
    setSteps(avoidOverlap(locations));
    setZoom(
      window.innerWidth < 768
        ? getMapZoom(locations) - 1
        : getMapZoom(locations)
    );
    setMapCentre(getMapCentre(locations));
    // eslint-disable-next-line
  }, [locations]);

  return (
    <div>
      <div className="flex flex-col md:flex-row pb-8">
        <div className="w-full md:w-2/3">
          <MapContainer
            center={mapCentre}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: height, zIndex: "1 !important" }}
          >
            <MapLayer
              steps={steps}
              highlightedLocation={highlightedLocation}
              handleMarkerClick={handleMarkerClick}
              centre={mapCentre}
              zoom={zoom}
            />
          </MapContainer>
        </div>
        <div
          className="w-full md:w-1/3 px-0 md:px-4 flex flex-col"
          style={{ maxHeight: window.innerWidth > 768 ? height : "auto" }}
        >
          <div style={{ flexGrow: 1, overflowY: "scroll" }}>
            {locations
              .sort((a, b) => a.stepNumber - b.stepNumber)
              .map((location, index) => (
                <div
                  key={index}
                  onClick={() => handleListItemClick(location)}
                  className="p-4 cursor-pointer flex"
                  style={{
                    backgroundColor:
                      highlightedLocation ===
                      location.name + location.stepNumber
                        ? "#f5f5f5"
                        : "transparent",
                    borderTop: index === 0 ? "none" : "1px solid #e5e5e5",
                  }}
                >
                  <div
                    className="h-full m-auto mr-4"
                    style={{
                      backgroundColor:
                        highlightedLocation ===
                        location.name + location.stepNumber
                          ? "#daf561"
                          : "#132441",
                      borderRadius: "50%",
                      color:
                        highlightedLocation ===
                        location.name + location.stepNumber
                          ? "#132441"
                          : "white",
                      width: "30px",
                      height: "30px",
                      lineHeight: "30px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    <p className="text-center w-full">{location.stepNumber}</p>
                  </div>
                  <div className="flex flex-col" style={{ flexGrow: 1 }}>
                    <p
                      style={{
                        opacity: 0.33,
                        fontSize: "13px",
                        marginTop: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {location["description_" + i18n.language.split("-")[0]]}
                    </p>
                    <h3 className="text-2xl font-bold">{location.name}</h3>

                    {location.optional && (
                      <div className="inline-flex items-center mt-4">
                        <label
                          className="relative flex items-center p-3 -mt-5 -ml-3 rounded-full cursor-pointer"
                          htmlFor="description"
                        >
                          <input
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-blue-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id="description"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setOptionalSteps([...optionalSteps, location]);
                                setSelectedSteps([...optionalSteps, location]);
                              } else {
                                setOptionalSteps(
                                  optionalSteps.filter(
                                    (step) => step.name !== location.name
                                  )
                                );
                                setSelectedSteps(
                                  optionalSteps.filter(
                                    (step) => step.name !== location.name
                                  )
                                );
                              }
                            }}
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label
                          className="mt-px font-light text-gray-700 cursor-pointer select-none"
                          htmlFor="description"
                        >
                          <div>
                            <p className="block text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                              {t("optional_step")}
                            </p>
                            <p
                              className="block text-sm antialiased font-normal leading-normal text-gray-400"
                              style={{ fontWeight: "400" }}
                            >
                              {t("add_for_an_extra")}{" "}
                              {(location.additionalCost ?? 0).toLocaleString(
                                "en-US",
                                {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 0,
                                }
                              )}
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
