import { Box, Typography } from "@mui/material";

const Footer  = () => {

    return (

        <Box
                textAlign={"center"}
                
                sx={{
                    borderTop: "4px solid #2271D1",
                    boxShadow: "0px 5px 29px 10px #2271D1B2",
                    height: "125px",
                    alignContent: "center",
                    backgroundColor: "#000000",
                }}
            >   
                <img src="/img/aluraFlix.png"></img>
                <Typography
                    color="#2271D1"
                >
                    Develop by Alejandro</Typography>
            </Box>
    )
}

export default Footer;