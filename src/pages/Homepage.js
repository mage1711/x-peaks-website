import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import "./Homepage.css";
import { RevealOnScroll, Button, Footer, Reviews } from "../components";
import axios from "axios";

import { useTranslation } from "react-i18next";

const CarouselOnScroll = lazy(() =>
  import("../components/CarouselOnScroll/CarouselOnScroll")
);
const PackageCard = lazy(() => import("../components/PackageCard/PackageCard"));

const Homepage = () => {
  const [packages, setPackages] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
        const packagesEndpoint =
          "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblL8QWcYEPr3ak27";
        const carouselEndpoint =
          "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblm6LIbBdfW2hM3b";

        const [packagesResponse, carouselResponse] = await Promise.all([
          axios.get(packagesEndpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          axios.get(carouselEndpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        let recordsP = packagesResponse?.data?.records;
        let recordsC = carouselResponse?.data?.records;

        recordsP = recordsP?.map((record) => ({
          ...record.fields,
          id: record.id,
        }));
        recordsC = recordsC?.map((record) => record.fields.imageURL);
        while (recordsC.length < 6) {
          recordsC = recordsC.concat(recordsC);
        }
        setTimeout(() => {
          setPackages(recordsP ?? []);
        }, 3500);
        setCarouselImages(recordsC ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [offset, setOffset] = useState(
    -window.innerHeight / 5 +
      window.innerHeight / 2 -
      document.body.scrollTop / 2
  );

  const handleScroll = useCallback(() => {
    setOffset(
      -window.innerHeight / 5 +
        window.innerHeight / 2 -
        document.body.scrollTop / 2
    );
  }, []);

  useEffect(() => {
    handleScroll();
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

  return (
    <div>
      <div>
        <div className="preloader-image"></div>
        <div className="preloader-image-bg"></div>
        <div className="preloader-left"></div>
        <div className="preloader-right"></div>
      </div>
      <div className="hero">
        <div className="top-layer"></div>
        <div className="content" style={{ top: offset + "px" }}>
          <h1 className="hero-title">{t("explore")}</h1>
          <p
            style={{
              alignSelf: "left",
              width: "fit-content",
              margin: "0 0 0 1.5%",
              textTransform: "uppercase",
            }}
          >
            {t("adventure_friends_nature")}
          </p>
        </div>
      </div>
      <div
        className="section"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          paddingBottom: 0,
          zIndex: 0,
        }}
      >
        <img src="images/lines-left.svg" className="contour-line-left" alt="" />
        <img
          src="images/lines-right.svg"
          className="contour-line-right"
          alt=""
        />
        <div
          className="container m-auto text-center"
          data-aos="fade-up"
          style={{ zIndex: 1 }}
        >
          <RevealOnScroll>
            <div>
              <p className="text-sm text-white m-auto">
                <span style={{ color: "#daf561" }}>--</span>{" "}
                <span style={{ opacity: 0.5 }}>{t("xpeaks")}</span>
              </p>
              <h2 className="section-heading w-full text-white font-bold m-auto">
                {t("surrounded_by_adventures")}
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0}>
            <div>
              <p
                className="subheading text-white m-auto mt-4"
                style={{ maxWidth: "650px", fontSize: "1.3em", opacity: 0.5 }}
              >
                {t("collect_memories")}
              </p>
              <br />
              <Button
                icon={"arrow-right"}
                href="/about"
                style={{ margin: "0px auto" }}
              >
                {t("learn_more")}
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#132441",
          padding: "300px 0",
          margin: "-250px 0",
        }}
      >
        <RevealOnScroll delay={0}>
          <Suspense fallback={<div>Loading...</div>}>
            <CarouselOnScroll images={carouselImages} />
          </Suspense>
        </RevealOnScroll>
      </div>
      <div
        className="section"
        style={{
          paddingTop: "20vh",
          position: "relative",
        }}
      >
        <div
          className="container m-auto text-left"
          data-aos="fade-up"
          style={{ position: "relative", zIndex: 2 }}
        >
          <RevealOnScroll>
            <div>
              <p className="text-sm text-white m-auto">
                <span style={{ color: "#daf561" }}>--</span>{" "}
                <span style={{ opacity: 0.5 }}>{t("pick_your_own")}</span>
              </p>
              <h2 className="section-heading w-full text-white font-bold fade-up">
                {t("our_packages")}
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0}>
            <div className="w-full flex flex-row space-between justify-between col-on-mobile">
              <p
                className="subheading text-white fade-up mt-4 mb-4 md:mb-0"
                style={{ maxWidth: "650px", fontSize: "1.3em", opacity: 0.5 }}
              >
                {t("each_package_description")}
              </p>
              <Button
                icon={"arrow-right"}
                href="/packages"
                style={{ margin: "auto 0 0 0" }}
              >
                {t("see_more")}
              </Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0}>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {packages
                ?.filter((p) => p.status?.toLowerCase() === "active")
                .slice(0, 4)
                .map((destinationPackage, index) => (
                  <Suspense fallback={<div>Loading...</div>}>
                    <PackageCard
                      key={index}
                      destinationPackage={destinationPackage}
                    />
                  </Suspense>
                ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
      <div
        className="section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 0,
          backgroundColor: "#132441",
          overflowY: "hidden",
        }}
      >
        <img
          src="images/graphic-lines.svg"
          alt=""
          style={{
            height: "auto",
            position: "absolute",
            bottom: "-30vh",
            left: 0,
            width: "100vw",
            zIndex: 0,
            filter: "brightness(10)",
            opacity: "0.2",
          }}
        />
        <Reviews theme="dark" />
        <div
          className="container m-auto text-center"
          data-aos="fade-up"
          style={{ paddingBottom: "30vh", paddingTop: "10vh" }}
        >
          <RevealOnScroll>
            <div>
              <p className="text-sm text-white m-auto">
                <span style={{ color: "#daf561" }}>--</span>{" "}
                <span style={{ opacity: 0.5 }}>{t("get_in_touch")}</span>
              </p>
              <h2 className="section-heading w-full text-white font-bold m-auto">
                {t("contact_us_low")}
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div>
              <p
                className="subheading text-white m-auto mt-4"
                style={{ maxWidth: "650px", fontSize: "1.3em", opacity: 0.5 }}
              >
                {t("personalize_experience")}
              </p>
              <br />
              <Button
                icon="send"
                href="/contact"
                style={{ margin: "0px auto" }}
              >
                {t("write_us")}
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
