// ForoAbout
function ForoAbout({ foro }) {
    return (
        <div id="foro-information" className="shadow-md rounded-md mb-6 bg-white w-full">
            <div className="p-4 bg-indigo text-white font-semibold rounded-t-md">
                <h1 className="text-xl text-center md:text-left">ACERCA DEL FORO</h1>
            </div>
            <div className="p-4">
                <p className="font-medium text-center md:text-left">Creado por:</p>
                <p className="flex justify-center lg:px-5 md:justify-start text-white my-2 py-1 rounded-md bg-blue-true">
                    {foro.createdBy ? `${foro.createdBy.realname} ${foro.createdBy.lastname}` : "Cargando..."}
                </p>
                <p className="font-medium text-center md:text-left">Miembros:</p>
                <ul className="flex flex-col items-center md:items-start">
                    {foro.members?.map((member) => (
                        <li className="w-full md:w-auto flex justify-center lg:px-5 md:justify-start py-1 my-2 rounded-md border border-gray" key={member._id}>
                            {member.realname} {member.lastname}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ForoAbout;