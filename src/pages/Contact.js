import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { RevealOnScroll, Footer, Button } from "../components";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18n from "i18next";
import { sendEmail } from "../postmark";

const Contact = () => {
  const [FAQs, setFAQs] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState();
  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
        const endpoint =
          "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblJb3938m6glCbA2";

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let records = response?.data?.records;
        setFAQs(records.map((r) => r.fields) ?? []);
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
      <section className="section">
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
                    <span className="opacity-50">{t("get_in_touch")}</span>
                  </p>
                  <h2 className="section-heading w-full text-white font-bold m-auto">
                    {t("contact_us_low")}
                  </h2>
                </div>
              </RevealOnScroll>
              <RevealOnScroll>
                <div>
                  <p
                    className="subheading opacity-50 text-white m-auto mt-4"
                    style={{ maxWidth: "650px", fontSize: "1.3em" }}
                  >
                    {t("contact_description")}
                  </p>
                </div>
              </RevealOnScroll>
            </div>
            <div
              className="pt-8 m-auto"
              style={{ width: "100%", maxWidth: "550px" }}
            >
              <form>
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="peer h-full w-full rounded-full border-none bg-gray-600 px-6 py-3 font-sans text-sm text-gray-300  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-400 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-500 focus:border-t-transparent focus:!border-t-gray-500 focus:outline-0 focus:ring-gray-500/10 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
                <div className="field-wrapper pt-4">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    {t("email_address")}
                  </label>
                  <input
                    type="text"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="john@example.com"
                    id="email"
                    className="peer h-full w-full rounded-full border-none bg-gray-600 px-6 py-3 font-sans text-sm text-gray-300  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-400 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-500 focus:border-t-transparent focus:!border-t-gray-500 focus:outline-0 focus:ring-gray-500/10 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
                <div className="field-wrapper pt-4">
                  <label
                    for="Message"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    {t("your_message")}
                  </label>
                  <textarea
                    required=""
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write Your Message Here"
                    maxlength="5000"
                    id="Message"
                    name="Message"
                    data-name="Message"
                    rows={5}
                    className="peer h-full w-full rounded-3xl border-none bg-gray-600 px-6 py-3 font-sans text-sm text-gray-300  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-400 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-500 focus:border-t-transparent focus:!border-t-gray-500 focus:outline-0 focus:ring-gray-500/10 disabled:border-0 disabled:bg-blue-gray-50"
                  ></textarea>
                </div>
                {emailSent ? (
                  <p className="text-sm text-bold py-2 text-green-500 mt-4">
                    {t("message_sent")}
                  </p>
                ) : (
                  <div
                    onClick={() => {
                      if (emailAddress && name && message) {
                        sendEmail({
                          From: "lorenzo@sciencemachine.ai",
                          To: "lorenzosani97@gmail.com",
                          Subject: `Website Form Submission by: ${emailAddress}`,
                          TextBody:
                            message +
                            `\n\n - This was submitted by '${name}' (${emailAddress})\n\n`,
                        });
                        setEmailSent(true);
                        setErrorMessage(false);
                      } else {
                        setErrorMessage(true);
                      }
                    }}
                  >
                    <Button icon={"send"} style={{ margin: "16px 0 0 0" }}>
                      {t("submit")}
                    </Button>
                  </div>
                )}
                {errorMessage && (
                  <p className="text-sm text-bold py-2 text-red-500 mt-4">
                    Please make sure to fill out all fields above!
                  </p>
                )}
                <br />
                <br />
                <div className="text-center">
                  <p className="text text-white m-auto font-bold pt-4">
                    {t("contact_us_alternative")}
                  </p>
                  <p className="text-sm text-white m-auto opacity-70 font-bold pt-4">
                    EMAIL{" "}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5 inline-block mx-2"
                      >
                        <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                        <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                      </svg>
                    </span>{" "}
                    INFO@X-PEAKS.COM
                  </p>
                  <p className="text-sm text-white m-auto opacity-70 font-bold pt-4">
                    WHATSAPP{" "}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5 inline-block mx-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 0 1-.522 1.756.75.75 0 0 0 .584 1.143 5.976 5.976 0 0 0 3.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-2-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>{" "}
                    +41 7657 14698
                  </p>
                </div>
              </form>
            </div>
            <div
              className="container m-auto text-center"
              data-aos="fade-up"
              style={{ paddingTop: "20vh", paddingBottom: "10vh" }}
            >
              <RevealOnScroll>
                <div>
                  <p className="text-sm text-white m-auto">
                    <span style={{ color: "#daf561" }}>--</span>{" "}
                    <span className="opacity-50">XPEAKS</span>
                  </p>
                  <h2 className="section-heading w-full text-white font-bold m-auto">
                    {t("frequently_asked_questions")}
                  </h2>
                </div>
              </RevealOnScroll>
              <RevealOnScroll>
                <div>
                  <p
                    className="subheading opacity-50 text-white m-auto mt-4"
                    style={{ maxWidth: "650px", fontSize: "1.3em" }}
                  >
                    {t("faq_description")}
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll>
                <div className="mt-16">
                  {FAQs.map((faq, i) => {
                    return (
                      <div
                        className="text-white mx-auto mb-8"
                        style={{
                          width: "100%",
                          maxWidth: "860px",
                        }}
                      >
                        <div
                          className={`flex justify-between py-4 px-8 font-bold text-sm md:text-xs cursor-pointer rounded${
                            accordionOpen === i ? "-t" : ""
                          }-lg`}
                          style={{
                            backgroundColor: "#3451a3",
                          }}
                          onClick={() =>
                            setAccordionOpen(accordionOpen === i ? null : i)
                          }
                        >
                          <p
                            style={{
                              maxWidth: "90%",
                              textAlign: "left",
                            }}
                          >
                            {faq["question_" + i18n.language.split("-")[0]]}
                          </p>
                          {accordionOpen === i ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="size-5 my-auto"
                            >
                              <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="size-5 my-auto"
                            >
                              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                            </svg>
                          )}
                        </div>
                        {accordionOpen === i && (
                          <div
                            className="p-8 text-left rounded-b-lg text-sm"
                            style={{
                              backgroundColor: "#3451a3",
                              opacity: "0.8",
                            }}
                          >
                            {faq["answer_" + i18n.language.split("-")[0]]}
                          </div>
                        )}
                      </div>
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
