import ButtonElement from "@/components/ButtonElement/ButtonElement";
import TextFieldElement from "@/components/TextFieldElement";
import TitleElement from "@/components/TitleElement";
import buttonStyles from "@/utils/buttonStyles";
import { Box, TextField } from "@mui/material";


const AddCategoryModal = ({ onInputChange, onUpdate, newCategoryName, newCategoryColor, setNewCategoryName, setNewCategoryColor, fieldStyles }) => (
  <form onSubmit={onUpdate} style={{ display: "flex", flexDirection: "column", gap: "50px", alignItems: "center" }}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      width="100%"
    >


      <TitleElement text="Add Category" sx={{ fontWeight: "900", color: "#2271D1" }} />
      
        <TextFieldElement
          label="Category name"
          value={newCategoryName}
          onChange={onInputChange(setNewCategoryName)}
          sx={fieldStyles}
          required

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
)

export default AddCategoryModal;