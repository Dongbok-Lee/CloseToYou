import React from "react";
import Header from "../header/Header.jsx";

const PageLayout = ({ page }) => {
  return (
    <React.Fragment>
      <Header />
      {page}
      <footer></footer>
    </React.Fragment>
  );
};

export default PageLayout;
