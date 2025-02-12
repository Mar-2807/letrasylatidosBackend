//Foro comments
import { useForm } from "react-hook-form";
import { useForos } from "../context/ForosContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function ForoComments({ foroId, postCommentErrors }) {
    const colors = ["bg-creme", "bg-green-creme", "bg-white-gray", "bg-blue-creme", "bg-purple-creme"];
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { postComment, getComments, comments } = useForos();
    const { user } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        await postComment(data, foroId, user);
        reset();
        getComments(foroId);
    });

    useEffect(() => {
        getComments(foroId);
    }, []);

    return (
        <div id="comments">
            <div className="shadow-md rounded-md bg-white mb-6">
                <div
                    id="comments-header"
                    className="p-4 bg-blue text-white font-semibold rounded-t-md"
                >
                    <h2 className="text-lg font-semibold">Publica un comentario</h2>
                </div>
                <div id="form-comment" className="p-4">
                    {postCommentErrors.map((error, i) => (
                        <div className="bg-red p-2 text-white text-center m-2" key={i}>
                            {error}
                        </div>
                    ))}
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <textarea
                            {...register("comment", { required: true })}
                            rows="2"
                            placeholder="¿Qué te parece el libro?"
                            className="border border-gray w-full focus:outline-none focus:ring-2 focus:ring-sky-light focus:border-white px-4 py-2 rounded-md my-2"
                        ></textarea>
                        <div className="transition-all duration-300">
                            {errors.comment && (
                                <p className="text-red">
                                    Por favor escribe el comentario
                                </p>
                            )}
                        </div>
                        <button
                            onClick={async () => {
                                getComments(foroId);
                            }}
                            type="submit"
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 my-2 bg-indigo text-white rounded-md hover:bg-indigo-dark"
                        >
                            <i className="bi bi-chat"></i> Publicar
                        </button>
                    </form>
                </div>
            </div>
            <div className="shadow-md">
                <div className="p-4 bg-blue text-white font-semibold rounded-t-md">
                    <h2 className="text-lg font-semibold">Comentarios</h2>
                </div>
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4">
                    {comments.length === 0 ? (
                        <h1 className="font-poppins text-center text-gray-700">
                            Aún no hay comentarios
                        </h1>
                    ) : (
                        comments.map((comment, index) => (
                            <div
                                className={`py-4 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-r-xl ${colors[index % colors.length]} max-h-full h-fit`}
                                key={comment._id}
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <img src="/imgs/profile.png" className="rounded-full w-8 h-8 sm:w-10 sm:h-10" />
                                        <p className="font-bold text-sm sm:text-base">{comment.userRealname} {comment.userLastname}</p>
                                    </div>
                                    <p className="text-xs sm:text-sm text-dark-gray mt-2 sm:mt-0">
                                        {format(new Date(comment.createdAt), "dd '-' MM '-' yyyy", { locale: es })}
                                    </p>
                                </div>
                                <p className="text-gray-700 break-words whitespace-pre-wrap text-sm sm:text-base">
                                    {comment.comment}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForoComments;