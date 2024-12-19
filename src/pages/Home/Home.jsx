import { Box, useMediaQuery, useTheme } from "@mui/material";

import Banner from "@/components/Banner";
import Category from "@/components/Category";



const Home = () => {


        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detecta pantallas pequeñas
        const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Pantallas medianas
    
      
        return (
            <section >
                {/* <Header /> */}
                {/* Banner */}
                
                {!isMobile && (
                    <Banner />
                )}
    
                {/* Contenedor principal */}
                <Box
                    // paddingBottom={isMobile ? "110px " : "20px 0"}
                    paddingBottom="20px 0"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "40px",
                        backgroundColor: "#000000"
                    }}>
                    {/* {categories.map((category)=> { */}
                        {/* return  */}
                        <Category 
                            isMobile= {isMobile} 
                            isTablet={isTablet} 
                            // category={category}
                            // key={category.id}
                            />

                    {/* })} */}
                    
                </Box>
    
                {/* Pie de pagina*/}
                {/* <Footer/> */}

                
    
            </section>
        );

}

export default Home;