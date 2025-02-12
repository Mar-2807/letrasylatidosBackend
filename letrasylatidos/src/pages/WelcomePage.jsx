// WelcomePage.jsx

import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div className="bg-hero-pattern bg-cover bg-center h-screen w-screen bg-no-repeat bg-fixed">
            <div className="flex h-[calc(100vh-50px)] items-center justify-center">
                <div className="md:w-auto mx-auto p-0 bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3 w-full flex flex-col gap-2 p-4 md:pl-4">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <img className="w-12 h-12 p-0" src="/imgs/logo-lyl-petite.png" alt="Logo" />
                            <h1 className="font-playwrite text-center md:text-left">Letras y Latidos</h1>
                        </div>

                        <Link to="/login">
                            <button className='w-full bg-indigo text-white px-4 py-2 rounded-md my-2 hover:bg-indigo-dark'>
                                Inicia sesión
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className='w-full bg-indigo text-white px-4 py-2 rounded-md my-2 hover:bg-indigo-dark'>
                                Regístrate
                            </button>
                        </Link>

                        <Link to="/">
                            <button className='w-full bg-indigo text-white px-4 py-2 rounded-md my-2 hover:bg-indigo-dark'>
                                Sobre nosotros
                            </button>
                        </Link>

                        <Link to="/">
                            <button className='w-full bg-indigo text-white px-4 py-2 rounded-md my-2 hover:bg-indigo-dark'>
                                Contacto
                            </button>
                        </Link>
                    </div>
                    <div className="md:w-1/3 w-full">
                        <img src="/imgs/side-img-welcome.gif" alt="Logo" className="h-40 md:h-full mx-auto md:mx-0" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;