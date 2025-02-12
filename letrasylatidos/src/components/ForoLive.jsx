//Foro Live
import { useState } from "react"
import { get, useForm } from "react-hook-form";
import { useForos } from "../context/ForosContext";
import { useAuth } from "../context/AuthContext";

import { useEffect } from "react";

function ForoLive({ foroId, createLiveErrors }) {
    const [isCreator, setIsCreator] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const { createLive, getLive, foro, live, deleteLive, editLive } = useForos();
    const { user } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        if (isEditing) {
            editLive(data, foroId);
            reset();
            getLive(foroId);
            setIsEditing(false);
        } else {
            await createLive(data, foroId);
        }
        await getLive(foroId);
    });

    useEffect(() => {
        async function loadLive() {
            if (isEditing) {
                await getLive(foroId);
                setValue('days', live.days);
                setValue('time', live.time);
                setValue('link', live.link);
            }
        }
        loadLive();
        getLive(foroId);
        if (user.id === foro.createdBy._id) {
            setIsCreator(true);
        }
    }, [isEditing]);

    return (
        <div id="live" className="p-4 sm:p-6 lg:p-8">

            {isCreator && (live === null || isEditing) ? (<>
                <div className="shadow-md rounded-md mb-6 bg-white w-full">
                    <div
                        id="live-header"
                        className="p-4 bg-indigo text-white font-semibold rounded-t-md"
                    >
                        <h1 className="text-lg sm:text-xl">CREAR FORO EN VIVO</h1>
                    </div>
                    {
                        createLiveErrors.map((error, i) => (
                            <div className='bg-red p-2 text-white text-center m-2' key={i}>
                                {error}
                            </div>
                        ))
                    }
                    <form className="px-3 sm:px-5 pt-2" onSubmit={onSubmit}>
                        <p className="text-base sm:text-lg mb-2">Día de la reunión </p>
                        <div className="flex flex-wrap gap-4 border border-white shadow-md rounded-md p-3 sm:p-5">
                            {["Lunes  ", "Martes  ", "Miércoles  ", "Jueves  ", "Viernes  ", "Sábado  ", "Domingo  "].map((dia) => (
                                <label key={dia} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        {...register('days', { required: true })}
                                        type="radio"
                                        value={dia}
                                        className="w-4 h-4 sm:w-5 sm:h-5 bg-gray border-gray rounded-md focus:ring-1 focus:ring-blue-jordy"
                                    />
                                    <span className="text-sm sm:text-base">{dia}</span>
                                </label>
                            ))}
                        </div>
                        <div className={`transition-all duration-300 ${errors.days ? 'h-6' : 'h-0'}`}>
                            {errors.days && (
                                <p className='text-red text-sm'>
                                    Seleccione el día para el foro en línea
                                </p>
                            )}
                        </div>

                        <p className="text-base sm:text-lg mt-2">Establece la hora de inicio </p>
                        <input
                            name="time"
                            {...register('time', { required: true })}
                            className="border border-white shadow-md mt-2 w-full block p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-jordy focus:border-blue"
                            type="time"
                        />
                        <div className={`transition-all duration-300 ${errors.time ? 'h-6' : 'h-0'}`}>
                            {errors.time && (
                                <p className='text-red text-sm'>
                                    El horario es requerido
                                </p>
                            )}
                        </div>

                        <p className="text-base sm:text-lg mt-2">Ingresa el link para la reunión en vivo</p>
                        <input
                            {...register('link', { required: true })}
                            name="link"
                            className="my-2 w-full block p-2 border border-white shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-jordy focus:border-blue"
                            type="text" placeholder="Link"
                        />
                        <div className={`transition-all duration-300 ${errors.link ? 'h-6' : 'h-0'}`}>
                            {errors.link && (
                                <p className='text-red text-sm'>
                                    El link del foro es requerido
                                </p>
                            )}
                        </div>

                        <button className='px-4 py-2 mb-4 rounded-md my-2 text-white bg-blue hover:bg-blue-true focus:outline-none focus:ring-2 focus:ring-blue focus:ring-opacity-50'
                            type='submit'
                        >
                            Establecer horario
                        </button>
                    </form>
                </div>
            </>) : (<></>)
            }

            <div className="shadow-md rounded-md mb-6 bg-white w-full">
                <div
                    id="live-header"
                    className="p-4 bg-indigo text-white flex justify-between font-semibold rounded-t-md"
                >
                    <h1 className="text-lg sm:text-xl">FORO EN VIVO</h1>
                    {
                        isCreator && live !== null ? (<>
                            <div className="flex gap-4 sm:gap-6">
                                <button onClick={async () => {
                                    setIsEditing(true);
                                }}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>

                                <button onClick={async () => {
                                    await deleteLive(live._id);
                                    getLive(foroId);
                                }}>
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </div>
                        </>) : (<></>)
                    }
                </div>
                {live !== null ? (<>
                    <div id="live-body" className="p-4">
                        <h3 className="font-semibold text-base sm:text-lg">Horario</h3>
                        <p className="my-2 text-sm sm:text-base">{live.days}</p>
                        <p className="my-2 text-sm sm:text-base">{live.time}</p>
                        <a href={live.link}>
                            <button className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-true text-sm sm:text-base">
                                Unirme
                            </button>
                        </a>
                    </div>
                </>) : (<>
                    <div className="flex justify-center">
                        <h1 className="py-5 text-sm sm:text-base">Aún no se ha creado un foro en vivo</h1>
                    </div>
                </>)}
            </div>
        </div>
    )
}

export default ForoLive;