import React, { useState, useContext } from "react";
import { Card, CardMedia, CardActions, IconButton, Typography, CardHeader, Box, TextField, MenuItem, Button } from "@mui/material";
import { VideosContext } from "@/context/Videos";
import deleteBttn from "/icons/delete.svg";
import updateBttn from "/icons/update.svg";
import ModalElement from "../ModalElement";
import { fieldStyles, selectStyles, menuItemStyles } from "@/utils/textFieldStyles";
import { useModalState } from "@/customHook/useModalState";
import VideoPlayerModal from "../ModalElement/Modals/VideoPlayerModal";
import UpdateVideoForm from "../ModalElement/Modals/UpdateVideoFormModal";

const cardStyles = {
  width: { xs: "90%", sm: "45%", md: "30%" },
  maxWidth: "400px",
  height: "100%",
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

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
  overflow: "auto",
  padding: "8px",
  fontWeight: "bold",
  border: `4px solid ${$categoryColor}`,
  boxShadow: `0px 0px 8px 1px ${$categoryColor} inset`,
});

const actionStyles = ($categoryColor) => ({
  justifyContent: "space-evenly",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px",
  border: `4px solid ${$categoryColor}`,
  boxShadow: `0px 0px 8px 1px ${$categoryColor} inset`,
});

const VideoCard = ({ video, $categoryColor }) => {
  const { deleteVideo, updateVideo, data } = useContext(VideosContext);
  const { categories } = data;

  const { open: openUpdate, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModalState();
  const { open: openVideo, openModal: openVideoModal, closeModal: closeVideoModal } = useModalState();

  const [selectedVideo, setSelectedVideo] = useState(video);

  const handleDelete = () => deleteVideo(video.id);

  const handleInputChange = (field, value) => {
    setSelectedVideo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    updateVideo(selectedVideo);
    closeUpdateModal();
  };


  return (
    <>
      <Card sx={cardStyles} key={video.id}>
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
            <CardMedia component="img" image={video.thumbnail} alt="Thumbnail" sx={mediaStyles} />
            {/* Botón superpuesto */}
            <Button
              onClick={openVideoModal}
              sx={{
                position: "absolute", // Superpone el botón sobre la imagen
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                color: "white",
                zIndex: 1, // Asegura que esté encima de la imagen
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.4)", // Cambio de fondo al pasar el mouse (opcional)
                },
              }}
            >
            </Button>
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
          video={selectedVideo}
          categories={categories}
          onInputChange={handleInputChange}
          onUpdate={handleUpdate}
          fieldStyles={fieldStyles}
          selectStyles={selectStyles}
          menuItemStyles={menuItemStyles}
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







