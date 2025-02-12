// RegisterTeachersPage.jsx

import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function RegisterTeachersPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { signupT, isAuthenticated, errors: registerTeachersErrors } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate('/home');
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signupT(values);
    });

    return (
        <div className='bg-hero-pattern bg-cover bg-center h-screen w-screen bg-no-repeat bg-fixed'>
            <div className='flex h-[calc(100vh-20px)] items-center justify-center px-4 sm:px-6 lg:px-8'>
                <div className='bg-white max-w-md w-full px-6 sm:px-10 py-6 rounded-md shadow-lg overflow-y-auto max-h-[80vh]'>
                    <div className="flex justify-start items-center gap-3 m-3">
                        <img className="w-12" src="imgs/logo-lyl-petite.png" alt="Logo de Letras y Latidos" />
                        <h1 className="text-2xl font-bold font-sans mb-2">Registro</h1>
                    </div>
                    <NavLink to="/register" className={({ isActive }) =>
                        isActive
                            ? 'px-4 py-1 mb-4 mr-4 rounded-full text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-blue-true focus:ring-opacity-50'
                            : 'px-4 py-1 mb-4 mr-4 rounded-full text-blue bg-white border border-blue focus:outline-none focus:ring-1 focus:ring-offset-blue-true focus:ring-opacity-50'
                    }>
                        Alumnos
                    </NavLink>
                    <NavLink to="/register-teachers" className={({ isActive }) =>
                        isActive
                            ? 'px-4 py-1 mb-4 mr-4 rounded-full text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-blue-true focus:ring-opacity-50'
                            : 'px-4 py-1 mb-4 mr-4 rounded-full text-blue bg-white border border-blue focus:outline-none focus:ring-1 focus:ring-offset-blue-true focus:ring-opacity-50'
                    }>
                        Maestros
                    </NavLink>
                    {
                        registerTeachersErrors.map((error, i) => (
                            <div className='bg-red p-2 text-white text-center m-2' key={i}>
                                {error}
                            </div>
                        ))
                    }
                    <form onSubmit={onSubmit} className="font-poppins">
                        <input type="text" {...register("username", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Nombre de usuario'
                        />
                        <div className={`transition-all duration-300 ${errors.username ? 'h-6' : 'h-0'}`}>
                            {errors.username && (
                                <p className='text-red'>
                                    El nombre de usuario es requerido
                                </p>
                            )}
                        </div>

                        <input type="text" {...register("realname", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Nombre'
                        />
                        <div className={`transition-all duration-300 ${errors.realname ? 'h-6' : 'h-0'}`}>

                            {errors.realname && (
                                <p className='text-red'>
                                    El nombre es requerido
                                </p>
                            )}
                        </div>

                        <input type="text" {...register("lastname", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Apellidos'
                        />
                        <div className={`transition-all duration-300 ${errors.lastname ? 'h-6' : 'h-0'}`}>

                            {errors.lastname && (
                                <p className='text-red'>
                                    Los apellidos son requeridos
                                </p>
                            )}
                        </div>

                        <input type="email" {...register("email", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Correo institucional'
                        />
                        <div className={`transition-all duration-300 ${errors.email ? 'h-6' : 'h-0'}`}>

                            {errors.email && (
                                <p className='text-red'>
                                    El email es requerido
                                </p>
                            )}
                        </div>

                        <input type="password" {...register("password", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Contraseña'
                        />
                        <div className={`transition-all duration-300 ${errors.password ? 'h-6' : 'h-0'}`}>
                            {errors.password && (
                                <p className='text-red'>
                                    La constraseña es requerida
                                </p>
                            )}
                        </div>

                        <input type="password" {...register("confirmPassword", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Confirmar contraseña'
                        />
                        <div className={`transition-all duration-300 ${errors.confirmPassword ? 'h-6' : 'h-0'}`}>
                            {errors.confirmPassword && (
                                <p className='text-red'>
                                    Confirme la contraseña
                                </p>
                            )}
                        </div>

                        <button className='px-4 py-2 mb-4 rounded-md my-2 text-white bg-indigo hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 w-full sm:w-auto' type='submit'>
                            Registrar
                        </button>
                    </form>
                    <p className="flex gap-x-2 justify-between">
                        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-dark">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterTeachersPage;