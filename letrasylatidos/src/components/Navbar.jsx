import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout, isTeacher, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    if (!isAuthenticated) return null; // No mostrar navbar si no está autenticado

    const links = [
        { to: "/home", label: "Inicio", icon: "bi-house" },
        { to: "/foros", label: "Foros", icon: "bi-chat-square" },
        ...(isTeacher ? [{ to: "/crear-foro", label: "Crear foro", icon: "bi-plus-circle" }] : []),
        { to: "/profile", label: "Perfil", icon: "bi-person-circle" },
    ];

    return (
        <nav className="bg-white shadow-md mb-2">
            <div className="max-w-full sm:mx-auto lg:mx-4 px-4 sm:px-6 lg:px-8 items-center">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/home" className="flex items-center gap-3">
                        <img className="w-10" src="/imgs/logo-lyl-petite.png" alt="Logo" />
                        <h1 className="font-playwrite text-2xl">Letras y Latidos</h1>
                    </Link>

                    {/* Botón menú hamburguesa en móviles */}
                    <button
                        className="lg:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <i className="bi bi-list-nested"></i> : <i className="bi bi-list"></i>}
                    </button>

                    {/* Menú (Oculto en móviles, visible en pantallas grandes) */}
                    <ul className="hidden lg:flex gap-4 items-center">
                        {links.map(({ to, label, icon }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `px-6 py-2 rounded-full transition ${isActive
                                            ? "bg-white text-blue border border-blue"
                                            : "bg-blue text-white hover:bg-blue-true"
                                        }`
                                    }
                                >
                                    <i className={`bi ${icon} mr-2`}></i>{label}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={logout}
                                className="px-6 py-1 rounded-full bg-blue text-white hover:bg-blue-true"
                            >
                                <i className="bi bi-box-arrow-in-right mr-2"></i>Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Menú móvil (solo visible si menuOpen es true) */}
                {menuOpen && (
                    <div className="lg:hidden bg-gray-100 shadow-md rounded-lg">
                        <ul className="flex flex-col gap-3 py-4">
                            {links.map(({ to, label, icon }) => (
                                <li key={to} className="text-center">
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `block py-2 text-lg ${isActive ? "text-blue font-bold" : "text-dark-gray hover:text-blue-true"
                                            }`
                                        }
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <i className={`bi ${icon} mr-2`}></i>{label}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="text-center">
                                <button
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                    className="py-2 text-red"
                                >
                                    <i className="bi bi-box-arrow-in-right mr-2"></i>Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
