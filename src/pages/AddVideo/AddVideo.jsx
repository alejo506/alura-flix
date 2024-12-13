import { useContext, useState } from "react";
import { VideosContext } from "@/context/Videos";
import { MenuItem, Box, Typography, TextField, Stack } from "@mui/material";
import ButtonElement from "@/components/ButtonElement/ButtonElement";
import TextFieldElement from "@/components/TextFieldElement";
import TitleElement from "@/components/TitleElement";
import buttonStyles from "@/utils/buttonStyles";
import { fieldStyles, selectStyles, menuItemStyles } from "@/utils/textFieldStyles";
import ModalElement from "@/components/ModalElement";
import { useModalState } from "@/customHook/useModalState";
import AddCategoryModal from "@/components/ModalElement/Modals/AddCategoryModal";


const AddVideo = () => {
  const { data, addVideo, addCategory } = useContext(VideosContext);
  const { categories } = data;

  // const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const { open: openCategory, openModal: openCategoryModal, closeModal: closeCategoryModal } = useModalState();


  const [titleField, setTitleField] = useState('');
  const [categoryField, setCategoryField] = useState('');
  const [imageField, setImageField] = useState('');
  const [videoField, setVideoField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');


  const handleInputChange = (setter) => (event) => setter(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    let sendDataForm = {
      title: titleField,
      categoria: categoryField,
      thumbnail: imageField,
      videoURL: videoField,
      description: descriptionField
    }

    //Funcion de agregar/ Crear en el context
    addVideo(sendDataForm);
    cleanFields();

  }

  const cleanFields = () => {
    // Limpiar los campos después de enviar el formulario
    setTitleField('');
    setCategoryField('');
    setImageField('');
    setVideoField('');
    setDescriptionField('');
  }


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

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "1400px", display: "flex", flexDirection: "column", gap: "16px" }}>

        <Typography variant="h6" sx={{ color: '#FFFFFF', fontSize: "36px" }}>Create a card</Typography>

        {/* Título y Categoría */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "16px", width: "100%" }}>
          <TextFieldElement id="title" label="Title" value={titleField} onChange={handleInputChange(setTitleField)} variant="outlined" fullWidth margin="normal" required sx={{ ...fieldStyles, flex: 1 }} />
          <TextField
            defaultValue=""
            id="category"
            select
            label="Select Category"
            value={categoryField}
            onChange={handleInputChange(setCategoryField)}
            variant="standard"
            aria-hidden="false"

            // helperText="Please select category"
            required
            inputProps={{
              "aria-hidden": false, // Desactiva cualquier aria-hidden no deseado
            }}
            sx={{ ...selectStyles, flex: 1 }}
          >
            {categories.map((categoryItem) => (
              <MenuItem key={categoryItem.id} value={categoryItem.nombre} sx={menuItemStyles} aria-hidden="false"> {/*Asegura que solo se muestren los items con el foco adecuado*/}
                {categoryItem.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Imagen y Video */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "16px", width: "100%" }}>
          <TextFieldElement id="image" label="Image" value={imageField} onChange={handleInputChange(setImageField)} variant="outlined" fullWidth margin="normal" required sx={fieldStyles} />
          <TextFieldElement id="link" label="Video" value={videoField} onChange={handleInputChange(setVideoField)} variant="outlined" fullWidth margin="normal" required sx={fieldStyles} />
        </Box>

        {/* Descripción */}
        <TextFieldElement
          id="description"
          label="Description"
          value={descriptionField}
          onChange={handleInputChange(setDescriptionField)}
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          sx={fieldStyles}
        />
        <Box display="flex" flexDirection={{xs: "column", sm: "row"}} gap="16px" width= "100%">
          <ButtonElement type="submit" variant="outlined" sx={buttonStyles("#2271D1", "#FFFFFF", "#2271D1")}>Save</ButtonElement>
          <ButtonElement onClick={cleanFields} variant="outlined" sx={buttonStyles("#FFFFFF", "#FFFFFF")}>Clear</ButtonElement>
          <ButtonElement onClick={openCategoryModal} variant="outlined" sx={{...buttonStyles("#FFFFFF", "#2271d1"), marginLeft: { sm: "auto" }}}>Add Category</ButtonElement>
        </Box>

      </form>

      {/* Modal para agregar categorias */}
      <ModalElement
        open={openCategory}
        style={{ backgroundColor: "#03122F" }}
        onClose={closeCategoryModal}

      >
        <AddCategoryModal
          onInputChange={handleInputChange}
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
