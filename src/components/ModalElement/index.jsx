import { Modal, Box } from "@mui/material";


const ModalElement = ({ open, handleClose, children, style = {} }) => {
  const defaultStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Reduce el ancho al 90% del viewport
    maxWidth: 600, // No más de 400px
    // bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
    overflow: "auto", // Habilita scroll si el contenido excede el tamaño
    ...style, // Permite sobrescribir estilos desde las props
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ ...defaultStyle }}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalElement;
