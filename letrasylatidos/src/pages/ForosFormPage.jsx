//ForosFormPage.jsx.         import { useForm } from "react-hook-form";
import { useForos } from "../context/ForosContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ForosFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createForo, isCreated, setIsCreated, errors: createForoErrors } = useForos();
    const navigate = useNavigate();

    useEffect(() => {
        if (isCreated) navigate('/foros');
        setIsCreated(false);
    }, [isCreated]);

    const onSubmit = handleSubmit((data) => {
        createForo(data);
    });

    return (
        <div className="bg-hero-pattern2 bg-cover bg-center min-h-screen bg-no-repeat bg-fixed">

            <div className="flex min-h-[calc(100vh-150px)] items-center justify-center p-4 sm:p-8">
                <div className="bg-white max-w-md w-full px-6 sm:px-10 py-6 rounded-md shadow-lg overflow-y-auto max-h-[75vh]">
                    <h1 className="text-2xl font-bold font-sans mb-2 text-center">Crear foro</h1>
                    {
                        createForoErrors.map((error, i) => (
                            <div className='bg-red p-2 text-white text-center m-2' key={i}>
                                {error}
                            </div>
                        ))
                    }
                    <form onSubmit={onSubmit} className="font-poppins">
                        <p className="my-2">Libro a trabajar:</p>
                        <input
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2'
                            type="text" placeholder="Título"
                            {...register('bookTitle', { required: true })}
                            autoFocus
                        />
                        <div className={`transition-all duration-300 ${errors.bookTitle ? 'h-6' : 'h-0'}`}>
                            {errors.bookTitle && (
                                <p className='text-red'>
                                    El título del libro es requerido
                                </p>
                            )}
                        </div>
                        <input
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2'
                            type="text" placeholder="Autor"
                            {...register('author', { required: true })}
                        />
                        <div className={`transition-all duration-300 ${errors.author ? 'h-6' : 'h-0'}`}>
                            {errors.author && (
                                <p className='text-red'>
                                    El nombre del autor es requerido
                                </p>
                            )}
                        </div>

                        <p className="my-2">Género:</p>
                        <select {...register("genre", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Género'>
                            <option value="Aventura">Aventura</option>
                            <option value="Ciencia Ficción">Ciencia Ficción</option>
                            <option value="Contemporáneo">Contemporáneo</option>
                            <option value="Fantasía">Fantasía</option>
                            <option value="Juvenil">Juvenil</option>
                            <option value="Novela">Novela</option>
                            <option value="Policíaco">Policíaco</option>
                            <option value="Poesía">Poesía</option>
                            <option value="Romance">Romance</option>
                            <option value="Superación personal">Superación personal</option>
                            <option value="Terror">Terror</option>
                        </select>

                        <p className="my-2">Grupo de trabajo:</p>
                        <select {...register("grade", { required: true })}
                            className='w-full shadow-md border-white focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2' placeholder='Semestre'>
                            <option value="1°">1°</option>
                            <option value="3°">3°</option>
                        </select>
                        <select
                            {...register("group", { required: true })}
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

                        <button className='px-4 py-2 mb-4 rounded-md my-2 text-white bg-indigo hover:bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-opacity-50 w-full sm:w-auto' type='submit'>
                            Crear
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForosFormPage;