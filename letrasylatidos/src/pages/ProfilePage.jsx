// Profile
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from "react";
import { useState } from "react";

function ProfilePage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();
    const { isTeacher, user, editUser } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        await editUser(data);
    });

    useEffect(() => {
        function getUserData() {
            setValue('username', user.username);
            setValue('realname', user.realname);
            setValue('lastname', user.lastname);
            if (!isTeacher) {
                setValue('grade', user.grade);
                setValue('group', user.group);
            }
            setValue('email', user.email);
        }
        getUserData();
    }, []);

    return (
        <div>
            <div className="bg-hero-pattern2 bg-cover bg-center h-screen w-screen bg-no-repeat bg-fixed">
                <div className="flex h-[calc(100vh-150px)] justify-center items-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-white max-w-md w-full px-10 py-6 rounded-md shadow-lg overflow-y-auto max-h-[75vh]">
                        <div className='text-2xl flex gap-3'>
                            <i className="bi bi-person"></i>
                            <h1 className="font-bold font-sans mb-2">Editar perfil</h1>
                        </div>
                        <form onSubmit={onSubmit}>
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

                            {!isTeacher ? (<>
                                <select {...register("grade", { required: true })}
                                    className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Semestre'>
                                    <option value="1°">1°</option>
                                    <option value="3°">3°</option>
                                </select>
                                <div className={`transition-all duration-300 ${errors.grade ? 'h-6' : 'h-0'}`}>
                                    {errors.grade && (
                                        <p className='text-red'>
                                            El semestre es requerido
                                        </p>
                                    )}
                                </div>

                                <select {...register("group", { required: true })}
                                    className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Grupo'>
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
                                <div className={`transition-all duration-300 ${errors.group ? 'h-6' : 'h-0'}`}>
                                    {errors.group && (
                                        <p className='text-red'>
                                            El grupo es requerido
                                        </p>
                                    )}
                                </div></>) : (<></>)}

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

                            <button className='px-4 py-2 mb-4 rounded-md my-2 text-white bg-indigo hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50' type='submit'>
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage