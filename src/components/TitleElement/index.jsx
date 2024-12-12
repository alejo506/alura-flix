import { Typography } from "@mui/material";

const TitleElement = ({ text, sx = {}, variant = "h3", ...props }) => {
  return (
    <Typography variant={variant} sx={sx} {...props}>
      {text}
    </Typography>
  );
};

export default TitleElement;