import React, { useState, useEffect, useCallback } from "react";
import "./Homepage.css";
import { RevealOnScroll, Footer, Button } from "../components";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import axios from "axios";

const About = () => {
  const [offset, setOffset] = useState(
    -window.innerHeight / 5 +
      window.innerHeight / 2 -
      document.body.scrollTop / 2
  );
  const [content, setContent] = useState([
    {
      id: "section_1",
    },
    { id: "section_2" },
    { id: "section_3" },
    { id: "section_4" },
  ]);

  const handleScroll = useCallback(() => {
    setOffset(
      -window.innerHeight / 5 +
        window.innerHeight / 2 -
        document.body.scrollTop / 2
    );
  }, []);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
        const endpoint =
          "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblxlliJfGfZMbJg3";

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let records = response?.data?.records;
        setContent(records.map((r) => r.fields) ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("wheel", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  const getSection = (n) => {
    return content.find((obj) => obj.id === `section_${n}`);
  };

  return (
    <div>
      <div>
        <div className="preloader-image"></div>
        <div className="preloader-image-bg"></div>
        <div className="preloader-left"></div>
        <div className="preloader-right"></div>
      </div>
      <div className="hero-small about-hero">
        <div
          className="content content-packages"
          style={{ top: offset + "px" }}
        >
          <h1 className="hero-title hero-title-small">{t("about_us")}</h1>
        </div>
      </div>
      <div
        className="section"
        style={{ paddingTop: "180px", paddingBottom: "180px" }}
      >
        <div className="container m-auto text-center">
          <div>
            <RevealOnScroll>
              <div
                className="flex flex-col md:flex-row gap-8 pb-24"
                style={{
                  maxWidth: "90%",
                  margin: "auto",
                }}
              >
                <div style={{ margin: "auto" }}>
                  <h2
                    className="section-heading w-full text-white font-bold m-auto text-left"
                    style={{ fontSize: "28px" }}
                  >
                    {getSection(1)?.["title_" + i18n.language.split("-")[0]]}
                  </h2>
                  <p
                    className="subheading opacity-70 text-white m-auto py-4"
                    style={{
                      fontSize: "1.1em",
                      textAlign: "left",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {getSection(1)?.["content_" + i18n.language.split("-")[0]]}
                  </p>
                </div>
                <div
                  style={{
                    minWidth: window.innerWidth > 768 ? "500px" : "100%",
                    height: "300px",
                    borderRadius: "20px",
                    backgroundImage: "url(/images/About-Us-Who-Low-Res.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    margin: "auto",
                  }}
                ></div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div
                className="flex flex-col md:flex-row-reverse gap-8 pb-24"
                style={{
                  maxWidth: "90%",
                  margin: "auto",
                }}
              >
                <div style={{ margin: "auto" }}>
                  <h2
                    className="section-heading w-full text-white font-bold m-auto text-left"
                    style={{ fontSize: "28px" }}
                  >
                    {getSection(2)?.["title_" + i18n.language.split("-")[0]]}
                  </h2>
                  <p
                    className="subheading opacity-70 text-white m-auto py-4"
                    style={{
                      fontSize: "1.1em",
                      textAlign: "left",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {getSection(2)?.["content_" + i18n.language.split("-")[0]]}
                  </p>
                </div>
                <div
                  style={{
                    minWidth: window.innerWidth > 768 ? "500px" : "100%",
                    height: "300px",
                    borderRadius: "20px",
                    backgroundImage: "url(/images/About-Us-How-Low-Res.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    margin: "auto",
                  }}
                ></div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div
                className="flex flex-col md:flex-row gap-8 pb-24"
                style={{
                  maxWidth: "90%",
                  margin: "auto",
                }}
              >
                <div style={{ margin: "auto" }}>
                  <h2
                    className="section-heading w-full text-white font-bold m-auto text-left"
                    style={{ fontSize: "28px" }}
                  >
                    {getSection(3)?.["title_" + i18n.language.split("-")[0]]}
                  </h2>
                  <p
                    className="subheading opacity-70 text-white m-auto py-4"
                    style={{
                      fontSize: "1.1em",
                      textAlign: "left",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {getSection(3)?.["content_" + i18n.language.split("-")[0]]}
                  </p>
                </div>

                <div
                  style={{
                    minWidth: window.innerWidth > 768 ? "500px" : "100%",
                    height: "300px",
                    borderRadius: "20px",
                    backgroundImage: "url(/images/About-Us-Why-Low-Res.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    margin: "auto",
                  }}
                ></div>
              </div>
            </RevealOnScroll>
          </div>
          <RevealOnScroll>
            <div>
              <br />
              <p className="text-sm text-white m-auto mt-8">
                <span style={{ color: "#daf561" }}>--</span>{" "}
                <span className="opacity-50">
                  {getSection(4)?.["title_" + i18n.language.split("-")[0]]}
                </span>
              </p>
              <h2
                className="section-heading w-full text-white font-bold m-auto"
                style={{ fontSize: "28px" }}
              >
                {getSection(4)?.["content_" + i18n.language.split("-")[0]]}
              </h2>
              <div
                style={{
                  width: "fit-content",
                  margin: "auto",
                  paddingTop: "36px",
                }}
              >
                <Button icon="arrow-right" href="/packages">
                  {t("start_your_collection")}
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
      <Footer stickToBottom />
    </div>
  );
};

export default About;
