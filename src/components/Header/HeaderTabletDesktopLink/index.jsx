import { Stack, Button } from "@mui/material";
import aluraImg from "/img/aluraFlix.png";
import { Link } from "react-router-dom";
import ButtonElement from "@/components/ButtonElement/ButtonElement";


const HeaderTabletDesktopLink = ({ buttonStyles }) => {

  return (

    <>
      {/* // Menú para pantallas grandes */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{ justifyContent: "space-between", width: "100%" }}
      >
        <Link to="/">
          <Button variant="outlined">
            <img src={aluraImg} alt="logo" />
          </Button>
        </Link>

        <Stack direction="row" spacing={2}>
          <Link to="/">
            <ButtonElement variant="outlined" sx={buttonStyles("#FFFFFF", "#FFFFFF")} >
              HOME
            </ButtonElement>
          </Link>

          <Link to="/add">
            <ButtonElement variant="outlined" sx={buttonStyles("#2271D1", "#2271D1", "#2271D1")} >
              NUEVO VIDEO
            </ButtonElement>
          </Link>

        </Stack>
      </Stack>

    </>
  )

}

export default HeaderTabletDesktopLink;