import { Box } from "@mui/material";
import bannerImg from "/img/bannerMain.png"


const Banner = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${bannerImg})`,
                    height: "100vh",
                    backgroundSize: "cover",
                }}
            />
        </>
    )
}

export default Banner;