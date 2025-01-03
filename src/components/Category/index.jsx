import React, { useContext, useState } from "react";
import { Box, Typography, Stack, TextField } from "@mui/material";
import { VideosContext } from "@/context/Videos";
import VideoCard from "../Card";

const Category = ({ isMobile, isTablet }) => {
  const { data, updateCategoryColor } = useContext(VideosContext);
  const { videos, categories } = data;

  const [colorTimers, setColorTimers] = useState({}); // Para manejar los timers por categoría

  const handleColorChange = (categoryId, newColor) => {
    // Limpiar el timer anterior, si existe
    if (colorTimers[categoryId]) {
      clearTimeout(colorTimers[categoryId]);
    }

    // Crear un nuevo timer
    const timer = setTimeout(() => {
      updateCategoryColor(categoryId, newColor); // Llamar a la función de actualización
    }, 300); // Esperar 300 ms

    // Actualizar el estado con el nuevo timer
    setColorTimers((prevTimers) => ({
      ...prevTimers,
      [categoryId]: timer,
    }));
  };

  return (
    <>
      {categories.map((category, index) => {
        const filteredVideos = videos.filter(
          (video) => video.categoria === category.nombre
        );

        if (filteredVideos.length === 0) return null;

        const $categoryColor = category.color;

        return (
          <section key={category.id} style={{  marginBottom: index === categories.length - 1 ? "0" : "75px"}}>
            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              alignItems={!isMobile ? "baseline" : "center"}
            >
              <Stack
                minWidth={isMobile ? "250px" : isTablet ? "300px" : "345px"}
                minHeight="40px"
                sx={{
                  whiteSpace: "normal", // Permite saltos de línea
                  wordBreak: "break-word", // Asegura que las palabras largas no desborden
                  overflow: "visible", // Elimina restricciones de desbordamiento
                  backgroundColor: $categoryColor,
                  borderRadius: "15px",
                  padding: "15px",
                  margin: `0px 0px ${isMobile ? "0px" : "73px"} 0px`,
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: `${isMobile ? "32px" : "32px"}`,
                    fontWeight: "800",
                    alignSelf: "center",
                    lineHeight: "1.5rem",
                  }}

                >
                  {category.nombre}
                </Typography>
              </Stack>
              <TextField
                type="color"
                value={$categoryColor}
                onChange={(e) => handleColorChange(category.id, e.target.value)}
                sx={{
                  width: "100px",
                  height: "100px",
                  marginLeft: "10px",
                  justifyContent: "center",
                  ...(!isMobile && { marginLeft: "auto" }),  // Solo aplica marginLeft si no es móvil

                  "& input": { height: "100%", width: "100%" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "32px",
                flexWrap: "wrap",
                margin: `${!isMobile ? "0 25px" : "0"}`,
                justifyContent: isMobile || isTablet ? "center" : "space-between",
              }}
            >
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} $categoryColor={$categoryColor} />
              ))}
            </Box>
          </section>
        );
      })}
    </>
  );
};

export default Category;
