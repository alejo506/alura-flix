import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify"; // Importa toast

export const VideosContext = createContext();
VideosContext.displayName = "Videos";

const api_url_videos = `https://67578164c0a427baf94ce4eb.mockapi.io/videos`;
const api_url_categories = `https://67578164c0a427baf94ce4eb.mockapi.io/categories`

export default function VideosProvider({ children }) {
    const [data, setData] = useState({
        categories: [],
        videos: []
    });

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
            const response = await fetch(api_url_categories);
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
            // Formatear el nombre de la categoría
            const formattedName = newCategory.nombre.trim();
            const formattedCategory = {
                ...newCategory,
                nombre: formattedName.charAt(0).toUpperCase() + formattedName.slice(1).toLowerCase(),
            };
    
            // Validar si la categoría ya existe
            if (data.categories.some(cat => cat.nombre.toLowerCase() === formattedCategory.nombre.toLowerCase())) {
                return toast.error("This category already exists.");
            }
    
            // Agregar la nueva categoría
            const response = await fetch(api_url_categories, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedCategory),
            });
    
            if (!response.ok) throw new Error("Failed to add category.");
    
            const addedCategory = await response.json();
    
            // Actualizar el estado
            setData(prevData => ({
                ...prevData,
                categories: [...prevData.categories, addedCategory],
            }));
    
            toast.success("Category added successfully!");
        } catch (error) {
            toast.error(`Error adding category: ${error.message}`);
        }
    };
    

    const deleteCategory = async (categoryId) => {
        try {
            // Encontrar la categoría y verificar si existe
            const category = data.categories.find((cat) => cat.id === categoryId);
            if (!category) {
                toast.error("Category not found.");
                return;
            }
    
            // Filtrar y eliminar los videos relacionados
            const videosToDelete = data.videos.filter((video) => video.categoria === category.nombre);
            await Promise.all(
                videosToDelete.map((video) =>
                    fetch(`${api_url_videos}/${video.id}`, { method: "DELETE" })
                )
            );
    
            // Eliminar la categoría
            const response = await fetch(`${api_url_categories}/${categoryId}`, {
                method: "DELETE",
            });
    
            if (!response.ok) throw new Error("Failed to delete category.");
    
            // Actualizar el estado local
            setData((prevData) => ({
                ...prevData,
                categories: prevData.categories.filter((cat) => cat.id !== categoryId),
                videos: prevData.videos.filter((video) => video.categoria !== category.nombre),
            }));
    
            toast.success("Category and related videos deleted successfully!");
        } catch (error) {
            toast.error(`Error deleting category: ${error.message}`);
        }
    };
    
    

    const updateCategoryColor = async (categoryId, newColor) => {
        try {
            // Actualizar el color en el servidor
            const response = await fetch(`${api_url_categories}/${categoryId}`, {
                method: "PUT", // Usa "PATCH" si la API lo permite
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ color: newColor }),
            });
    
            if (!response.ok) throw new Error("Failed to update category color.");
    
            // Actualizar el estado local
            setData((prevData) => ({
                ...prevData,
                categories: prevData.categories.map((cat) =>
                    cat.id === categoryId ? { ...cat, color: newColor } : cat
                ),
            }));
    
            // toast.success("Category color updated successfully!");
        } catch (error) {
            toast.error(`Error updating category color: ${error.message}`);
        }
    };
    
    
    
    
    
    

    return (
        <VideosContext.Provider value={{ data, addVideo, deleteVideo, updateVideo, addCategory, deleteCategory, updateCategoryColor }}>
            {children}
        </VideosContext.Provider>
    );
}
