import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function BrochureBanner({ imageUrl, brochureUrl, packageName }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [error, setError] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const handleDownloadBrochure = async () => {
    if (!emailValid) {
      setError(t("invalid_email"));
      return;
    }
    setError(null);

    try {
      const data = {
        email: email,
        packageName: packageName,
        language: i18n.language,
      };

      const response = await axios.post("/api/addBrochureRecord", data);

      console.log("Record added:", response.data);

      // Handle download for Safari on iOS
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        window.location.href = brochureUrl;
      } else {
        // For other browsers, use link click approach
        const link = document.createElement("a");
        link.href = brochureUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setEmail("");
      setEmailValid(false);
      setShowEmailInput(false);

      return response.data;
    } catch (error) {
      console.error("Error adding record:", error);
      setError(t("issue_downloading_brochure"));
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="h-48 md:h-50 md:w-1/2">
        <img
          src={imageUrl}
          alt="Brochure"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="flex-grow transition bg-clip-border w-full overflow-hidden py-6 px-12 flex flex-col gap-0 justify-center items-center"
        style={{ backgroundColor: "#F0F1FF" }}
      >
        <h2 className="text-xl font-bold text-gray-800 my-2 mx-auto text-center">
          {showEmailInput
            ? t("enter_email_title")
            : t("download_brochure_for_package", { packageName })}
        </h2>
        <p className="text-sm opacity-50 mb-4 mx-auto text-center">
          {showEmailInput
            ? t("enter_email_subtitle")
            : t("get_detailed_information_about_your_dream_destination")}
        </p>

        <>
          {!showEmailInput ? (
            <button
              onClick={() => setShowEmailInput(true)}
              className="w-full text-white font-semibold py-2 px-4 rounded-full transition duration-300 hover:shadow-lg"
              style={{ backgroundColor: "#132441", maxWidth: "768" }}
            >
              {t("download_brochure")}
            </button>
          ) : (
            <div className="flex flex-col md:flex-row w-full md:px-12 gap-4">
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder={t("your_email")}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                required
                autoComplete="email"
                spellCheck="false"
                autoCapitalize="off"
                style={{ caretColor: "#132441", caretShape: "block" }}
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                onClick={handleDownloadBrochure}
                disabled={!emailValid}
                className={`w-fit whitespace-nowrap rounded-full font-semibold py-2 px-8 mx-auto rounded transition duration-300 ${
                  emailValid ? "text-white" : "text-gray-700 cursor-not-allowed"
                }`}
                style={{ backgroundColor: "#132441" }}
              >
                {t("download_brochure")}
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
