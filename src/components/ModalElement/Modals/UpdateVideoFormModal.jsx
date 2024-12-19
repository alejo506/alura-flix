import VideoForm from "@/components/VideoForm";




const UpdateVideoForm = ({ video, categories, closeUpdateModal }) => (

  <VideoForm 
    mode="edit"
    categories={categories}
    video={video}
    closeUpdateModal = {closeUpdateModal}
  />

);

export default UpdateVideoForm;
