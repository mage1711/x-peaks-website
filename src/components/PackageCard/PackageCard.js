import Atropos from "atropos/react";
import "atropos/css/min";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import countryCodes from "../../countryCodes.json";

const getCountryCode = (country) => {
  for (let code in countryCodes) {
    if (countryCodes[code]?.toLowerCase() === country?.toLowerCase()) {
      return code;
    }
  }
  return "";
};

const PackageCard = ({
  destinationPackage = {
    name: "",
    price: 0,
    continent: "",
    nation: "",
    imageURL: "",
    description: "",
    type: "",
    status: "",
  },
  dark = true,
  onClick = null,
}) => {
  const { t } = useTranslation();

  return (
    <Atropos
      activeOffset={
        destinationPackage?.status?.toLowerCase() === "work in progress"
          ? 5
          : 20
      }
      shadowScale={
        destinationPackage?.status?.toLowerCase() === "work in progress"
          ? 0.8
          : 0.85
      }
      rotateTouch="scroll-y"
    >
      <div
        className="rounded-xl flex flex-col cursor-pointer atropos-scale atropos-rotate bg-white"
        style={{
          backgroundColor: dark ? "#3451A3" : "#fff",
          cursor:
            destinationPackage.status === "Work in Progress"
              ? "inherit"
              : "pointer",
        }}
        onClick={() => {
          if (onClick) {
            onClick();
          } else if (destinationPackage.status !== "Work in Progress") {
            window.location.href = `/packages/${destinationPackage.id}`;
          }
        }}
      >
        <div
          className="p-0 m-0 w-full h-96 bg-cover bg-center rounded-t-lg"
          style={{
            maxHeight: "200px",
            backgroundImage: `url(${destinationPackage.imageURL})`,
            opacity: destinationPackage.status === "Work in Progress" ? 0.4 : 1,
          }}
        >
          {destinationPackage.status === "Work in Progress" && (
            <h2
              className="text-black absolute w-full text-center font-bold opacity-100"
              style={{
                fontSize: "44px",
                top: "20%",
                transform: "rotate(-10deg)",
              }}
            >
              {t("coming_soon")}
            </h2>
          )}
        </div>
        <div
          className="rounded-b-lg p-6 flex flex-col gap-2 md:gap-0 space-between justify-between"
          style={{
            backgroundColor: dark ? "#3451A3" : "#fff",
            opacity: destinationPackage.status === "Work in Progress" ? 0.4 : 1,
          }}
        >
          <div className="flex justify-between" data-atropos-offset="2.5">
            <h3
              className="text-xl font-bold -mt-2 mb-2 text-left"
              style={{ color: dark ? "white" : "#132441" }}
            >
              {destinationPackage.name}
            </h3>
            <div className="flex flex-row gap-2">
              <div
                className=" opacity-70"
                style={{
                  color: dark ? "white" : "#132441",
                  textAlign: "right",
                  width: "fit-content",
                }}
              >
                {destinationPackage.continent.toUpperCase()}
              </div>
              {destinationPackage.nation !== "" && (
                <div
                  src=""
                  alt={destinationPackage.nation}
                  style={{
                    height: "13px",
                    width: "13px",
                    borderRadius: "10px",
                    backgroundImage: `url(https://flagcdn.com/h40/${getCountryCode(
                      destinationPackage.nation
                    )}.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginTop: "-1px",
                    opacity: 0.9,
                  }}
                />
              )}
            </div>
          </div>
          <p
            className="subheading text-sm"
            style={{
              color: dark ? "#DAF561" : "#132441",
              whiteSpace: "pre-wrap",
              textAlign: "left",
            }}
            data-atropos-offset="2.5"
          >
            {destinationPackage[`subtitle_${i18n.language.split("-")[0]}`]}
          </p>
        </div>
      </div>
    </Atropos>
  );
};

export default PackageCard;
