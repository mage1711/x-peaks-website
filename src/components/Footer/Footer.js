import React from "react";
import "./Footer.css";

const Footer = ({ stickToBottom = false, backgroundColor = "#132441" }) => {
  return (
    <footer
      className="flex flex-col items-center text-center text-surface text-white"
      style={{
        backgroundColor: stickToBottom ? backgroundColor : "transparent",
        position: stickToBottom ? "static" : "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
      }}
    >
      <div className="container pt-2">
        <div className="flex justify-end space-x-2">
          <a
            href="https://www.facebook.com/profile.php?id=61562208245202"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out focus:outline-none focus:ring-0 dark:text-white hover:text-orange-400"
            data-twe-ripple-init
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: "1px" }}
          >
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
          </a>

          <a
            href="https://www.instagram.com/x_peaks?igsh=NzRpNHRjNHZsa2Ry&utm_source=qr"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out focus:outline-none focus:ring-0 dark:text-white hover:text-orange-400"
            data-twe-ripple-init
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5 hover:text-orange-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
          </a>
          <a
            href="https://www.linkedin.com/company/xpeaks/"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out focus:outline-none focus:ring-0 dark:text-white hover:text-orange-400"
            data-twe-ripple-init
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
              <svg
                enableBackground="new 0 0 56.693 56.693"
                height="56.693px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 56.693 56.693"
                width="56.693px"
                fill="currentColor"
              >
                <g>
                  <path d="M30.071,27.101v-0.077c-0.016,0.026-0.033,0.052-0.05,0.077H30.071z" />
                  <path d="M49.265,4.667H7.145c-2.016,0-3.651,1.596-3.651,3.563v42.613c0,1.966,1.635,3.562,3.651,3.562h42.12   c2.019,0,3.654-1.597,3.654-3.562V8.23C52.919,6.262,51.283,4.667,49.265,4.667z M18.475,46.304h-7.465V23.845h7.465V46.304z    M14.743,20.777h-0.05c-2.504,0-4.124-1.725-4.124-3.88c0-2.203,1.67-3.88,4.223-3.88c2.554,0,4.125,1.677,4.175,3.88   C18.967,19.052,17.345,20.777,14.743,20.777z M45.394,46.304h-7.465V34.286c0-3.018-1.08-5.078-3.781-5.078   c-2.062,0-3.29,1.389-3.831,2.731c-0.197,0.479-0.245,1.149-0.245,1.821v12.543h-7.465c0,0,0.098-20.354,0-22.459h7.465v3.179   c0.992-1.53,2.766-3.709,6.729-3.709c4.911,0,8.594,3.211,8.594,10.11V46.304z" />
                </g>
              </svg>
            </span>
          </a>
          <a
            href="https://www.youtube.com/@XPeaks"
            type="button"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out focus:outline-none focus:ring-0 dark:text-white hover:text-orange-400"
            data-twe-ripple-init
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 360.726"
              >
                <path
                  fill="#fff"
                  d="M456.035 10.769c22.031 5.926 39.377 23.386 45.265 45.56C512 96.516 512 180.363 512 180.363s0 83.846-10.7 124.037c-5.888 22.17-23.234 39.631-45.265 45.559-39.928 10.767-200.034 10.767-200.034 10.767s-160.107 0-200.035-10.767C33.937 344.031 16.587 326.57 10.7 304.4 0 264.209 0 180.363 0 180.363S0 96.516 10.7 56.329c5.887-22.174 23.237-39.634 45.266-45.56C95.894 0 256.001 0 256.001 0s160.106 0 200.034 10.769zm-252.398 245.72l133.818-76.122-133.818-76.131v152.253z"
                />
              </svg>
            </span>
          </a>
          <div className="w-full p-4 pr-6 text-end text-sm opacity-50 copyright">
            2024 COPYRIGHT: XPEAKS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
