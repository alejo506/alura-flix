import React, { useContext } from "react";
import { Card, CardMedia, CardActions, IconButton, Typography, CardHeader, Box, Button, Tooltip } from "@mui/material";
import { VideosContext } from "@/context/Videos";
import deleteBttn from "/icons/delete.svg";
import updateBttn from "/icons/update.svg";
import ModalElement from "../ModalElement";
import { useModalState } from "@/customHook/useModalState";
import VideoPlayerModal from "../ModalElement/Modals/VideoPlayerModal";
import UpdateVideoForm from "../ModalElement/Modals/UpdateVideoFormModal";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

const cardStyles = {
  width: { xs: "90%", sm: "45%", md: "30%" },
  maxWidth: "400px",
  height: "100%",
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },

};

const mediaStyles = {
  width: "100%",
  height: "350px",
  position: "relative",
  borderRadius: "16px",
  objectFit: "cover",
  objectPosition: "center"
};

const imgBorderStyles = ($categoryColor) => ({
  border: `4px solid ${$categoryColor}`,
  boxShadow: `0px 0px 8px 1px ${$categoryColor} inset`,

});



const headerStyles = ($categoryColor) => ({
  textAlign: "center",
  color: "#FFFFFF",
  overflow: "hidden",
  padding: "15px",
  fontWeight: "bold",
  borderLeft: `4px solid ${$categoryColor}`,
  borderRight: `4px solid ${$categoryColor}`,
  borderTop: "none",
  borderBottom: "none",
  boxShadow: `0px 0px 8px 1px ${$categoryColor} inset`,
  height: "40px",
  fontSize: "25rem",
  '.MuiCardHeader-title': {
    fontSize: { xs: "1rem", sm: "0.8rem", md: "1rem" },

  },
  WebkitOverflowScrolling: "touch", // Mejora el desplazamiento en dispositivos táctiles
  // Personalización del scroll
  '&::-webkit-scrollbar': {
    width: '8px', // Ancho del scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: "gray", // Color del thumb (parte movible)
    borderRadius: '10px', // Bordes redondeados del thumb
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.2)', // Color de la pista (fondo)
    borderRadius: '10px', // Bordes redondeados de la pista
  },

});

const actionStyles = ($categoryColor) => ({
  justifyContent: "space-evenly",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px",
  border: `4px solid ${$categoryColor}`,
  boxShadow: `0px 0px 8px 1px ${$categoryColor} inset`,
});

const VideoCard = ({ video, $categoryColor }) => {
  const { deleteVideo, data } = useContext(VideosContext);
  const { categories } = data;

  const { open: openUpdate, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModalState();
  const { open: openVideo, openModal: openVideoModal, closeModal: closeVideoModal } = useModalState();

  const handleDelete = () => deleteVideo(video.id);


  return (
    <>
      <Card sx={cardStyles} key={video.id} >
        <Box
          sx={{
            position: "relative",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              zIndex: 1,
              ...imgBorderStyles($categoryColor),
            },
          }}
        >

          <Box
            sx={{
              // width: "400px",
              height: "350px",
              position: "relative", // Contenedor relativo para posicionar el botón sobre la imagen
              overflow: "hidden",
              borderRadius: "8px", // Bordes redondeados opcionales
            }}
          >

            <SmartDisplayIcon
              sx={{
                position: "absolute",
                top: "50%", // Center the icon vertically
                left: "50%", // Center the icon horizontally
                transform: "translate(-50%, -50%)", // Adjust to center exactly
                color: "white", 
                zIndex: 1, // Ensure it's above the image
                fontSize: "4.5rem", 
              }}
            />
            <CardMedia component="img" image={video.thumbnail} alt="Thumbnail" sx={mediaStyles} />
            <Tooltip title={video.description} arrow sx={{ "& .MuiTooltip-tooltip": { color: "white", backgroundColor: "black" } }}>
              <Button
                onClick={openVideoModal}
                sx={{
                  position: "absolute", // Superpone el botón sobre la imagen
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  color: "white",
                  zIndex: 2, // Asegura que esté encima de la imagen
                  // "&:hover": {
                  //   background: "rgba(0, 0, 0, 0.4)", // Cambio de fondo al pasar el mouse (opcional)

                  // },
                }}
              >
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <CardHeader title={video.title} sx={headerStyles($categoryColor)} />
        <CardActions sx={actionStyles($categoryColor)}>
          <IconButton aria-label="delete" size="large" onClick={handleDelete}>
            <img src={deleteBttn} alt="Delete" />
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>Delete</Typography>
          </IconButton>
          <IconButton aria-label="update" size="large" onClick={openUpdateModal}>
            <img src={updateBttn} alt="Update" />
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>Update</Typography>
          </IconButton>
        </CardActions>
      </Card>

      {/* Modal para actualizar video */}
      <ModalElement
        open={openUpdate}
        onClose={closeUpdateModal}
        style={{ backgroundColor: "#03122F", padding: "16px" }}
      >
        <UpdateVideoForm
          video={video}
          categories={categories}
          closeUpdateModal={closeUpdateModal}

        />
      </ModalElement>

      {/* Modal para reproducir video */}
      <ModalElement
        open={openVideo}
        onClose={closeVideoModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff45",
        }}
      >
        <VideoPlayerModal videoURL={video.videoURL} />
      </ModalElement>

    </>
  );
};

export default VideoCard;







