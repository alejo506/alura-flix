export const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#6BD1FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6BD1FF",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6BD1FF",
  },
  "& .MuiInputBase-input": {
    color: "#A5A5A5",
  },
};

export const selectStyles = {
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "#A5A5A5",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
};

export const menuItemStyles = {
  color: "white",
  backgroundColor: "#333",
  "&:hover": {
    backgroundColor: "#2271D1",
  },
  "&.Mui-selected": {
    backgroundColor: "#6BD1FF",
    color: "black",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#2271D1",
  },
};