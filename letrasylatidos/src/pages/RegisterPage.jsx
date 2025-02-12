// RegisterPage.jsx

import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate('/home');
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <div className='bg-hero-pattern bg-cover bg-center min-h-screen w-screen bg-no-repeat bg-fixed'>
            <div className='flex h-auto lg:h-[calc(100vh-20px)] items-center justify-center px-4 py-6'>
                <div className='bg-white max-w-md w-full px-6 md:px-10 py-6 rounded-md shadow-lg overflow-y-auto max-h-[90vh]'>
                    <div className="flex justify-start items-center gap-3 m-3">
                        <img className="w-10 md:w-12" src="imgs/logo-lyl-petite.png" alt="Logo de Letras y Latidos" />
                        <h1 className="text-xl md:text-2xl font-bold font-sans mb-2">Registro</h1>
                    </div>
                    <NavLink to="/register" className={({ isActive }) =>
                        isActive
                            ? 'px-3 md:px-4 py-1 mb-4 mr-2 md:mr-4 rounded-full text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-blue-true focus:ring-opacity-50'
                            : 'px-3 md:px-4 py-1 mb-4 mr-2 md:mr-4 rounded-full text-blue bg-white border border-blue focus:outline-none focus:ring-1 focus:ring-offset-blue-true focus:ring-opacity-50'
                    }>
                        Alumnos
                    </NavLink>
                    <NavLink to="/register-teachers" className={({ isActive }) =>
                        isActive
                            ? 'px-3 md:px-4 py-1 mb-4 mr-2 md:mr-4 rounded-full text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-blue-true focus:ring-opacity-50'
                            : 'px-3 md:px-4 py-1 mb-4 mr-2 md:mr-4 rounded-full text-blue bg-white border border-blue focus:outline-none focus:ring-1 focus:ring-offset-blue-true focus:ring-opacity-50'
                    }>
                        Maestros
                    </NavLink>
                    {
                        registerErrors.map((error, i) => (
                            <div className='bg-red p-2 text-white text-center m-2 text-sm' key={i}>
                                {error}
                            </div>
                        ))
                    }
                    <form onSubmit={onSubmit} className="font-poppins">
                        <input type="text" {...register("username", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base' placeholder='Nombre de usuario'
                        />
                        {errors.username && (
                            <p className='text-red text-xs md:text-sm'>
                                El nombre de usuario es requerido
                            </p>
                        )}

                        <input type="text" {...register("realname", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base' placeholder='Nombre'
                        />
                        {errors.realname && (
                            <p className='text-red text-xs md:text-sm'>
                                El nombre es requerido
                            </p>
                        )}

                        <input type="text" {...register("lastname", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base' placeholder='Apellidos'
                        />
                        {errors.lastname && (
                            <p className='text-red text-xs md:text-sm'>
                                Los apellidos son requeridos
                            </p>
                        )}

                        <select {...register("grade", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base'>
                            <option value="1°">1°</option>
                            <option value="3°">3°</option>
                        </select>
                        {errors.grade && (
                            <p className='text-red text-xs md:text-sm'>
                                El semestre es requerido
                            </p>
                        )}

                        <select {...register("group", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base'>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="H">H</option>
                            <option value="I">I</option>
                            <option value="J">J</option>
                            <option value="K">K</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="N">N</option>
                        </select>
                        {errors.group && (
                            <p className='text-red text-xs md:text-sm'>
                                El grupo es requerido
                            </p>
                        )}

                        <input type="email" {...register("email", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base' placeholder='Correo institucional'
                        />
                        {errors.email && (
                            <p className='text-red text-xs md:text-sm'>
                                El email es requerido
                            </p>
                        )}

                        <input type="password" {...register("password", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base' placeholder='Contraseña'
                        />
                        {errors.password && (
                            <p className='text-red text-xs md:text-sm'>
                                La contraseña es requerida
                            </p>
                        )}

                        <input type="password" {...register("confirmPassword", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-3 md:px-4 py-2 rounded-md my-2 text-sm md:text-base' placeholder='Confirmar contraseña'
                        />
                        {errors.confirmPassword && (
                            <p className='text-red text-xs md:text-sm'>
                                Confirme la contraseña
                            </p>
                        )}

                        <button className='w-full px-4 py-2 mb-4 rounded-md my-2 text-white bg-indigo hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 text-sm md:text-base' type='submit'>
                            Registrar
                        </button>
                    </form>
                    <p className="flex gap-x-2 justify-between text-xs md:text-sm">
                        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-dark">Inicia sesión</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage;