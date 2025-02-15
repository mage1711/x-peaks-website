import React, { useState, useCallback, useEffect } from "react";
import "./NavBar.css";
import { useTranslation } from "react-i18next";

const NavBar = ({
  language = "en",
  currency = "GBP",
  setLanguage = () => {},
  setCurrency = () => {},
}) => {
  const [isScrolled, setIsScroll] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(window.innerWidth > 768);
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);
  const [isCurrencyMenuVisible, setIsCurrencyMenuVisible] = useState(false);
  const [lang, setLang] = useState(
    language === "it"
      ? "it"
      : language === "de"
      ? "de"
      : language === "fr"
      ? "fr"
      : language === "es"
      ? "es"
      : "en"
  );
  const [curr, setCurr] = useState(currency);

  const { t } = useTranslation();

  const handleScroll = useCallback(() => {
    document.body.scrollTop > window.innerHeight - 128
      ? setIsScroll(true)
      : setIsScroll(false);
  }, []);

  useEffect(() => setCurr(currency), [currency]);

  const handleLanguageChange = (value) => {
    setLang(value);
    setLanguage(value);
    setIsLanguageMenuVisible(false);
  };

  const handleCurrencyChange = (value) => {
    setCurr(value);
    setCurrency(value);
    setIsCurrencyMenuVisible(false);
  };

  const toggleMenu = () => {
    if (window.innerWidth < 768) {
      setIsMenuVisible(!isMenuVisible);
    }
  };

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

  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        width: "100%",
        background: isScrolled
          ? "linear-gradient(0deg, rgba(19,36,65,0) 5%, rgba(19,36,65,0.5) 95%)"
          : "transparent",
        paddingBottom: "8px",
      }}
    >
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={`/images/logo-${
              window.location.href.includes("about") && !isScrolled
                ? "blue"
                : "white"
            }.svg`}
            className="w-32"
            alt="xpeaks-logo"
          />
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse border-r border-white">
            <button
              type="button"
              className="inline-flex items-center font-medium justify-center px-4 py-0 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer"
              onClick={() => {
                setIsLanguageMenuVisible(!isLanguageMenuVisible);
                setIsCurrencyMenuVisible(false);
              }}
            >
              <img
                className="h-5 w-5 rounded-full outline-none focus:outline-none"
                src={`/flag-${lang}.svg`}
                alt={lang + "-flag"}
              />
            </button>
            <div
              className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 absolute right-8 top-16"
              style={{
                display: isLanguageMenuVisible ? "block" : "none",
                right:
                  window.innerWidth > 1280
                    ? window.innerWidth - 1280 > 0
                      ? (window.innerWidth - 1280) / 2 + "px"
                      : window.innerWidth - 1024 > 0
                      ? (window.innerWidth - 1024) / 2 + "px"
                      : "16px"
                    : "16px",
              }}
            >
              <ul className="py-2 font-medium" role="none">
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleLanguageChange("en")}
                  >
                    <div className="items-center flex">
                      <img
                        className="h-5 w-5 rounded-full outline-none focus:outline-none mr-2"
                        src="/flag-en.svg"
                        alt={lang + "-flag"}
                      />
                      <p className="text-sm mt-2">English</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleLanguageChange("de")}
                  >
                    <div className="items-center flex">
                      <img
                        className="h-5 w-5 rounded-full outline-none focus:outline-none mr-2"
                        src="/flag-de.svg"
                        alt={lang + "-flag"}
                      />
                      <p className="text-sm mt-2">Deutsch</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleLanguageChange("it")}
                  >
                    <div className="items-center flex">
                      <img
                        className="h-5 w-5 rounded-full outline-none focus:outline-none mr-2"
                        src="/flag-it.svg"
                        alt={lang + "-flag"}
                      />
                      <p className="text-sm mt-2">Italiano</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleLanguageChange("fr")}
                  >
                    <div className="items-center flex">
                      <img
                        className="h-5 w-5 rounded-full outline-none focus:outline-none mr-2"
                        src="/flag-fr.svg"
                        alt={lang + "-flag"}
                      />
                      <p className="text-sm mt-2">Français</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleLanguageChange("es")}
                  >
                    <div className="items-center flex">
                      <img
                        className="h-5 w-5 rounded-full outline-none focus:outline-none mr-2"
                        src="/flag-es.svg"
                        alt={lang + "-flag"}
                      />
                      <p className="text-sm mt-2">Español</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer"
              onClick={() => {
                setIsCurrencyMenuVisible(!isCurrencyMenuVisible);
                setIsLanguageMenuVisible(false);
              }}
            >
              <div className="text-white pt-2">{curr}</div>
            </button>
            <div
              className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 absolute top-16"
              style={{
                display: isCurrencyMenuVisible ? "block" : "none",
                right:
                  window.innerWidth > 1280
                    ? window.innerWidth - 1280 > 0
                      ? (window.innerWidth - 1280) / 2 + "px"
                      : window.innerWidth - 1024 > 0
                      ? (window.innerWidth - 1024) / 2 + "px"
                      : "16px"
                    : "16px",
              }}
            >
              <ul className="py-2 font-medium" role="none">
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleCurrencyChange("USD")}
                  >
                    <div className="items-center flex">
                      <p className="text-sm mt-2">USD ($)</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleCurrencyChange("GBP")}
                  >
                    <div className="items-center flex">
                      <p className="text-sm mt-2">GBP (£)</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleCurrencyChange("EUR")}
                  >
                    <div className="items-center flex">
                      <p className="text-sm mt-2">EUR (€)</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    onClick={() => handleCurrencyChange("CHF")}
                  >
                    <div className="items-center flex">
                      <p className="text-sm mt-2">CHF (Fr.)</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-language"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden focus:outline-none"
              aria-controls="navbar-language"
              aria-expanded="false"
              onClick={() => toggleMenu()}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1 mobile-nav-bar"
          id="navbar-language"
          style={
            isMenuVisible
              ? {
                  display: "block",
                  visibility: "visible",
                }
              : { display: "none", visibility: "hidden" }
          }
        >
          <ul
            className="flex flex-col font-medium pt-4 pb-2 px-6 mt-4 rounded-full md:space-x-8 rtl:space-x-reverse md:flex-row"
            style={{
              backgroundColor:
                isScrolled && window.innerWidth > 768 ? "white" : "transparent",
              color:
                (isScrolled && window.innerWidth > 768) ||
                (window.location.href.includes("about") &&
                  window.innerWidth > 768)
                  ? "#132441"
                  : "#E5E4E2",
            }}
          >
            <li>
              <a
                onClick={() => toggleMenu()}
                href="/"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-300"
                aria-current="page"
              >
                {t("home")}
              </a>
            </li>
            <li>
              <a
                onClick={() => toggleMenu()}
                href="/packages"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-300"
              >
                {t("packages")}
              </a>
            </li>
            <li>
              <a
                onClick={() => toggleMenu()}
                href="/about"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-300"
              >
                {t("about")}
              </a>
            </li>
            <li>
              <a
                onClick={() => toggleMenu()}
                href="/blog"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-300"
              >
                {t("blog")}
              </a>
            </li>
            <li>
              <a
                onClick={() => toggleMenu()}
                href="/contact"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-lime-300"
              >
                {t("contact")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
