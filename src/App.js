import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Homepage,
  Packages,
  About,
  Contact,
  PackageInfo,
  Blog,
  PageNotFound,
  PaymentSuccess,
} from "./pages";
import { NavBar } from "./components";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import deTranslation from "./locales/de.json";
import itTranslation from "./locales/it.json";
import frTranslation from "./locales/fr.json";
import esTranslation from "./locales/es.json";
import { useEffect, useState } from "react";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function setCookie(key, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    key + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

// Function to get a cookie
function getCookie(key) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === key ? decodeURIComponent(parts[1]) : r;
  }, "");
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      de: {
        translation: deTranslation,
      },
      it: {
        translation: itTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

const pages = [
  {
    path: "/",
    element: <Homepage />,
    name: "Home",
  },
  {
    path: "/packages",
    element: <Packages />,
    name: "Packages",
  },
  {
    path: "/about",
    element: <About />,
    name: "About",
  },
  {
    path: "/blog",
    element: <Blog />,
    name: "Blog",
  },
  {
    path: "/contact",
    element: <Contact />,
    name: "Contact",
  },
  {
    path: "/success",
    element: <PaymentSuccess />,
    name: "PaymentSuccess",
  },
  {
    path: "/packages/:id",
    element: <PackageInfo />,
    name: "Package",
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    name: "PrivacyPolicy",
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
    name: "TermsOfService",
  },
  {
    path: "*",
    element: <PageNotFound />,
    name: "404",
  },
];

const router = createBrowserRouter(pages);

function App() {
  const getDefaultCurrency = () => {
    if (getCookie("currency")) {
      return getCookie("currency");
    }
    if (i18n.language.includes("en")) {
      return "GBP";
    } else if (i18n.language.includes("de")) {
      return "EUR";
    } else if (i18n.language.includes("it")) {
      return "EUR";
    } else if (i18n.language.includes("fr")) {
      return "EUR";
    } else if (i18n.language.includes("es")) {
      return "EUR";
    } else {
      return "USD";
    }
  };
  const [currency, setCurrency] = useState();

  const handleCurrencyChange = (curr) => {
    setCookie("currency", curr);
    setCurrency(curr);
    i18n.changeLanguage(i18n.language.split("-")[0]);
  };

  useEffect(() => {
    handleCurrencyChange(getDefaultCurrency());
  }, []);

  return (
    <div className="App">
      <div style={{ position: "relative" }}>
        <NavBar
          language={i18n.language.split("-")[0]}
          setLanguage={(lng) => i18n.changeLanguage(lng)}
          currency={currency}
          setCurrency={(curr) => handleCurrencyChange(curr)}
        />
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
