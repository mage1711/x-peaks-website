import { Button } from "../components";
import { useTranslation } from "react-i18next";

export default function PageNotFound() {
  const { t } = useTranslation();

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
            className="text-3xl font-semibold mb-8"
            style={{ color: "#daf561" }}
          >
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t("page_not_found")}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {t("sorry_not_found")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button href="/">{t("go_back_home")}</Button>
            <a href="/contact" className="text-sm font-semibold text-gray-900">
              {t("contact_us_low")} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
