import React from "react";
import usePageTitle from "../../hooks/usePageTitles";

const NotFound = () => {
  usePageTitle("404 not found | FilmRank");
  return <h1>NotFound</h1>;
};

export default NotFound;