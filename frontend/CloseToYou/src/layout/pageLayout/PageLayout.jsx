import React from "react";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

const PageLayout = ({ page }) => {
  return (
    <React.Fragment>
      <Header />
      {page}
      <Footer />
    </React.Fragment>
  );
};

export default PageLayout;
