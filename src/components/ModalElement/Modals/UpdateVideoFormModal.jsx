import ButtonElement from "@/components/ButtonElement/ButtonElement";
import TitleElement from "@/components/TitleElement";
import buttonStyles from "@/utils/buttonStyles";
import { Typography, TextField, MenuItem, Box } from "@mui/material";


const UpdateVideoForm = ({ video, categories, onInputChange, onUpdate, fieldStyles, selectStyles, menuItemStyles }) => (
  <Box display="flex" flexDirection="column" gap={3}>
    <TitleElement  text="Update Video" sx={{ fontWeight: "900", color: "#2271D1" }}>
      Update Video
    </TitleElement>
    <TextField
      label="Title"
      value={video?.title || ""}
      onChange={(e) => onInputChange("title", e.target.value)}
      fullWidth
      sx={fieldStyles}
    />
    <TextField
      select
      label="Category"
      value={video?.categoria || ""}
      onChange={(e) => onInputChange("categoria", e.target.value)}
      fullWidth
      sx={{ ...selectStyles, ...fieldStyles }}
    >
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.nombre}>
          {category.nombre}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      label="Thumbnail"
      value={video?.thumbnail || ""}
      onChange={(e) => onInputChange("thumbnail", e.target.value)}
      fullWidth
      sx={fieldStyles}

    />
    <TextField
      label="Video URL"
      value={video?.videoURL || ""}
      onChange={(e) => onInputChange("videoURL", e.target.value)}
      fullWidth
      sx={fieldStyles}

    />
    <TextField
      label="Description"
      value={video?.description || ""}
      onChange={(e) => onInputChange("description", e.target.value)}
      fullWidth
      multiline
      rows={2}
      sx={fieldStyles}

    />
    <ButtonElement onClick={onUpdate} sx={buttonStyles("#2271D1", "#2271D1", "#2271D1")}>
      Update
    </ButtonElement>
  </Box>
);

export default UpdateVideoForm;
