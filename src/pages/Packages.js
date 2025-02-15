import React, { useState, useEffect, useCallback } from "react";
import "./Homepage.css";
import {
  RevealOnScroll,
  PackageCard,
  Footer,
  Button,
  Reviews,
} from "../components";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Packages = () => {
  const [continentFiler, setContinentFilter] = useState("all");
  const [offset, setOffset] = useState(
    -window.innerHeight / 5 +
      window.innerHeight / 2 -
      document.body.scrollTop / 2
  );
  const [packages, setPackages] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
        const endpoint =
          "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblL8QWcYEPr3ak27";

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let records = response?.data?.records;
        records = records?.map((record) => ({
          ...record.fields,
          id: record.id,
        }));
        setPackages(records ?? []);
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
      window.addEventListener("wheel", handleScroll);
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
      <div className="hero-small packages-hero">
        <div
          className="content content-packages"
          style={{ top: offset + "px" }}
        >
          <h1 className="hero-title hero-title-small">
            {t("adventures").toUpperCase()}
          </h1>
        </div>
      </div>
      <div
        className="section p-16"
        style={{
          position: "relative",
          backgroundColor: "#f0f1ff",
          color: "#132441",
        }}
      >
        <img
          src="images/lines-right.svg"
          alt=""
          style={{
            position: "absolute",
            right: 0,
            height: "100%",
            filter: "brightness(1)",
            opacity: window.innerWidth > 768 ? 0.2 : 0.1,
          }}
        />
        <div
          className="container m-auto text-left"
          data-aos="fade-up"
          style={{ position: "relative", zIndex: 2 }}
        >
          <RevealOnScroll>
            <div style={{ width: "100%" }}>
              <p className="text-sm m-auto">
                <span style={{ color: "#142331" }}>--</span>{" "}
                <span className="opacity-50">{t("pick_your_own")}</span>
              </p>
              <h2
                className="section-heading font-bold fade-up"
                style={{ maxWidth: "950px" }}
              >
                {t("explore_together")}
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="w-full flex flex-row space-between justify-between col-on-mobile">
              <p
                className="subheading opacity-50 fade-up mt-4"
                style={{ maxWidth: "950px", fontSize: "1.3em" }}
              >
                {t("each_package_description")}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
      <section style={{ backgroundColor: "#f0f1ff" }}>
        <div className="container m-auto pt-8 pb-36 px-8 md:px-0">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h3 className="text-3xl font-bold"></h3>
            <div className="relative h-10 w-full md:w-72 min-w-[200px]">
              <select
                name="cars"
                id="cars"
                value={continentFiler}
                className="peer h-full font-bold font-sans w-full border-b-2 border-blue-gray-500 bg-transparent px-3 py-2.5 text-sm text-blue-gray-700 outline outline-0 transition-all focus:outline-0"
                onChange={(e) => setContinentFilter(e.target.value)}
                style={{ color: "#132441", opacity: "0.8" }}
              >
                {Array.from(
                  new Set(
                    [
                      ...packages,
                      {
                        name: "Custom Package",
                        price: 1000,
                        continent: "WORLDWIDE",
                        nation: "",
                        imageURL:
                          "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                        subtitle_en: "Create your custom experience with us",
                        subtitle_de:
                          "Erschaffen Sie mit uns Ihr individuelles Erlebnis",
                        subtitle_it: "Crea la tua esperienza personalizzata",
                        type: "Custom",
                      },
                    ].map((p) => p.continent.toLowerCase())
                  )
                ).map((continent) => (
                  <option value={continent === "worldwide" ? "all" : continent}>
                    {continent.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {packages
              .filter(
                (p) =>
                  continentFiler === "all" ||
                  continentFiler === p.continent.toLowerCase()
              )
              .filter((p) => p.status?.toLowerCase() === "active")
              .map((destinationPackage, index) => (
                <PackageCard
                  key={index}
                  destinationPackage={destinationPackage}
                  dark={false}
                />
              ))}
            <PackageCard
              key="custom"
              destinationPackage={{
                name: t("personalize_trip"),
                price: 1000,
                continent: "",
                nation: "",
                imageURL:
                  "https://images.pexels.com/photos/978844/pexels-photo-978844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                subtitle_en: "Create your custom experience with us",
                subtitle_de:
                  "Erschaffen Sie mit uns Ihr individuelles Erlebnis",
                subtitle_it:
                  "Non vediamo l’ora di aiutarti a pianificare il tuo prossimo viaggio avventuroso!",
                type: "Custom",
              }}
              dark={false}
              onClick={(e) => {
                window.location.href = "/contact";
              }}
            />
            {packages
              .filter(
                (p) =>
                  continentFiler === "all" ||
                  continentFiler === p.continent.toLowerCase()
              )
              .filter((p) => p.status?.toLowerCase() === "work in progress")
              .map((destinationPackage, index) => (
                <PackageCard
                  key={index}
                  destinationPackage={destinationPackage}
                  dark={false}
                />
              ))}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#132441" }}>
        <div style={{ paddingTop: "15vh" }}>
          <Reviews theme="dark" />
        </div>
        <div className="container m-auto text-center py-16" data-aos="fade-up">
          <div>
            <p className="text-sm text-white m-auto">
              <span style={{ color: "#daf561" }}>--</span>{" "}
              <span className="opacity-50">
                {t("personalize_trip").toUpperCase()}
              </span>
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
            <Button icon="send" href="/contact" style={{ margin: "0px auto" }}>
              {t("write_us")}
            </Button>
          </div>
        </div>
      </section>
      <div className="relative">
        <Footer />
      </div>
    </div>
  );
};

export default Packages;
