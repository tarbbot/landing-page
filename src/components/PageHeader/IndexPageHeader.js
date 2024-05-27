/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================







=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

export default function PageHeader() {
  return (
    <div className="index-page-header header-filter ">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">Trading • Bot</h1>
          <h3 className="d-none d-sm-block">
          Cutting-Edge Automated Systems Designed for Cryptocurrency Market Investments
          </h3>
        </div>
      </Container>
    </div>
  );
}
