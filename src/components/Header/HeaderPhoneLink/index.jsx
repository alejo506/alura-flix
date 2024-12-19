import { Stack, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const HeaderPhoneLink = ({ buttonStyles }) => {


    return (
        <>
            {/* // Menú para móviles */}
            <Stack
                direction="row"
                spacing={3}
                sx={{ justifyContent: "center", width: "100%" }}
            >
                <Link to="/">
                    <Button
                        variant="outlined"
                        sx={{...buttonStyles("#2271D1", "#2271D1"), backgroundColor:"#000000E5", "&:hover":{backgroundColor:"#000000E5"}}}
                    >
                        <img src="/icons/home-phone.svg" alt="Home" style={{ marginRight: "8px" }} />
                        HOME
                    </Button>
                </Link>

                <Link to="/add">
                    <IconButton aria-label="add">
                        <img src="/icons/add.svg" alt="add" />
                    </IconButton>
                </Link>
            </Stack>
        </>
    )

}

export default HeaderPhoneLink;


