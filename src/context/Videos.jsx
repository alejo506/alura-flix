import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";


// Creamos el contexto
export const VideosContext = createContext();
VideosContext.displayName = "Videos";


const api_url_videos = `https://67578164c0a427baf94ce4eb.mockapi.io/videos`;

// Componente proveedor del contexto
export default function VideosProvider({ children }) {

    const [data, setData] = useState({
        categories: [],
        videos: []
    });


    console.log(data);


    // No se agrega el method: Get porque es el metodo predeterminado del fetch
    const fetchVideos = async () => {
        try {
            const response = await fetch(api_url_videos);
            const videos = await response.json();

            // Aquí puedes actualizar el estado para los videos
            setData(prevData => ({
                ...prevData,
                videos: videos
            }));
        } catch (error) {
            console.error("Error al obtener los videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);


    const fetchCategories = async () => {
        try {
            const response = await fetch('https://67578164c0a427baf94ce4eb.mockapi.io/categories');
            const categories = await response.json();

            // Aquí puedes actualizar el estado para las categorías
            setData(prevData => ({
                ...prevData,
                categories: categories
            }));
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);



    const addVideo = async (newVideo) => {
        try {
            const response = await fetch(api_url_videos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newVideo)
            });

            const addedVideo = await response.json();

            // Actualizamos el estado local
            setData(prevData => ({
                ...prevData,
                // videos: [...prevData.videos, { ...addedVideo, id: uuid() }]  // Agregamos el nuevo video
                videos: [...prevData.videos, addedVideo]  // Agregamos el nuevo video
            }));
        } catch (error) {
            console.error("Error al agregar el video:", error);
        }
    };


    const deleteVideo = async (id) => {
        try {
            const response = await fetch(`https://67578164c0a427baf94ce4eb.mockapi.io/videos/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Filtrar los videos que no tienen el id que queremos eliminar
                const newVideos = data.videos.filter((video) => video.id !== id);

                // Actualizar el estado con la lista de videos filtrados
                setData(prevData => ({
                    ...prevData,
                    videos: newVideos, // Actualizamos la lista de videos eliminando el video con el id
                }));
            } else {
                console.error("Error al eliminar el video:", response.statusText);
            }
        } catch (error) {
            console.error("Error durante la eliminación", error);
        }
    };


    const updateVideo = async (updatedVideo) => {

        try {
            const response = await fetch(`https://67578164c0a427baf94ce4eb.mockapi.io/videos/${updatedVideo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(updatedVideo)
            });

            const result = await response.json();

            //Actualizar el estado local
            setData(prevData => ({
                ...prevData,
                videos: prevData.videos.map((video) =>
                    video.id === result.id ? { ...video, ...updatedVideo } : video
                )
            }));
        } catch (error) {
            console.error("Error al actualizar el video", error);

        }
    }



    // !TODO: Descomentar cuando se implemente la logica y dise;o para agregar categoria
    const addCategory = async (newCategory) => {
        try {

            // Convertir la primera letra a mayúscula y el resto a minúscula
            const formattedCategory = {
                ...newCategory,
                nombre: newCategory.nombre[0].toUpperCase() + newCategory.nombre.slice(1).toLowerCase(),
            };

            const response = await fetch('https://67578164c0a427baf94ce4eb.mockapi.io/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedCategory)
            });

            const addedCategory = await response.json();

            // Actualizamos el estado local
            setData({
                ...data,
                categories: [...data.categories, addedCategory],
            });
        } catch (error) {
            console.error("Error al agregar la categoría:", error);
        }
    };



    return (
        <VideosContext.Provider value={{ data, addVideo, deleteVideo, updateVideo, addCategory }}>
            {children}
        </VideosContext.Provider>

    )
};


