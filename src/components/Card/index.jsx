import React, { useState, useContext } from "react";
import { Card, CardMedia, CardActions, IconButton, Typography, CardHeader, Box, TextField, MenuItem } from "@mui/material";
import deleteBttn from "/icons/delete.svg";
import updateBttn from "/icons/update.svg";
import { VideosContext } from "@/context/Videos";
import ModalElement from "../ModalElement";
import TitleElement from "../TitleElement";
import TextFieldElement from "../TextFieldElement";
import ButtonElement from "../ButtonElement/ButtonElement";
import { fieldStyles, selectStyles, menuItemStyles } from "@/utils/textFieldStyles"; 
import buttonStyles from "@/utils/buttonStyles";

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
  height: "100%",
  position: "relative",
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

  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(video);

  const handleDelete = () => deleteVideo(video.id);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (field, value) => {
    setSelectedVideo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    updateVideo(selectedVideo);
    setOpen(false);
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
          <CardMedia component="img" image={video.thumbnail} alt="Thumbnail" sx={mediaStyles} />
        </Box>
        <CardHeader title={video.title} sx={headerStyles($categoryColor)} />
        <CardActions sx={actionStyles($categoryColor)}>
          <IconButton aria-label="delete" size="large" onClick={handleDelete}>
            <img src={deleteBttn} alt="Delete" />
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>Delete</Typography>
          </IconButton>
          <IconButton aria-label="update" size="large" onClick={handleOpen}>
            <img src={updateBttn} alt="Update" />
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>Update</Typography>
          </IconButton>
        </CardActions>
      </Card>

      <ModalElement
        open={open}
        handleClose={handleClose}
        style={{ backgroundColor: "#03122F", display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TitleElement text="Update Video" sx={{ fontWeight: "900", color: "#2271D1" }} />
        <TextFieldElement
          label="Title"
          value={selectedVideo?.title || ""}
          onChange={(e) => handleInputChange("title", e.target.value)}
          sx={fieldStyles}
        />
        <TextField
          select
          label="Category"
          value={selectedVideo?.categoria || ""}
          onChange={(e) => handleInputChange("categoria", e.target.value)}
          fullWidth
          sx={{...selectStyles, ...fieldStyles}}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.nombre} sx={menuItemStyles}>
              {category.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextFieldElement
          label="Thumbnail"
          value={selectedVideo?.thumbnail || ""}
          onChange={(e) => handleInputChange("thumbnail", e.target.value)}
          sx={fieldStyles}
        />
        <TextFieldElement
          label="Video URL"
          value={selectedVideo?.videoURL || ""}
          onChange={(e) => handleInputChange("videoURL", e.target.value)}
          sx={fieldStyles}
        />
        <TextFieldElement
          label="Description"
          value={selectedVideo?.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          sx={fieldStyles}
        />

        <ButtonElement
          onClick={handleUpdate}
          sx={buttonStyles("#2271D1", "#2271D1", "#2271D1")}
        >
          Update
        </ButtonElement>
      </ModalElement>
    </>
  );
};

export default VideoCard;
