import { Button } from "@mui/material";

// Definimos un componente ButtonElement que pasa todos los props al componente Button de MUI
const ButtonElement = ({ children, type = "button", ...props }) => {
    return (
        <Button type={type} {...props}> 
            {children}
        </Button>
    );
}

export default ButtonElement;
