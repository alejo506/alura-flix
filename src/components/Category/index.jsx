import React, { useContext } from "react";
import { Box, Typography, Stack } from "@mui/material";

import VideoCard from "../Card";
import { VideosContext } from "@/context/Videos";

const Category = ({ isMobile, isTablet }) => {
  const { data } = useContext(VideosContext);
  const {videos} = data;
  const {categories} = data;


  // Su función es devolver el JSX completo que se renderizará en la pantalla. Todo lo que está dentro del <>...</> (fragmento) es lo que React mostrará como la salida del componente.
  return (
    <>
      {categories.map((category) => {
        // Filtrar los videos por la categoría actual
        const filteredVideos = videos.filter((videoFilter) => videoFilter.categoria === category.nombre);

        // Mostrar solo si hay videos en la categoría
        if (filteredVideos.length === 0) return null;

        // Variable para pasarlo a la propiedad backgroundColor
        const $categoryColor = category.color

        // Este return está dentro de la función de callback del map. El propósito de este return es decir qué debe generar para cada categoría.
        return (
          <section key={category.id} >
            {/* Título de la Categoría */}
          
            <Box >
              <Stack
                width={isMobile ? "200px" : isTablet ? "300px" : "345px"}
                justifySelf={isTablet && "center"}
                sx={{
                  height: "40px",
                  backgroundColor: $categoryColor,
                  borderRadius: "15px",
                  padding: "15px",
                  margin: "43px 0 43px 25px",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "32px",
                    fontWeight: "800",
                    alignSelf: "center",
                  }}
                >
                  {category.nombre}
                </Typography>
              </Stack>
            </Box>

            {/* Contenedor de Cards */}
            <Box
              justifyContent={isMobile || isTablet ? "center" : "flex-start"}
              sx={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                margin: "0 25px",
              }}
            >
              {/* Pasar los videos filtrados a las tarjetas */}
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} $categoryColor = {$categoryColor}/>
              ))}
            </Box>
          </section>
        );
      })}
    </>
  );
};

export default Category;
