import React from "react";

const PageLayout = ({ page }) => {
  return (
    <React.Fragment>
      <header></header>
      {page}
      <footer></footer>
    </React.Fragment>
  );
};

export default PageLayout;
