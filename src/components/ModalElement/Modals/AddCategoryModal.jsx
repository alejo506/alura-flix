import ButtonElement from "@/components/ButtonElement/ButtonElement";
import TextFieldElement from "@/components/TextFieldElement";
import TitleElement from "@/components/TitleElement";
import buttonStyles from "@/utils/buttonStyles";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

const AddCategoryModal = ({
  onInputChange,
  onUpdate,
  newCategoryName,
  newCategoryColor,
  setNewCategoryName,
  setNewCategoryColor,
  fieldStyles,
}) => {
  // Estado para manejo de errores
  const [errors, setErrors] = useState({
    name: {
      error: false,
      message: "",
    },
  });

  // Función de validación
  const validateCategoryName = (categoryName) => {
    return {
      name: {
        error: categoryName.length < 3,
        message: categoryName.length < 3 ? "Deben ser al menos 3 caracteres" : "",
      },
    };
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    const validationErrors = validateCategoryName(newCategoryName);

    if (validationErrors.name.error) {
      setErrors(validationErrors); // Actualizar estado de errores
    } else {
      setErrors({ name: { error: false, message: "" } }); // Limpiar errores
      onUpdate(); // Llamar función de actualización
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <TitleElement
          text="Add Category"
          sx={{ fontWeight: "900", color: "#2271D1" }}
        />

        <TextFieldElement
          label="Category name"
          value={newCategoryName}
          onChange={onInputChange(setNewCategoryName)}
          sx={fieldStyles}
          required
          error={errors.name.error}
          helperText={errors.name.error ? errors.name.message : ""}
          onBlur={(e) => {
            setErrors(validateCategoryName(e.target.value));
          }}
        />

        <TextField
          label="Color"
          type="color"
          value={newCategoryColor}
          onChange={onInputChange(setNewCategoryColor)}
          sx={{ ...fieldStyles, width: "100px", alignSelf: "start" }}
          required
        />
      </Box>

      <ButtonElement
        type="submit"
        sx={buttonStyles("#2271D1", "#2271D1", "#2271D1")}
      >
        Save
      </ButtonElement>
    </form>
  );
};

export default AddCategoryModal;
