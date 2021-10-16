import React, { useState } from "react";
import { SearchButton } from "../components";

// styles
const pageStyles = {
  height: "100%",
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  textAlign: "center",
};
const headingStyles = {
  marginTop: 0,
};
const headingAccentStyles = {
  color: "#663399",
};

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  lineHeight: 1.25,
};

const searchBoxStyles = {
  position: "relative",
  marginTop: "6rem",
  marginBottom: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const inputStyles = {
  width: "23vw",
  padding: "20px 38px",
  outline: "none",
  border: "2px solid #5e738d4d",
  borderRadius: "10rem",
  fontSize: "1.3rem",
  fontFamily: "Mulish, sans-serif",
  color: "#232129",
  backgroundColor: "rgba(243, 248, 254, 0.4)",
};


const IndexPage = () => {
  const [url, setUrl] = useState("");
  const [siteInfo, setSiteInfo] = useState(null);
  const [email, setEmail] = useState("");

  const onSearch = cb => {
    // TODO: add url / ip address validations here
    console.log("--search handler---", url);
    setTimeout(() => {
      setSiteInfo({
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      });
      cb();
    }, 1000);
  };

  const handleEmailNotify = () => {
    // TODO: handle email validations
    console.log("--email notify handler---", email);
  }

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Is Site Up?
        <br />
      </h1>
      <h2>
        <span style={headingAccentStyles}>
          — get notified when your favourite site is up?{" "}
        </span>
        <span role="img" aria-label="Party popper emojis">
          ☝️
        </span>
      </h2>
      {siteInfo ? (
        <React.Fragment>
          <p>{siteInfo.description}</p>
          <p>{siteInfo.description}</p>
          <p>{siteInfo.description}</p>
          <p>{siteInfo.description}</p>
          <h4 style={ {marginTop: "4rem"}}>Notify me when site is up</h4>
          <input
              style={inputStyles}
              placeholder="youremail@address.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          <SearchButton onSearch={handleEmailNotify} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div style={searchBoxStyles}>
            <input
              style={inputStyles}
              placeholder="www.google.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <SearchButton onSearch={onSearch} />
          </div>
          <p style={descriptionStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </React.Fragment>
      )}
    </main>
  );
};

export default IndexPage;
