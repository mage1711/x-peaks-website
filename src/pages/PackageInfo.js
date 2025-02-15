import React, { useCallback, useEffect, useState, Suspense } from "react";
import "./Homepage.css";
import {
  BrochureBanner,
  Button,
  CarouselOnScroll,
  Footer,
  Map,
  Reviews,
  RevealOnScroll,
} from "../components";
import axios from "axios";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { createStripeSession } from "../stripe";

import countryCodes from "../countryCodes.json";
import PromoCodePopup from "../components/PromoCodePopup/PromoCodePopup";

const exchangeRates = {
  EUR: 1,
  CHF: 1,
  GBP: 0.85,
  USD: 1.1,
};

function getCookie(key) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === key ? decodeURIComponent(parts[1]) : r;
  }, "");
}

const getCountryCode = (country) => {
  for (let code in countryCodes) {
    if (countryCodes[code]?.toLowerCase() === country?.toLowerCase()) {
      return code;
    }
  }
  return "";
};

const getDefaultCurrency = () => {
  if (getCookie("currency")) {
    return getCookie("currency");
  }
  if (i18n.language.split("-")[0] === "en") {
    return "GBP";
  } else if (i18n.language.split("-")[0] === "de") {
    return "EUR";
  } else if (i18n.language.split("-")[0] === "it") {
    return "EUR";
  } else {
    return "USD";
  }
};

