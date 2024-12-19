import ButtonElement from "@/components/ButtonElement/ButtonElement";
import TextFieldElement from "@/components/TextFieldElement";
import TitleElement from "@/components/TitleElement";
import { VideosContext } from "@/context/Videos";
import buttonStyles from "@/utils/buttonStyles";
import { fieldStyles, menuItemStyles, selectStyles } from "@/utils/textFieldStyles";
import { Box, MenuItem, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext, useState } from "react";

const AddCategoryModal = ({
  onUpdate,
  newCategoryName,
  newCategoryColor,
  setNewCategoryName,
  setNewCategoryColor,
}) => {

  const { data, deleteCategory } = useContext(VideosContext);
  const { categories } = data;
  
  // Estado para manejar la vista activa (Add o Delete)
  const [alignment, setAlignment] = useState("add");
  
  const [categoryItems, setCategoryItem] = useState("");  // Inicializamos con "" en lugar de categories

  const handleInputChange = (setter) => (event) => setter(event.target.value);

  // Estado para manejo de errores
  const [errors, setErrors] = useState({
    name: {
      error: false,
      message: "",
    },
    categoria: {
      error: false,
      message: "",
    },
  });

  // Función de validación
  const validateCategoryName = (categoryName) => {
    const trimmedCategoryName = categoryName.trim(); // Eliminar espacios al principio y al final
    return {
      name: {
        error: trimmedCategoryName.length < 2, // Validar la longitud después de hacer trim
        message: trimmedCategoryName.length < 2 ? "Must have at least 2 characters." : "",
      },
    };
  };
  

  // Validar Select del Delete
  const validateCategoria = (categoria) => {
    return categoria
      ? { error: false, message: "" }
      : { error: true, message: "Category selection is required." }; // Mensaje corregido
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

  // Función para manejar el cambio de vista (Add/ Delete)
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      {/* Toggle para seleccionar entre "Add" y "Delete" */}
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ marginBottom: "20px",  backgroundColor:"#fefefe" }}
      >
        <ToggleButton value="add">Add</ToggleButton>
        <ToggleButton value="delete">Delete</ToggleButton>
      </ToggleButtonGroup>

      {/* Vista para Eliminar */}
      {alignment === "delete" && (
        <Box alignItems="center" sx={{ width: "100%", display: "flex", flexDirection:"column", gap: "30px" }}>
          <TitleElement
            text="Delete Category "
            sx={{ fontWeight: "900", color: "#2271D1" }}
          />

          <TextField
            id="category"
            select
            label="Select Category"
            value={categoryItems}
            onChange={handleInputChange(setCategoryItem)}
            variant="standard"
            required
            size="medium"
            error={errors.categoria.error}
            helperText={errors.categoria.message}
            onBlur={() => setErrors((prev) => ({ ...prev, categoria: validateCategoria(categoryItems) }))}
            sx={{ ...selectStyles, flex: 1, width: "50%" }}
          >
            {categories.map((categoryItem) => (
              <MenuItem key={categoryItem.id} value={categoryItem.id} sx={menuItemStyles}>
                {categoryItem.nombre}
              </MenuItem>
            ))}
          </TextField>

          <ButtonElement
            onClick={async () => {
              await deleteCategory(categoryItems); // Eliminar categoría
              setCategoryItem(""); // Restablecer el estado del select
            }}
            sx={{
              ...buttonStyles("#D12222", "#D12222", "#D12222"), width: "50px", 
              "&.Mui-disabled": {...buttonStyles("#A9A9A9", "#A9A9A9", "#A9A9A9")}
            }}
            disabled={!categoryItems} // Deshabilita el botón si no se selecciona una categoría
          >
            Delete
          </ButtonElement>
        </Box>
      )}

      {/* Vista para Agregar */}
      {alignment === "add" && (
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
              onChange={handleInputChange(setNewCategoryName)}
              sx={fieldStyles}
              required
              error={errors.name.error}
              helperText={errors.name.error ? errors.name.message : ""}
              onBlur={(e) => setErrors((prev) => ({ ...prev, ...validateCategoryName(e.target.value) }))}

            />

            <TextField
              label="Select color"
              type="color"
              value={newCategoryColor}
              onChange={handleInputChange(setNewCategoryColor)}
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
      )}
    </>
  );
};

export default AddCategoryModal;
