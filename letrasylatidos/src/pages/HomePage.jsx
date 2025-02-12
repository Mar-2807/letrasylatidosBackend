// Home
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBooks from "../components/SearchBooks";
import { useAuth } from "../context/AuthContext";
import { API_URL } from '../../config.js';

function HomePage() {
    const { user } = useAuth();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [topBooks, setTopBooks] = useState([]);

    const images = [
        "headers/0.png",
        "headers/1.png",
        "headers/2.png",
        "headers/3.png",
        "headers/4.png",
        "headers/5.png",
        "headers/6.png",
        "headers/7.png",
        "headers/8.png",
      ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000); 

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        async function fetchTopBooks() {
            try {
                const { data } = await axios.get(`${API_URL}/top-books`, { withCredentials: true });
                setTopBooks(data);
            } catch (error) {
                console.error("Error al obtener libros populares:", error);
            }
        }
        fetchTopBooks();
    }, []);

    return (
        <div className="flex items-center justify-center m-4 md:m-6 lg:m-10">
            <div className="flex-col w-full">
                <div className="mx-4 md:mx-6 lg:mx-10">
                    <div className="relative w-full h-auto overflow-hidden">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Imagen ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                        />
                    </div>
                    <h1 className="font-poppins text-lg md:text-xl lg:text-2xl mt-4 mb-2">
                        Hola {user.realname}
                    </h1>
                    <hr className="text-gray border-2 rounded-sm" />
                    <h1 className="text-xl md:text-2xl lg:text-2xl font-bold my-5">
                        <i className="bi bi-star"> </i> Más populares entre nuestros usuarios
                    </h1>
                    
                    <div id="top" className="bg-creme font-poppins grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 rounded-md p-4 md:p-6">
                        {topBooks.length > 0 ? (
                            topBooks.map((book, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                                    {book.cover && (
                                        <img
                                            src={book.cover}
                                            alt={book.title}
                                            className="my-3 w-full h-32 sm:h-40 md:h-48 object-cover mb-2 rounded"
                                        />
                                    )}
                                    <h2 className="text-sm md:text-lg font-semibold">
                                        {book.title}
                                    </h2>
                                    <div className="flex justify-between mt-4">
                                        <p className="text-gray-600 text-xs md:text-sm">
                                            Likes: {book.likeCount}
                                        </p>
                                        <a
                                            href={book.url}
                                            target="_blank"
                                            className="bg-blue text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded hover:bg-blue-true"
                                        >
                                            Leer
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay libros populares aún.</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-8 mb-4">
                        <h1 className="text-xl md:text-2xl font-bold">
                            <i className="bi bi-book"></i> Libros
                        </h1>
                    </div>

                    <SearchBooks />
                </div>
            </div>
        </div>
    );
}

export default HomePage;