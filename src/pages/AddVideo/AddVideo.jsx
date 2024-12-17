import { useContext, useState } from "react";
import { VideosContext } from "@/context/Videos";
import { Box, Button, Typography} from "@mui/material";
import ButtonElement from "@/components/ButtonElement/ButtonElement";

import TitleElement from "@/components/TitleElement";
import buttonStyles from "@/utils/buttonStyles";
import { fieldStyles, selectStyles, menuItemStyles } from "@/utils/textFieldStyles";
import ModalElement from "@/components/ModalElement";
import { useModalState } from "@/customHook/useModalState";
import AddCategoryModal from "@/components/ModalElement/Modals/AddCategoryModal";
import VideoForm from "@/components/VideoForm";
import AddIcon from '@mui/icons-material/Add';


const AddVideo = () => {
  const { data, addCategory } = useContext(VideosContext);
  const { categories } = data;

  const { open: openCategory, openModal: openCategoryModal, closeModal: closeCategoryModal } = useModalState();

  //Estados Modal para agregar Categoria
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#000000");


  const handleAddCategory = () => {
    const newCategory = {
      nombre: newCategoryName,
      color: newCategoryColor
    }

    closeCategoryModal();

    addCategory(newCategory);

    setNewCategoryName("");
    setNewCategoryColor("#000000");
  }


  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "50px", backgroundColor: "#000000" }}>
      <Box sx={{ textAlign: 'center', marginBottom: '60px' }}>
        <TitleElement text=" NEW VIDEO" variant="h3" sx={{ fontWeight: 'bold', fontSize: "60px", color: '#fff' }} />

        <Typography variant="h6" sx={{ color: '#aaa' }}>
          Fill out the form to create a new video card.
        </Typography>
      </Box>
      <ButtonElement onClick={openCategoryModal} variant="outlined" sx={{...buttonStyles("#FFFFFF", "#2271d1"),marginBottom:"10px", marginLeft: { sm: "auto" }}} ><AddIcon sx={{ color: "#2271d1" }} />Manage category</ButtonElement>

      <VideoForm 
       categories={categories}
       mode="create"
       fieldStyles={fieldStyles}
       selectStyles={selectStyles}
       menuItemStyles={menuItemStyles}
      />
       
      {/* Modal para agregar categorias */}
      <ModalElement
        open={openCategory}
        style={{ backgroundColor: "#03122F" }}
        onClose={closeCategoryModal}

      >
        <AddCategoryModal
          onUpdate={handleAddCategory}
          newCategoryName={newCategoryName}
          newCategoryColor={newCategoryColor}
          setNewCategoryName={setNewCategoryName}
          setNewCategoryColor={setNewCategoryColor}
          fieldStyles={fieldStyles}
        />

      </ModalElement>
    </Box>
  );
};

export default AddVideo;
