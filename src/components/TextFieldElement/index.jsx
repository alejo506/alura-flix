import { TextField } from "@mui/material";

const TextFieldElement = ({ id, label, value, onChange, variant = "outlined", error, helperText, onBlur, required = false, sx = {}, multiline = false, rows }) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      variant={variant}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
      required={required}
      fullWidth
      margin="normal"
      multiline={multiline}
      rows={multiline ? rows : undefined}
      sx={sx}
    />
  );
};

export default TextFieldElement;
