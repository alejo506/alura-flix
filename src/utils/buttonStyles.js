
  // Estilos comunes reutilizables
const buttonStyles = (borderColor, textColor, boxShadow) => ({
    borderColor: borderColor,
    backgroundColor: "transparent",
    color: textColor,
    minWidth: 160,
    fontSize: "18px",
    borderRadius: "10px",
    borderWidth: "2px",
    boxShadow: `0px 0px 10px 1px ${boxShadow} inset`,

    "&:hover": {
      borderColor: "#2271D1",
      backgroundColor: borderColor === "#2271D1" ? "#e0e0e01A" : "transparent",
    },
  });

  export default buttonStyles;