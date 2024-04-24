import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import * as S from "./Layout.styles";

/**
 * Layout component that wraps the main content of the application with a Header and Footer.
 * It acts as a structural template for pages, ensuring that these pages consistently include the Header at the top and the Footer at the bottom.
 * The `children` prop allows any nested components or elements to be rendered within the main section of the layout.
 *
 * @component
 * @param {React.ReactNode} children - The content to be displayed between the Header and Footer.
 * @example
 * return (
 *   <Layout>
 *     <HomePage />
 *   </Layout>
 * )
 */
function Layout({ children }) {
  return (
    <>
      <Header />
      <S.Main>{children}</S.Main>
      <Footer />
    </>
  );
}

export default Layout;
