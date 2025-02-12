//ForosPage.jsx

import { useEffect } from "react";
import { useForos } from "../context/ForosContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import ForoCard from "../components/ForoCard";

function ForosPage() {
    const colors = ["bg-indigo", "bg-blue-jordy", "bg-orange", "bg-green"];
    const { getForos, getYourForos, searchForos, searchYourForos, foros, tusForos } = useForos();

    const [searchTitle, setSearchTitle] = useState("");
    const [searchYourTitle, setSearchYourTitle] = useState("");
    const [showYourAll, setShowYourAll] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const displayedTusForos = showYourAll ? tusForos : tusForos.slice(0, 6);
    const displayedForos = showAll ? foros : foros.slice(0, 6);

    const handleSearch = () => {
        searchForos(searchTitle); 
    };

    const handleSearchYours = () => {
        searchYourForos(searchYourTitle); 
    };

    useEffect(() => {
        getYourForos()
        getForos()
    }, []);

    return (
        <div className="px-4 sm:px-6 md:px-10 pb-10">
            <div>
                <img className="w-full h-auto" src="headers/header_foros.png" alt="¿A qué mundo viajarás hoy?" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-6 space-y-4 sm:space-y-0">
                <h1 className="text-xl sm:text-2xl font-bold"><i className="bi bi-bank">   </i>Tus foros</h1>
                <div className="flex items-center space-x-2">
                    <input type="text"
                        name="title"
                        value={searchYourTitle}
                        onChange={(e) => setSearchYourTitle(e.target.value)}
                        className="shadow-md focus:outline-none focus:ring-1 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md w-full sm:w-auto"
                        placeholder="Buscar foro por título" />
                    <button onClick={handleSearchYours}
                        className="px-4 py-2 rounded-md my-2 text-white bg-indigo hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50">                    
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>

            <div className="relative">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-gray rounded-sm p-4 transition-all duration-500 ease-in-out"
                    style={{
                        maxHeight: showYourAll ? "1000000px" : "600px",
                        overflow: "hidden",
                    }}
                >
                    {tusForos.length === 0 ? (<h1 className="font-poppins col-span-full text-center">No has sido añadido a ningún foro</h1>) : (
                        displayedTusForos.map((foro, index) => (
                            <Link to={`/foros/${foro._id}`} key={foro._id}>
                                <ForoCard foro={foro} index={index} key={foro._id}/>
                            </Link>
                        ))
                    )}
                </div>
                <div className="flex flex-row-reverse">
                    {tusForos.length > 6 && (
                        <div className="flex justify-center mt-4">
                             <button
                                onClick={() => setShowYourAll(!showYourAll)}
                                className="absolute -bottom-4 right-0 px-4 py-2 rounded-md bg-indigo text-white hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 shadow-lg"
                            >
                                {showYourAll ? "Ver menos" : "Ver todos"}
                            </button>

                        </div>
                    )}
                </div>

            </div>

            <hr className="my-10 text-gray" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 space-y-4 sm:space-y-0">
                <h1 className="text-xl sm:text-2xl font-bold"><i className="bi bi-compass">   </i>Explora nuevos foros</h1>
                <div className="flex items-center space-x-2">
                    <input type="text"
                        name="title"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        className="shadow-md focus:outline-none focus:ring-1 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md w-full sm:w-auto"
                        placeholder="Buscar foro por título" />
                    <button onClick={handleSearch}
                        className="px-4 py-2 rounded-md my-2 text-white bg-indigo hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50"
                    ><i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
            <div className="relative">
                <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white-gray rounded-sm p-4 transition-all duration-500 ease-in-out"                    style={{
                        maxHeight: showAll ? "4000px" : "2600px",
                        overflow: "hidden",
                    }}>
                    {foros.length === 0 ? (<h1 className="font-poppins col-span-full text-center">No hay foros</h1>) : (
                        displayedForos.map((foro, index) => (
                            <Link to={`/foros/${foro._id}`} key={foro._id}>
                                <div
                                    className={`font-poppins text-white shadow-md p-10 rounded-md overflow-hidden bg-no-repeat ${colors[index % colors.length]}`}
                                >
                                    <h1 className="text-lg font-bold">{foro.bookTitle}</h1>
                                    <p className="text-base">― {foro.author}</p>
                                    <p className="text-sm mt-1">{foro.grade}- {foro.group}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                <div className="flex flex-row-reverse">
                    {foros.length > 6 && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="absolute -bottom-4 right-0 px-4 py-2 rounded-md bg-indigo text-white hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50"
                            >
                                {showAll ? "Ver menos" : "Ver todos"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForosPage