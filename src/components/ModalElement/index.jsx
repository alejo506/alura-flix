import { Modal, Box, IconButton } from "@mui/material";


const ModalElement = ({ open, onClose, children, style = {} }) => {
  const defaultStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", 
    maxWidth: 800, 
    // bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    overflow: "auto", 
    ...style,
  };

  return (
    <Modal
      open={open}
    // onClose={handleClose}
    >
      <Box sx={{ ...defaultStyle }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: -10,
              right: 0,
              color: "#FFFFFF",
            }}
          >
            ✖
          </IconButton>
          {children}
        </Box>
    </Modal>
  );
};

export default ModalElement;
