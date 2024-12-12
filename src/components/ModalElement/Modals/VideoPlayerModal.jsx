import { Box, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

const VideoPlayerModal = ({ videoURL, onClose }) => (
  <Box
    position="relative"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap={2}
  >
    <IconButton
      onClick={onClose}
      sx={{
        position: "absolute",
        top: 0,
        right: 16,
        color: "#FFFFFF",
      }}
    >
      ✖
    </IconButton>
    <Box
      sx={{
        width: "90%",
        maxWidth: "800px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <iframe
        width="100%"
        height="350px"
        src={videoURL}
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Box>
  </Box>
);

export default VideoPlayerModal;
