import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify"; // Importa toast

export const VideosContext = createContext();
VideosContext.displayName = "Videos";

const api_url_videos = `https://67578164c0a427baf94ce4eb.mockapi.io/videos`;

export default function VideosProvider({ children }) {
    const [data, setData] = useState({
        categories: [],
        videos: []
    });

    console.log(data);

    // ? VIDEOS
    const fetchVideos = async () => {
        try {
            const response = await fetch(api_url_videos);
            const videos = await response.json();
            setData(prevData => ({
                ...prevData,
                videos: videos
            }));
        } catch (error) {
            toast.error("Error loading videos.");
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://67578164c0a427baf94ce4eb.mockapi.io/categories');
            const categories = await response.json();
            setData(prevData => ({
                ...prevData,
                categories: categories
            }));
        } catch (error) {
            toast.error("Error loading categories.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const addVideo = async (newVideo) => {
        try {
            const response = await fetch(api_url_videos, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVideo)
            });

            const addedVideo = await response.json();
            setData(prevData => ({
                ...prevData,
                videos: [...prevData.videos, addedVideo]
            }));
            toast.success("Video added successfully!");
        } catch (error) {
            toast.error("Error loading video");
        }
    };

    const deleteVideo = async (id) => {
        try {
            const response = await fetch(`${api_url_videos}/${id}`, { method: "DELETE" });
            if (response.ok) {
                const newVideos = data.videos.filter(video => video.id !== id);
                setData(prevData => ({
                    ...prevData,
                    videos: newVideos
                }));
                toast.success("Video deleted successfully!");
            } else {
                toast.error("Error deleting the video:");
            }
        } catch (error) {
            toast.error("Error during video deletion.");
        }
    };

    const updateVideo = async (updatedVideo) => {
        try {
            const response = await fetch(`${api_url_videos}/${updatedVideo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(updatedVideo)
            });

            const result = await response.json();
            setData(prevData => ({
                ...prevData,
                videos: prevData.videos.map(video =>
                    video.id === result.id ? { ...video, ...updatedVideo } : video
                )
            }));
            toast.success("Video updated successfully!");
        } catch (error) {
            toast.error("Error updating the video.");
        }
    };

    // ? CATEGORÍAS
    const addCategory = async (newCategory) => {
        try {
            // Formateamos el nombre de la categoría con la primera letra en mayúscula
            const formattedCategory = {
                ...newCategory,
                nombre: newCategory.nombre[0].toUpperCase() + newCategory.nombre.slice(1).toLowerCase(),
            };
    
            // Verificamos si la categoría ya existe
            const categoryExists = data.categories.some(category => category.nombre.toLowerCase() === formattedCategory.nombre.toLowerCase());
    
            if (categoryExists) {
                // Si la categoría ya existe, mostramos un mensaje de error
                toast.error("This category already exists.");
                return;
            }
    
            // Si no existe, agregamos la nueva categoría
            const response = await fetch('https://67578164c0a427baf94ce4eb.mockapi.io/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedCategory)
            });
    
            const addedCategory = await response.json();
    
            // Actualizamos el estado con la nueva categoría
            setData(prevData => ({
                ...prevData,
                categories: [...prevData.categories, addedCategory]
            }));
    
            // Mostramos un mensaje de éxito
            toast.success("Category added successfully!");
        } catch (error) {
            // Mostramos un mensaje de error si algo sale mal
            toast.error("Error adding the category.");
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            // Obtener el nombre de la categoría a partir del ID
            const category = data.categories.find((category) => category.id === categoryId);
            if (!category) {
                toast.error("Category not found.");
                return;
            }
            const categoryName = category.nombre; // Nombre de la categoría
    
            // Filtrar los videos relacionados con esta categoría por nombre
            const videosToDelete = data.videos.filter((video) => video.categoria === categoryName);
    
            console.log(`Deleting ${videosToDelete.length} videos for category: ${categoryName}`);
    
            // Eliminar todos los videos relacionados en paralelo usando Promise.all
            const deletePromises = videosToDelete.map((video) => {
                return fetch(`${api_url_videos}/${video.id}`, {
                    method: "DELETE",
                }).then((response) => {
                    if (!response.ok) {
                        return Promise.reject(`Failed to delete video with id ${video.id}`);
                    }
                });
            });
    
            // Esperar a que todas las promesas de eliminación de videos se resuelvan
            await Promise.all(deletePromises);
            console.log("All related videos deleted successfully.");
    
            // Ahora eliminamos la categoría
            const response = await fetch(`https://67578164c0a427baf94ce4eb.mockapi.io/categories/${categoryId}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                console.log(`Category with ID: ${categoryId} deleted successfully.`);
                
                // Filtrar las categorías eliminando la categoría con el id especificado
                const newCategories = data.categories.filter((category) => category.id !== categoryId);
    
                // Actualizar el estado para reflejar la eliminación de la categoría
                setData((prevData) => ({
                    ...prevData,
                    categories: newCategories,
                }));
    
                toast.success("Category and related videos deleted successfully!");
            } else {
                const error = await response.text();
                toast.error("Error deleting the category.");
            }
        } catch (error) {
            toast.error(`Error deleting the category and related videos: ${error.message}`);
        }
    };
    
    
    
    
    

    return (
        <VideosContext.Provider value={{ data, addVideo, deleteVideo, updateVideo, addCategory, deleteCategory }}>
            {children}
        </VideosContext.Provider>
    );
}
