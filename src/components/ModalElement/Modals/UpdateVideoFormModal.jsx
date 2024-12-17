import VideoForm from "@/components/VideoForm";




const UpdateVideoForm = ({ video, categories, onUpdate, closeUpdateModal }) => (

  <VideoForm 
    mode="edit"
    categories={categories}
    video={video}
    onUpdate={onUpdate}
    closeUpdateModal = {closeUpdateModal}
  />

);

export default UpdateVideoForm;
