import React from "react";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import HeaderPhoneLink from "./HeaderPhoneLink";
import HeaderTabletDesktopLink from "./HeaderTabletDesktopLink";
import buttonStyles from "@/utils/buttonStyles";
import { Link } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detecta pantallas pequeñas

  return (
    <header>
      <AppBar
        position={isMobile ? "fixed" : "static"}
        sx={{
          backgroundColor: "#000000E5",
          width: "100%",
          bottom: isMobile ? 0 : "auto",
          top: isMobile ? "auto" : 0,
        }}>

        <Toolbar
          sx={{
            display: "flex",
            height: "125px",
            borderBottom: "4px solid var(--Blue, #2271D1)",
            boxShadow: "0px 5px 29px 0px rgba(34, 113, 209, 0.7)",
          }}>

          {isMobile ? (
            <HeaderPhoneLink buttonStyles={buttonStyles} />
          ) : (
            <HeaderTabletDesktopLink buttonStyles={buttonStyles} />
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;