const PackageInfo = () => {
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState({});
  const [versions, setVersions] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(
    -window.innerHeight / 5 +
      window.innerHeight / 2 -
      document.body.scrollTop / 2
  );
  const [packageInfo, setPackageInfo] = useState();
  const [isPromoPopupOpen, setIsPromoPopupOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCouponId, setAppliedCouponId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { t } = useTranslation();

  const currency = getCookie("currency") || getDefaultCurrency();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
        const packagesEndpoint = `https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblL8QWcYEPr3ak27/${window.location.href
          .split("/")
          .pop()}`;
        const versionsEndpoint = `https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblOm6jBP7DmoAGg5/`;
        const stepsEndpoint = `https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblEH7AGqMnmsHuGR/`;

        const [packagesResponse, versionsResponse, stepsResponse] =
          await Promise.all([
            axios.get(packagesEndpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
            axios.get(versionsEndpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
            axios.get(stepsEndpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
          ]);
        const versions = versionsResponse.data?.records
          .map((r) => ({ id: r.id, ...r.fields }))
          .filter((r) =>
            r.package.find(
              (id) => id === window.location.href.split("/").pop().split("#")[0]
            )
          );
        const steps = stepsResponse.data?.records
          .map((r) => r.fields)
          .filter((step) =>
            step.packageVersion?.find((id) =>
              versions.map((v) => v.id).includes(id)
            )
          );
        setVersions(versions);
        setSteps(steps);
        setPackageInfo(
          { id: packagesResponse.data?.id, ...packagesResponse.data?.fields } ??
            []
        );
        setSelectedVersion(
          versions.find((v) => v.defaultVersion) ?? versions[0]
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleScroll = useCallback(() => {
    setOffset(
      -window.innerHeight / 5 +
        window.innerHeight / 2 -
        document.body.scrollTop / 2
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);
    window.addEventListener("resize", handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  const handleApplyDiscount = (discountPercent, couponId) => {
    setDiscountPercent(discountPercent);
    setAppliedCouponId(couponId);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (selectedVersion && selectedVersion.price) {
      setLoading(true);
      const basePrice = selectedVersion.price * exchangeRates[currency];
      const additionalCosts = selectedSteps.reduce(
        (a, b) => a + b.additionalCost * exchangeRates[currency],
        0
      );
      const subtotal = (basePrice + additionalCosts);
      const finalPrice = subtotal * (1 - discountPercent/100);
      
      createStripeSession(
        currency,
        versions.length > 1 ? selectedVersion.name : packageInfo.name,
        packageInfo.imageURL,
        Math.round(finalPrice),
        appliedCouponId,
        quantity
      );
    }
  };

  return (
    <>
      <div>
        <div className="preloader-image"></div>
        <div className="preloader-image-bg"></div>
        <div className="preloader-left"></div>
        <div className="preloader-right"></div>
      </div>
      {packageInfo && (
        <div>
          <div
            style={{
              backgroundImage: `url(${packageInfo.imageURL})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              content: "",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              zIndex: "-2",
            }}
          ></div>
          <div className="hero-small">
            <div
              className="container content content-packages"
              style={{
                height: "67vh",
                width: "100vw",
                top: offset + "px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  textAlign: "left",
                  fontWeight: "bold",
                  padding: "0 24px",
                  width: "100%",
                }}
              >
                <h1 className="text-5xl md:text-7xl font-bold pb-4">
                  {packageInfo.name}
                </h1>
                <p>{packageInfo[`subtitle_${i18n.language.split("-")[0]}`]}</p>
                <br />
                <Button href="#purchase" shape="1" style={{ margin: "0px" }}>
                  {t("from")}{" "}
                  {(
                    selectedVersion?.price * exchangeRates[currency]
                  ).toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                    maximumFractionDigits: 0,
                  })}
                </Button>
                <br />
                <br />
              </div>
            </div>
          </div>
          <section style={{ backgroundColor: "#132441" }}>
            <div
              className="container section m-auto"
              style={{ width: "fit-content" }}
            >
              <div
                className="flex md:flex-row flex-col gap-4 py-8 md:py-16 justify-between"
                style={{ width: "fit-content", margin: "auto" }}
              >
                <div className="w-1/2">
                  <div
                    className="flex flex-row gap-2 m-0 md:m-auto"
                    style={{ width: "fit-content" }}
                  >
                    <div
                      className="text-white opacity-70"
                      style={{ width: "fit-content" }}
                    >
                      <h1 className="text-7xl font-bold text-left">
                        {packageInfo.continent}
                      </h1>
                      <p className="subheading text-3xl mt-4 text-left">
                        {packageInfo.nation}
                        {packageInfo.nation !== "" && (
                          <div
                            src=""
                            alt={packageInfo.nation}
                            style={{
                              display: "inline-block",
                              marginLeft: "16px",
                              height: "20px",
                              width: "20px",
                              borderRadius: "10px",
                              backgroundImage: `url(https://flagcdn.com/h40/${getCountryCode(
                                packageInfo.nation
                              )}.png)`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              opacity: 0.9,
                            }}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <p
                    className="subheading mt-4"
                    style={{
                      fontSize: "18px",
                      fontWeight: 200,
                      color: "white",
                      opacity: "0.66",
                      width: "100%",
                    }}
                  >
                    {packageInfo[`description_${i18n.language.split("-")[0]}`]}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section
            style={{ backgroundColor: "#f0f1ff", paddingBottom: "24px" }}
          >
            <div className="container m-auto px-0 py-0 md:px-10 md:py-8">
              <div className="flex flex-col w-fit md:w-full align-center md:flex-row pt-16 pb-16 md:pt-8 md:pb-0 justify-between gap-8 md:gap-0 m-auto">
                <div className="text-center" style={{ maxWidth: "250px" }}>
                  <p className="uppercase opacity-30 font-bold text-sm m-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 inline mr-1 my-0"
                      style={{ marginTop: "-2px" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("next_start_date")}
                  </p>
                  <h3
                    className="font-bold text-xl mt-2"
                    style={{ color: "#132441" }}
                  >
                    {packageInfo[`period_${i18n.language.split("-")[0]}`]}
                  </h3>
                </div>
                <div className="text-center" style={{ maxWidth: "250px" }}>
                  <p className="uppercase opacity-30 font-bold text-sm m-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 inline mr-1 my-0"
                      style={{ marginTop: "-2px" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("duration")}
                  </p>
                  <h3
                    className="font-bold text-xl mt-2"
                    style={{ color: "#132441" }}
                  >
                    {selectedVersion.durationDays} {t("days")}
                  </h3>
                </div>
                <div className="text-center" style={{ maxWidth: "250px" }}>
                  <p className="uppercase opacity-30 font-bold text-sm m-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 inline mr-1 my-0"
                      style={{ marginTop: "-2px" }}
                    >
                      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    {t("accommodation")}
                  </p>
                  <h3
                    className="font-bold text-xl mt-2"
                    style={{ color: "#132441" }}
                  >
                    {
                      packageInfo[
                        "accommodation_" + i18n.language.split("-")[0]
                      ]
                    }
                  </h3>
                </div>
                <div className="text-center" style={{ maxWidth: "250px" }}>
                  <p className="uppercase opacity-30 font-bold text-sm m-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 inline mr-1 my-0"
                      style={{ marginTop: "-2px" }}
                    >
                      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                    {t("group_size")}
                  </p>
                  <h3
                    className="font-bold text-xl mt-2"
                    style={{ color: "#132441" }}
                  >
                    {t("max_15_ppl")}
                  </h3>
                </div>
                <div className="text-center" style={{ maxWidth: "250px" }}>
                  <p className="uppercase opacity-30 font-bold text-sm m-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 inline mr-1 my-0"
                      style={{ marginTop: "-2px" }}
                    >
                      <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                    </svg>
                    {t("team")}
                  </p>
                  <h3
                    className="font-bold text-xl mt-2"
                    style={{ color: "#132441" }}
                  >
                    {t("experienced_guide")}
                  </h3>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-8 px-8" style={{ backgroundColor: "#f9f9ff" }}>
            <div
              className={`container m-auto px-0 md:px-8 pt-16${
                versions.length === 1 ? " pb-16" : ""
              }`}
            >
              <h1 className="text-3xl font-bold text-left pb-8">
                {t("map_itinerary")}
              </h1>
              <Map
                basePrice={selectedVersion?.price * exchangeRates[currency]}
                locations={steps.filter((step) =>
                  step.packageVersion.includes(selectedVersion.id)
                )}
                setSelectedSteps={(steps) => setSelectedSteps(steps)}
                height={versions.length > 1 ? "50vh" : "70vh"}
              />
            </div>
          </section>
          {versions.length > 1 && (
            <section
              className="pb-8 px-8"
              style={{ backgroundColor: "#f9f9ff" }}
            >
              <div className="container m-auto px-0 md:px-8 pb-8">
                <h1 className="text-xl font-bold text-left pb-4 opacity-30">
                  {t("select_version")}
                </h1>
                <div className="flex flex-col md:flex-row gap-4">
                  {versions.map((version, index) => (
                    <div
                      key={index}
                      className={`relative flex justify-between flex-col gap-4 text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl w-full cursor-pointer p-6 ${
                        selectedVersion.id === version.id
                          ? "border-4 shadow-none"
                          : ""
                      }`}
                      style={{ borderColor: "#daf561" }}
                      onClick={() => setSelectedVersion(version)}
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <h3 className="text-xl font-bold">{version.name}</h3>
                        <p
                          className="px-2 rounded text-sm my-auto bg-gray-200 text-gray-500 pt-2"
                          style={{
                            whiteSpace: "nowrap",
                            width: "fit-content",
                          }}
                        >
                          {version.durationDays} {t("days")}
                        </p>
                      </div>
                      <p className="text-sm opacity-50">
                        {steps
                          .filter((step) =>
                            step.packageVersion.includes(version.id)
                          )
                          .sort((a, b) => a.stepNumber - b.stepNumber)
                          .map((step, index, elements) => (
                            <span key={index}>
                              {step.name}
                              {index < elements.length - 1 ? ", " : ""}
                            </span>
                          ))}
                      </p>
                      {selectedVersion.id === version.id ? (
                        <div
                          className="flex justify-end w-full cursor-pointer opacity-40 pr-2"
                          style={{ color: "#142441" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5 mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div className="p-0 mt-1">{t("selected")}</div>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            console.log(version);
                            setSelectedVersion(version);
                          }}
                          className="flex justify-end w-full cursor-pointer"
                          style={{
                            height: "fit-content",
                            alignSelf: "flex-end",
                          }}
                        >
                          <Button style={{ margin: "0px" }}>
                            {t("select")}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {(packageInfo[`brochure_${i18n.language.split("-")[0]}`] ||
            packageInfo[`brochure_en`]) && (
            <div className="pt-8" style={{ backgroundColor: "#f9f9ff" }}>
              <div
                className={`m-0 w-full px-0 pt-8${
                  versions.length === 1 ? " pb-8" : ""
                }`}
              >
                <BrochureBanner
                  imageUrl={packageInfo.imageURL}
                  brochureUrl={
                    packageInfo[`brochure_${i18n.language.split("-")[0]}`] ??
                    packageInfo[`brochure_en`]
                  }
                  packageName={packageInfo.name}
                />
              </div>
            </div>
          )}
          <section
            style={{
              padding: "300px 0",
              margin: "-250px 0",
              backgroundColor: "#f9f9ff",
            }}
            id="image-slideshow"
          >
            {packageInfo.gallery?.length && (
              <div
                style={{
                  padding: "300px 0",
                  margin: "-250px 0",
                }}
              >
                <RevealOnScroll delay={0}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <CarouselOnScroll
                      images={(() => {
                        let images = packageInfo.gallery;
                        if (images.length === 0) return [];
                        while (images.length <= 16) {
                          images = images.concat(images);
                        }
                        return images;
                      })()}
                    />
                  </Suspense>
                </RevealOnScroll>
              </div>
            )}
          </section>
          <section
            className="p-8"
            style={{
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              paddingBottom: 0,
              zIndex: 0,
              backgroundColor: "#f9f9ff",
            }}
            id="purchase"
          >
            <div className="container m-auto px-0 md:px-8 pb-16">
              <h1 className="text-3xl font-bold text-left pb-8">
                {t("book_now")}
              </h1>
              <div
                className="mt-6 bg-white shadow-md hover:shadow-lg transition bg-clip-border rounded-xl w-full cursor-pointer"
                onClick={handleBuyClick}
              >
                <div
                  className="w-full p-0 m-0 rounded-t-xl"
                  style={{
                    height: "30vh",
                    backgroundImage: `url(${packageInfo.imageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="relative flex flex-col gap-8 text-gray-700  p-6">
                  <div className="whitespace-normal md:whitespace-nowrap">
                    <div className="w-full flex justify-between gap-2">
                      <p
                        className="text-xs md:text-sm opacity-50 uppercase font-bold"
                        style={{ width: "fit-content" }}
                      >
                        {t("book_your_spot")}
                      </p>
                      <p
                        className="text-xs md:text-sm opacity-50 bg-gray-200 uppercase font-bold py-1 px-2 rounded"
                        style={{ width: "fit-content" }}
                      >
                        {selectedVersion.durationDays + " days"}
                      </p>
                    </div>
                    <div className="flex">
                      <h3 className="text-2xl font-bold">
                        {versions.length > 1
                          ? selectedVersion.name
                          : packageInfo.name}{" "}
                        ({packageInfo[`period_${i18n.language.split("-")[0]}`]})
                      </h3>
                    </div>
                    <p className="subheading text-sm opacity-50 mt-3">
                      {t("we_carefully_picked")} "
                      {packageInfo[`period_${i18n.language.split("-")[0]}`]}"{" "}
                      {t("as_the_best")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm opacity-70 font-medium">{t("quantity")}:</label>
                      <div className="flex items-center border rounded-lg bg-white shadow-sm" style={{ borderColor: "#e5e7eb" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (quantity > 1) setQuantity(quantity - 1);
                          }}
                          className="px-3 py-1.5 hover:bg-gray-50 transition text-base font-medium rounded-l-lg"
                          style={{ color: "#132441" }}
                        >
                          -
                        </button>
                        <span className="px-4 py-1.5 border-x font-medium text-sm" style={{ borderColor: "#e5e7eb", color: "#132441" }}>
                          {quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuantity(quantity + 1);
                          }}
                          className="px-3 py-1.5 hover:bg-gray-50 transition text-base font-medium rounded-r-lg"
                          style={{ color: "#132441" }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex bg-white md:bg-gray-100 flex-col-reverse md:flex-row w-full gap-4 md:gap-8 justify-start md:justify-end items-end md:items-center"
                    style={{
                      width: "fit-content",
                      marginLeft: "auto",
                      float: "right",
                      borderRadius: "50px",
                    }}
                  >
                    <p
                      className="text-sm opacity-60"
                      style={{
                        maxWidth: "350px",
                        width: "fit-content",
                        textAlign: "right",
                        fontSize: "12px",
                        lineHeight: "1.3",
                        margin: "auto 0",
                        paddingTop: "6px",
                      }}
                    >
                      {t("deposit")}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        style={{
                          margin: "0px",
                        }}
                        onClick={handleBuyClick}
                      >
                        {loading ? (
                          <>{t("loading")}...</>
                        ) : (
                          <>
                            {t("buy_for")}{" "}
                            {discountPercent > 0 && (
                              <span className="line-through text-gray-400 mr-2">
                                {(
                                  (selectedVersion?.price * exchangeRates[currency] +
                                  selectedSteps.reduce(
                                    (a, b) => a + b.additionalCost * exchangeRates[currency],
                                    0
                                  )) * quantity
                                ).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: currency,
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            )}
                            {(
                              (selectedVersion?.price * exchangeRates[currency] +
                              selectedSteps.reduce(
                                (a, b) => a + b.additionalCost * exchangeRates[currency],
                                0
                              )) * quantity * (1 - discountPercent/100)
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: currency,
                              maximumFractionDigits: 0,
                            })}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  {quantity > 1 && (
                    <p 
                      className="text-sm transition-colors self-end mr-1"
                      style={{
                        color: "#132441",
                        fontWeight: "500",
                        opacity: "0.8"
                      }}
                    >
                      {t("price_per_unit")}:{" "}
                      {(
                        (selectedVersion?.price * exchangeRates[currency] +
                        selectedSteps.reduce(
                          (a, b) => a + b.additionalCost * exchangeRates[currency],
                          0
                        )) * (1 - discountPercent/100)
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: currency,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPromoPopupOpen(true);
                    }}
                    className="text-sm transition-colors self-end mr-1"
                    style={{
                      color: "#3451A3",
                      fontWeight: "500",
                      opacity: "0.8",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#132441"}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#3451A3";
                      e.target.style.opacity = "0.8";
                    }}
                  >
                    {t("use_promo_code")}
                  </button>
                </div>
              </div>
              <div
                className="relative flex flex-col md:flex-row mt-6 gap-8 text-gray-700 bg-white shadow-md hover:shadow-lg transition bg-clip-border rounded-xl w-full p-6 cursor-pointer"
                onClick={() => (window.location.href = "/contact")}
              >
                <div className="whitespace-normal md:whitespace-nowrap">
                  <p
                    className="text-sm opacity-50 mb-1 uppercase font-bold"
                    style={{ width: "fit-content" }}
                  >
                    {t("create_your_own_package")}
                  </p>
                  <div className="flex">
                    <h3 className="text-xl font-bold">{t("custom_dates")}</h3>
                  </div>
                </div>
                <div
                  className="w-full flex justify-between"
                  style={{
                    alignItems: "center",
                  }}
                >
                  <p
                    className="text-sm opacity-50 mt-2 bg-gray-200 uppercase font-bold py-1 px-2 rounded"
                    style={{ width: "fit-content", visibility: "hidden" }}
                  ></p>
                  <Button href="/contact" style={{ margin: "0px" }}>
                    {t("contact_us_low")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5 mx-2 inline"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section style={{ backgroundColor: "#132441", paddingTop: "15vh" }}>
            <Reviews theme="dark" />
            <div
              className="container m-auto text-center py-16"
              data-aos="fade-up"
            >
              <div>
                <p className="text-sm text-white m-auto">
                  <span style={{ color: "#daf561" }}>--</span>{" "}
                  <span className="opacity-50">{t("get_in_touch")}</span>
                </p>
                <h2 className="section-heading w-full text-white font-bold m-auto">
                  {t("contact_us_low")}
                </h2>
              </div>
              <div>
                <p
                  className="subheading opacity-50 text-white m-auto mt-4"
                  style={{ maxWidth: "650px", fontSize: "1.3em" }}
                >
                  {t("personalize_experience")}
                </p>
                <br />
                <Button
                  icon="send"
                  href="/contact"
                  style={{ margin: "0px auto" }}
                >
                  {t("contact_us_low")}
                </Button>
              </div>
            </div>
          </section>
          <div className="relative">
            <Footer />
          </div>
          <PromoCodePopup 
            isOpen={isPromoPopupOpen}
            onClose={() => setIsPromoPopupOpen(false)}
            packageId={packageInfo?.id}
            onApplyDiscount={handleApplyDiscount}
          />
        </div>
      )}
    </>
  );
};

export default PackageInfo;
