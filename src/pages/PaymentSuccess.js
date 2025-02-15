import { Button } from "../components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { t } = useTranslation();
  // this should be in a vercel cloud function
  useEffect(() => {
    const updateCouponUsage = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const couponId = urlParams.get("coupon");

      if (!couponId) return;

      try {
        const response = await fetch("/api/coupon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ couponId }),
        });

        if (!response.ok) {
          throw new Error("Failed to update coupon usage");
        }
      } catch (error) {
        console.error("Error updating coupon usage:", error);
      }
    };

    updateCouponUsage();
  }, []);

  return (
    <>
      <main
        className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
        style={{
          height: "100vh",
          backgroundImage:
            "url(https://images.pexels.com/photos/1109967/pexels-photo-1109967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      >
        <div className="text-center">
          <p
            className="text-9xl font-semibold mb-8"
            style={{ color: "#daf561" }}
          >
            &#10003;
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t("payment_success")}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {t("thank_you_for_your_purchase")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button href="/">{t("go_back_home")}</Button>
            <a href="/orders" className="text-sm font-semibold text-gray-900">
              {t("contact_us_low")} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
