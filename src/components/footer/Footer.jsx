import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import * as S from "./Footer.styles";

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
      </S.Section>
      <S.Section>
        <S.Title>Contact</S.Title>
        <S.ContactInfo>
          Email: holidaze@email.com
          <br />
          Phone: +47 xxx xx xxx
        </S.ContactInfo>
      </S.Section>
      <S.Section>
        <S.Title>Quick Links</S.Title>
        <S.Link href="#">About Us</S.Link>
        <S.Link href="#">Become a Manager</S.Link>
      </S.Section>
      <S.CopyRight>© {currentYear} Holidaze. All rights reserved.</S.CopyRight>
    </S.Container>
  );
}

export default Footer;
