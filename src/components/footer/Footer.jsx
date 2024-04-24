import React from "react";
import * as S from "./Footer.styles";

/**
 * Footer component that displays copyright information with the current year.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
function Footer() {
  return <S.Container>© {new Date().getFullYear()} Holidaze. All rights reserved.</S.Container>;
}

export default Footer;
