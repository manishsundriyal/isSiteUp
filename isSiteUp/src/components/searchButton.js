import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const searchButtonStyles = {
  width: "5rem",
  height: "5rem",
  outline: "none",
  border: "none",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  marginLeft: "0.5rem",
};

const SearchButton = (props) => {
  const { onSearch = () => {} } = props;
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    const cb = () => {
      setLoading(false);
    };
    onSearch(cb);
  };

  return (
    <button style={searchButtonStyles} onClick={handleSearch}>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} size="2x" className="fa-spin" />
      ) : (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66669 16H25.3334"
            stroke="#3D476D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 21.3333L25.3333 16"
            stroke="#3D476D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 10.6667L25.3333 16"
            stroke="#3D476D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default SearchButton;
