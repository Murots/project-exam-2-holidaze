import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import * as S from "./Footer.styles";

/**
 * Represents the footer component of the application, which includes social media links, contact information, and copyright text.
 * within the application to provide consistent user access to these resources.
 *
 * @module Footer
 * @returns {React.Component} The Footer component that displays social media links, contact information, and copyright text.
 * @example
 * return (
 *   <Footer />
 * )
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <S.Container>
      <S.Section>
        <S.Title>Connect with us</S.Title>
        <S.Icons>
          <S.IconLink href="https://facebook.com" target="_blank" aria-label="Facebook">
            <FaFacebookF />
          </S.IconLink>
          <S.IconLink href="https://instagram.com" target="_blank" aria-label="Instagram">
            <FaInstagram />
          </S.IconLink>
          <S.IconLink href="https://youtube.com" target="_blank" aria-label="YouTube">
            <FaYoutube />
          </S.IconLink>
        </S.Icons>
        <S.ContactInfo>
          Email: holidaze@email.com
          <br />
          Phone: +47 xxx xx xxx
        </S.ContactInfo>
      </S.Section>
      <S.CopyRight>© {currentYear} Holidaze. All rights reserved.</S.CopyRight>
    </S.Container>
  );
}

export default Footer;
