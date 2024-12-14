import VideoForm from "@/components/VideoForm";


const UpdateVideoForm = ({ video, categories, onUpdate, fieldStyles, selectStyles, closeUpdateModal }) => (

  <VideoForm 
    mode="edit"
    fieldStyles={fieldStyles}
    selectStyles={selectStyles}
    categories={categories}
    video={video}
    onUpdate={onUpdate}
    closeUpdateModal = {closeUpdateModal}
  />

);

export default UpdateVideoForm;
