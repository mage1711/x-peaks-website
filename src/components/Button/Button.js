import "./Button.css";

const icons = {
  "arrow-right": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  ),
  send: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
    >
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  ),
};

const Button = ({ children, icon, style = {}, shape = null, href }) => {
  return (
    <a
      className="button-xpeaks-primary"
      href={href}
      style={{
        ...style,
        backgroundImage: shape ? `url(/images/button-bg-${shape}.svg)` : "",
        backgroundColor: shape ? "transparent" : "#daf561",
        borderRadius: shape ? "0" : "50px",
        padding: shape ? "24px 32px" : "14px 24px",
        backgroundRepeat: "round",
      }}
    >
      {children}
      {icons[icon] && (
        <span
          style={{
            display: "inline-block",
            marginBottom: "-4px",
            marginLeft: "12px",
          }}
        >
          {" "}
          {icons[icon]}
        </span>
      )}
    </a>
  );
};

export default Button;
