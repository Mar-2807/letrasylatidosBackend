//LoginPage.jsx                                                                                                                                       import { useForm } from "react-hook-form"; 
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if(isAuthenticated) navigate('/home');
    }, [isAuthenticated])

    return (
        <div className="bg-hero-pattern bg-cover bg-center h-screen w-screen bg-no-repeat bg-fixed">
            <div className="flex h-[calc(100vh-100px)] items-center justify-center px-4 sm:px-10">
                <div className="bg-white max-w-md w-full p-6 sm:p-10 rounded-md shadow-lg">
                    <div className="flex justify-start items-center gap-3 mb-6">
                        <img className="w-10 sm:w-12" src="imgs/logo-lyl-petite.png" alt="Logo de Letras y Latidos" />
                        <h1 className="text-xl sm:text-2xl font-bold font-sans">Login</h1>
                    </div>
                    <div className="flex gap-2 mb-6">
                        <NavLink to="/login" className={({ isActive }) =>
                            isActive
                                ? 'px-4 py-2 text-sm sm:text-base rounded-full text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-blue-true focus:ring-opacity-50'
                                : 'px-4 py-2 text-sm sm:text-base rounded-full text-blue bg-white border border-blue focus:outline-none focus:ring-1 focus:ring-offset-blue-true focus:ring-opacity-50'
                        }>
                            Alumnos
                        </NavLink>
                        <NavLink to="/login-teachers" className={({ isActive }) =>
                            isActive
                                ? 'px-4 py-2 text-sm sm:text-base rounded-full text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-blue-true focus:ring-opacity-50'
                                : 'px-4 py-2 text-sm sm:text-base rounded-full text-blue bg-white border border-blue focus:outline-none focus:ring-1 focus:ring-offset-blue-true focus:ring-opacity-50'
                        }>
                            Maestros
                        </NavLink>
                    </div>

                    {
                        signinErrors.map((error, i) => (
                            <div className='bg-red p-2 text-white text-center mb-4 text-sm sm:text-base' key={i}>
                                {error}
                            </div>
                        ))
                    }

                    <form onSubmit={onSubmit} className="font-poppins">
                        <input type="email" {...register("email", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md mb-2 text-sm sm:text-base'
                            placeholder='Correo institucional'
                        />
                        {errors.email && (
                            <p className='text-red text-sm'>
                                El email es requerido
                            </p>
                        )}

                        <input type="password" {...register("password", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md mb-2 text-sm sm:text-base'
                            placeholder='Contraseña'
                        />
                        {errors.password && (
                            <p className='text-red text-sm'>
                                La constraseña es requerida
                            </p>
                        )}

                        <button type='submit' 
                            className="w-full px-4 py-2 rounded-md text-white bg-indigo hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 mb-4 text-sm sm:text-base">
                            Inicia sesión
                        </button>
                    </form>
                    <p className="text-sm sm:text-base text-center">
                        ¿No tienes una cuenta? <Link to="/register" className="text-blue-dark">Regístrate</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;