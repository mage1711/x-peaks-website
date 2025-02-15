import { useState, useEffect } from "react";
import i18n from "i18next";

const Reviews = ({ theme }) => {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Function to fetch reviews from Airtable
  const fetchReviews = async () => {
    try {
      const token =
        "patylXQNLKEU0QrA8.cd2ee99e8d992f0f2b171add2aecdfdd0fa801ffe98a0339ecf35752b833be0b";
      const endpoint =
        "https://api.airtable.com/v0/appvkXC9afBnDgI3g/tblEIQuOGFJWGdeyu";

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setReviews(data?.records || []);
    } catch (error) {
      console.error("Error fetching data from Airtable:", error);
    }
  };

  // Fetch reviews when component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  // Setup the review slideshow
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Get the current language
  const currentLanguage = i18n.language;

  const textColorClass = theme === "dark" ? "text-white" : "text-gray-600";

  return (
    <section
      className="w-90 md:w-full"
      style={{
        minHeight: "60vh",
        paddingTop: "80px",
        height: "fit-content",
        margin: "0 auto",
      }}
    >
      <div
        className="container mx-auto px-4"
        style={{
          backgroundColor: "rgba(52, 81, 163, 0.66)",
          borderRadius: "25px",
          padding: "48px",
          width: "100%",
          zIndex: 100,
          position: "relative",
        }}
      >
        <p className="text-sm text-white m-auto w-full text-center">
          <span style={{ color: "#daf561" }}>--</span>{" "}
          <span className="opacity-50 uppercase text-center">
            Reviews From Our Customers
          </span>
        </p>
        <br />
        <br />
        <h1
          style={{
            color: "#daf561",
            position: "absolute",
            fontFamily: "Castoro",
            left: "-30px",
            top: "-60px",
            fontSize: "150px",
          }}
        >
          "
        </h1>
        <h1
          style={{
            color: "#daf561",
            position: "absolute",
            fontFamily: "Castoro",
            right: "-20px",
            bottom: "-150px",
            fontSize: "150px",
          }}
        >
          "
        </h1>
        <div className="max-w-2xl mx-auto">
          {reviews.length === 0 ? (
            <div
              className={`h-32 flex items-center justify-center ${textColorClass}`}
            >
              Loading reviews...
            </div>
          ) : (
            <div className="relative lg:h-36 md:h-36 h-60">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                    index === currentReviewIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <blockquote
                    className={`text-xl italic text-center mb-4 ${textColorClass}`}
                    style={{ fontFamily: "Castoro" }}
                  >
                    "{review.fields[`quote_${currentLanguage}`]}"
                  </blockquote>
                  <p className={`text-center font-semibold ${textColorClass}`}>
                    - {review.fields.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
