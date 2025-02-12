// Foro Page
import { useForos } from "../context/ForosContext"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ForoActivity from "../components/ForoActivity";
import ForoAbout from "../components/ForoAbout";
import ForoLive from "../components/ForoLive";
import ForoComments from "../components/ForoComments";
import ForoBookCard from "../components/ForoBookCard";

function ForoPage() {
    const { isTeacher } = useAuth();
    const [activeTab, setActiveTab] = useState("book");
    const { getForo, foro, createActivity, errors: globalErrors } = useForos();
    const bgImage = ["bg-foro-aventura", "bg-foro-ciencia-ficcion", "bg-foro-contemporaneo", "bg-foro-fantasia", "bg-foro-juvenil", "bg-foro-novela", "bg-foro-policiaco", "bg-foro-poesia", "bg-foro-romance", "bg-foro-sup-personal", "bg-foro-terror",
    ];

    const params = useParams();
    const foroBookTitle = foro.bookTitle;

    useEffect(() => {
        getForo(params.id);
    }, []);

    var genreType = 10;
    if (foro.genre == "Aventura") {
        genreType = 0;
    }
    if (foro.genre == "Ciencia Ficción") {
        genreType = 1;
    }
    if (foro.genre == "Contemporáneo") {
        genreType = 2;
    }
    if (foro.genre == "Fantasía") {
        genreType = 3;
    }
    if (foro.genre == "Juvenil") {
        genreType = 4;
    }
    if (foro.genre == "Novela") {
        genreType = 5;
    }
    if (foro.genre == "Policíaco") {
        genreType = 6;
    }
    if (foro.genre == "Poesía") {
        genreType = 7;
    }
    if (foro.genre == "Romance") {
        genreType = 8;
    }
    if (foro.genre == "Superación personal") {
        genreType = 9;
    }
    if (foro.genre == "Terror") {
        genreType = 10;
    }

    return (
        <div className="m-4 sm:m-6 md:m-8 lg:m-10 font-poppins">

            <div className={`flex mb-5 ${bgImage[genreType]} p-8 sm:p-16 lg:p-24 text-white justify-center`}>
                <h1 className="font-merriweather text-3xl sm:text-4xl md:text-5xl mb-6 text-center">{foro.grade} - {foro.group}</h1>
            </div>

            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <ul className="flex flex-wrap justify-center sm:justify-start space-x-2 sm:space-x-4">
                    <li
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === "book" ? "bg-blue text-white" : "bg-white text-black"}`}
                        onClick={() => setActiveTab("book")}
                    >
                        Libro asignado
                    </li>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === "comments" ? "bg-blue text-white" : "bg-white text-black"}`}
                        onClick={() => setActiveTab("comments")}
                    >
                        Comentarios
                    </li>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === "activities" ? "bg-blue text-white" : "bg-white text-black"}`}
                        onClick={() => setActiveTab("activities")}
                    >
                        Actividades
                    </li>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === "live" ? "bg-blue text-white" : "bg-white text-black"}`}
                        onClick={() => setActiveTab("live")}
                    >
                        Foro en vivo
                    </li>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === "about" ? "bg-blue text-white" : "bg-white text-black"}`}
                        onClick={() => setActiveTab("about")}
                    >
                        Acerca del foro
                    </li>
                </ul>
            </div>

            <div id="components" className="p-2 sm:p-4">
                {activeTab === "book" && <ForoBookCard foro={foro} foroBookTitle={foroBookTitle} />}

                {activeTab === "comments" && (
                    <ForoComments 
                        foroId={params.id}
                        postCommentErrors={globalErrors}
                    />
                )}

                {activeTab === "activities" && (
                    <ForoActivity
                        foroId={params.id}
                        isTeacher={isTeacher}
                        createActivity={createActivity}
                        createActivityErrors={globalErrors}
                    />
                )}

                {activeTab === "live" && (
                    <ForoLive
                        foroId={params.id}
                        createLiveErrors={globalErrors}
                    />
                )}
                
                {activeTab === "about" && 
                    <ForoAbout 
                        foro={foro} 
                    />
                }
            </div>
        </div>
    )
}

export default ForoPage;