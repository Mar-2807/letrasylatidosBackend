// ForoActivity
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import { useForos } from "../context/ForosContext";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function ForoActivity({ createActivity, createActivityErrors, foroId }) {
    const [isCreator, setIsCreator] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { getActivities, activities, deleteActivity, foro } = useForos();
    const { user } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        await createActivity(data, foroId);
        reset();
        getActivities(foroId);
    });

    useEffect(() => {
        getActivities(foroId);
        if (user.id === foro.createdBy._id) {
            setIsCreator(true);
        }
    }, []);

    return (
        <div id="activity">
            {isCreator ? (
                <div className="shadow-md rounded-md mb-6 bg-white w-full">
                    <div id="activity-header" className="p-4 bg-indigo text-white font-semibold rounded-t-md">
                        <h2 className="text-xl text-center md:text-left">CREAR ACTIVIDAD</h2>
                    </div>
                    {createActivityErrors.map((error, i) => (
                        <div className="bg-red p-2 text-white text-center m-2" key={i}>
                            {error}
                        </div>
                    ))}
                    <form onSubmit={onSubmit} className="px-5 pt-2">
                        <input
                            className="w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2"
                            type="text"
                            placeholder="Nombre de la actividad"
                            {...register("activityName", { required: true })}
                        />
                        <div className={`transition-all duration-300 ${errors.activityName ? "h-6" : "h-0"}`}>
                            {errors.activityName && (
                                <p className="text-red">El nombre de la actividad es requerido</p>
                            )}
                        </div>
                        <textarea
                            className="w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2"
                            type="text"
                            placeholder="Descripción de la actividad"
                            {...register("activityDescription", { required: true })}
                        />
                        <div className={`transition-all duration-300 ${errors.activityDescription ? "h-6" : "h-0"}`}>
                            {errors.activityDescription && (
                                <p className="text-red">La descripción de la actividad es requerida</p>
                            )}
                        </div>
                        <p className="text-center md:text-left">Fecha de entrega:</p>
                        <input
                            className="w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2"
                            type="date"
                            {...register("deadline", { required: true })}
                        />
                        <div className={`transition-all duration-300 ${errors.deadline ? "h-6" : "h-0"}`}>
                            {errors.deadline && (
                                <p className="text-red">La fecha de entrega es requerida</p>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="px-12 py-2 mb-4 rounded-md my-2 text-white bg-blue hover:bg-blue-true focus:outline-none focus:ring-2 focus:ring-blue focus:ring-opacity-50"
                                type="submit"
                            >
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <></>
            )}

            <div className="shadow-md rounded-md mb-6 bg-white w-full">
                <div id="activity-header" className="p-4 bg-indigo text-white font-semibold rounded-t-md">
                    <h2 className="text-xl text-center md:text-left">ACTIVIDADES</h2>
                </div>
                <div
                    id="activity-body"
                    className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {activities.length === 0 ? (
                        <h1 className="font-poppins col-span-full text-center text-gray-700">
                            No hay actividades
                        </h1>
                    ) : (
                        activities.map((activity) => (
                            <div
                                key={activity._id}
                                className="bg-white text-black shadow-md rounded-md overflow-hidden flex flex-col"
                            >
                                <div className="flex justify-between px-5 py-3 bg-blue text-white">
                                    <p className="text-lg font-semibold text-center sm:text-left">{activity.activityName}</p>
                                    {isCreator ? (
                                        <button
                                            onClick={async () => {
                                                await deleteActivity(activity._id);
                                                getActivities(foroId);
                                            }}
                                        >
                                            <i className="bi bi-trash3 rounded-s-full"></i>
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div className="px-5 py-4 flex-grow">
                                    <p className="text-gray-700 text-center sm:text-left">{activity.activityDescription}</p>
                                </div>

                                <div className="px-5 py-2 bg-gray-100 text-gray-600 text-sm flex justify-center sm:justify-end">
                                    <p>
                                        Fecha de entrega:{" "}
                                        {format(new Date(activity.deadline), "dd 'de' MMMM 'de' yyyy", {
                                            locale: es,
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForoActivity;