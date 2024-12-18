import React, { useContext, useState, useEffect } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import ButtonElement from "@/components/ButtonElement/ButtonElement";
import buttonStyles from "@/utils/buttonStyles";
import { VideosContext } from "@/context/Videos";
import TextFieldElement from "../TextFieldElement";
import { fieldStyles, selectStyles, menuItemStyles } from "@/utils/textFieldStyles";


const VideoForm = ({ categories = [], video, mode = "create", closeUpdateModal }) => {
  const { addVideo, updateVideo } = useContext(VideosContext);

  const [formValues, setFormValues] = useState({
    title: "",
    categoria: "",
    thumbnail: "",
    videoURL: "",
    description: "",
  });

  // Estado de los errores
  const [errors, setErrors] = useState({
    title: { error: false, message: "" },
    categoria: { error: false, message: "" },
    thumbnail: { error: false, message: "" },
    videoURL: { error: false, message: "" },
    description: { error: false, message: "" },
  });

  // InputChance de todos los campos
  const handleInputChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  //Actualizar videos videos
  useEffect(() => {
    if (mode === "edit" && video) {
      setFormValues({
        id: video.id,
        title: video.title || "",
        categoria: video.categoria || "",
        thumbnail: video.thumbnail || "",
        videoURL: video.videoURL || "",
        description: video.description || "",
      });
    }
  }, [video, mode]);


  const validateTitle = (title) => {
    const trimmedTitle = title.trim(); // Eliminar espacios en blanco al inicio y al final
    return trimmedTitle.length >= 3
      ? { error: false, message: "" }
      : { error: true, message: "Must have at least 3 characters." };
  };

  const validateCategoria = (categoria) => {
    return categoria
      ? { error: false, message: "" }
      : { error: true, message: "Category selection is required." };
  };

  const validateThumbnail = (thumbnail) => {
    const urlRegex = /^(https?:\/\/).+\.(jpg|jpeg|png|gif)$/i;
    return urlRegex.test(thumbnail)
      ? { error: false, message: "" }
      : { error: true, message: "Must be a valid image link." };
  };

  const validateVideoURL = (videoURL) => {
    const urlRegex = /^https?:\/\/.+/i;
    return urlRegex.test(videoURL)
      ? { error: false, message: "" }
      : { error: true, message: "Must be a valid video link." };
  };

  const validateDescription = (description) => {
    const trimmedDescription = description.trim(); // Eliminar espacios en blanco al inicio y al final
    return trimmedDescription.length >= 10
      ? { error: false, message: "" }
      : { error: true, message: "Must have at least 10 characters." };
  };

  const validateAllFields = () => {
    const titleError = validateTitle(formValues.title);
    const categoriaError = validateCategoria(formValues.categoria);
    const thumbnailError = validateThumbnail(formValues.thumbnail);
    const videoURLError = validateVideoURL(formValues.videoURL);
    const descriptionError = validateDescription(formValues.description);

    const newErrors = {
      title: titleError,
      categoria: categoriaError,
      thumbnail: thumbnailError,
      videoURL: videoURLError,
      description: descriptionError,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((field) => field.error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateAllFields()) {
      // console.log("Hay errores en el formulario.");
      return;
    }

    if (mode === "create") {
      addVideo(formValues);
      cleanFields();
    } else {
      updateVideo(formValues);
      closeUpdateModal();
    }
  };

  const cleanFields = () => {
    setFormValues({
      title: "",
      categoria: "",
      thumbnail: "",
      videoURL: "",
      description: "",
    });
    setErrors({
      title: { error: false, message: "" },
      categoria: { error: false, message: "" },
      thumbnail: { error: false, message: "" },
      videoURL: { error: false, message: "" },
      description: { error: false, message: "" },
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", height: "90%" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "16px", width: "100%" }}>
        <TextFieldElement
          id="title"
          label="Title"
          value={formValues.title}
          onChange={handleInputChange("title")}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.title.error}
          helperText={errors.title.message}
          onBlur={(e) => setErrors((prev) => ({ ...prev, title: validateTitle(e.target.value) }))}
          required
          sx={{ ...fieldStyles, flex: 1 }}
        />
        <TextField
          id="category"
          select
          label="Select Category"
          value={formValues.categoria}
          onChange={handleInputChange("categoria")}
          variant="standard"
          error={errors.categoria.error}
          helperText={errors.categoria.message}
          onBlur={() => setErrors((prev) => ({ ...prev, categoria: validateCategoria(formValues.categoria) }))}
          required
          sx={{ ...selectStyles, flex: 1 }}
        >
          {categories.map((categoryItem) => (
            <MenuItem key={categoryItem.id} value={categoryItem.nombre} sx={menuItemStyles}>
              {categoryItem.nombre}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "16px", width: "100%" }}>
        <TextFieldElement
          id="image"
          label="Image"
          value={formValues.thumbnail}
          onChange={handleInputChange("thumbnail")}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.thumbnail.error}
          helperText={errors.thumbnail.message}
          onBlur={(e) => setErrors((prev) => ({ ...prev, thumbnail: validateThumbnail(e.target.value) }))}
          required
          sx={fieldStyles}
        />
        <TextFieldElement
          id="link"
          label="Video"
          value={formValues.videoURL}
          onChange={handleInputChange("videoURL")}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.videoURL.error}
          helperText={errors.videoURL.message}
          onBlur={(e) => setErrors((prev) => ({ ...prev, videoURL: validateVideoURL(e.target.value) }))}
          required
          sx={fieldStyles}
        />
      </Box>

      <TextFieldElement
        id="description"
        label="Description"
        value={formValues.description}
        onChange={handleInputChange("description")}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        error={errors.description.error}
        helperText={errors.description.message}
        onBlur={(e) => setErrors((prev) => ({ ...prev, description: validateDescription(e.target.value) }))}
        required
        sx={fieldStyles}
      />

      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap="16px" width="100%" marginTop={2}>
        <ButtonElement type="submit" sx={buttonStyles("#2271D1", "#FFFFFF", "#2271D1")}>
          {mode === "create" ? "Save" : "Update"}
        </ButtonElement>

        {mode === "create" && (
          <ButtonElement onClick={cleanFields} variant="outlined" sx={buttonStyles("#FFFFFF", "#FFFFFF")}>
            Clear
          </ButtonElement>
        )}
      </Box>
    </form>
  );
};

export default VideoForm;
