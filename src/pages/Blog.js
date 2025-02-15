import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { RevealOnScroll, Footer, PackageCard, Modal } from "../components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18n from "i18next";

const Contact = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
        const endpoint =
          "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tbly1KBFOn3Jed65A";

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let records = response?.data?.records;
        setBlogs(records.map((r) => r.fields) ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(null)}
        textContent={isModalOpen?.textContent}
        images={isModalOpen?.images}
      />
      <section className="section" style={{ minHeight: "100vh" }}>
        <img src="images/lines-left.svg" className="contour-line-left" alt="" />
        <img
          src="images/lines-right.svg"
          className="contour-line-right"
          alt=""
        />
        <RevealOnScroll>
          <div className="container p-0 pt-16 md:p-16 m-auto">
            <div
              className="container m-auto text-center"
              data-aos="fade-up"
              style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
            >
              <RevealOnScroll>
                <div>
                  <p className="text-sm text-white m-auto">
                    <span style={{ color: "#daf561" }}>--</span>{" "}
                    <span className="opacity-50">
                      {t("stay_updated").toUpperCase()}
                    </span>
                  </p>
                  <h2 className="section-heading w-full text-white font-bold m-auto">
                    {t("our_blog")}
                  </h2>
                </div>
              </RevealOnScroll>
              <RevealOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
                  {blogs
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((blog, i) => {
                      return (
                        <PackageCard
                          key={"blog_" + i}
                          destinationPackage={{
                            name: blog[
                              "blogTitle_" + i18n.language.split("-")[0]
                            ],
                            price: 0,
                            continent: "",
                            nation: "",
                            imageURL: blog.coverImage,
                            subtitle_en:
                              blog["blogContent_en"]?.substring(0, 50) + "...",
                            subtitle_de:
                              blog["blogContent_de"]?.substring(0, 50) + "...",
                            subtitle_it:
                              blog["blogContent_it"]?.substring(0, 50) + "...",
                            type: "Custom",
                          }}
                          dark={true}
                          onClick={(e) => {
                            setIsModalOpen({
                              textContent:
                                blog[
                                  "blogContent_" + i18n.language.split("-")[0]
                                ],
                              images: [
                                blog.coverImage,
                                ...(blog.otherImages ?? []),
                              ],
                            });
                          }}
                        />
                      );
                    })}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </RevealOnScroll>
      </section>
      <Footer stickToBottom />
    </div>
  );
};

export default Contact;
