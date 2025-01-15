import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


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
    p: 1,
    borderRadius: "8px",
    overflow: "auto",
    border: "3px solid #ffffff85",

    ...style,
  };

  return (
    <Modal
      open={open}
    // onClose={handleClose}
    >
      <Box sx={{ ...defaultStyle }}>
          <CloseIcon
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
              color: "#FFFFFF",
            }}
          >
            {/* ✖ */}
          </CloseIcon>
          {children}
        </Box>
    </Modal>
  );
};

export default ModalElement;
