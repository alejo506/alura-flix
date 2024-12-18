import ButtonElement from "@/components/ButtonElement/ButtonElement";
import TitleElement from "@/components/TitleElement";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const NotFound = () => {

        const navigate = useNavigate(); // Usamos useHistory para redirigir

        const handleGoHome = () => {
          navigate("/");  // Redirige al home (ajusta la ruta según tu estructura)
        };
      
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              color: "#257be5",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <TitleElement
              variant="h1"
              text="404"
              sx={{
                fontSize: "150px",
                fontWeight: "bold",
                letterSpacing: "8px",
                textTransform: "uppercase",
              }}
            />
             
            <TitleElement
              variant="h4"
              text="Oops! Page Not Found"
              sx={{
                fontSize: "24px",
                marginBottom: "30px",
                fontWeight: 500,
                letterSpacing: "2px",
              }}
            />
            <TitleElement
              variant="body1"
              text="The page you are looking for doesn't exist or has been moved. Please
              check the URL or go back to the homepage."
              sx={{
                fontSize: "16px",
                marginBottom: "40px",
                fontWeight: 400,
                letterSpacing: "1px",
                maxWidth: "400px",
              }}
            />
              
           
            <ButtonElement
              variant="outlined"
              color="primary"
              onClick={handleGoHome}
              sx={{
                padding: "12px 20px",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "2px",
                "&:hover": {
                  // backgroundColor: "#1a5a9f",
                  color :"#ffffff"
                },
              }}
            >
              Go to Home <HomeOutlinedIcon fontSize="large" sx={{marginLeft: "10px"}}/> 
            </ButtonElement>
          </Box>
        );

}

export default NotFound;