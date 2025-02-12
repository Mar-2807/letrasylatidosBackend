//AboutPage.jsx
function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col font-poppins items-center">
            <header className="w-full bg-indigo text-white py-6 shadow-lg">
                <h1 className="text-3xl font-bold text-center">Sobre Nosotros</h1>
            </header>

            <main className="flex-grow container mx-auto p-4 sm:p-6">
                <section className="mb-12 rounded-md shadow-md p-6 sm:p-10 mx-4 sm:mx-20">
                    <h2 className="text-2xl font-semibold text-indigo-dark text-center mb-4">Nuestra Misión y Visión</h2>
                    <p className="text-gray-700 text-base sm:text-lg text-justify leading-relaxed">
                        En Letras y Latidos, nuestra misión es fomentar el hábito de la lectura entre los estudiantes, proporcionando una plataforma segura y accesible para compartir conocimientos, opiniones e impresiones sobre libros. Buscamos ofrecer una experiencia enriquecedora que inspire el aprendizaje autónomo y el desarrollo de habilidades clave como el pensamiento crítico, la creatividad y la mejora en el rendimiento académico.
                    </p>
                    <p className="text-gray-700 text-base sm:text-lg text-justify leading-relaxed mt-4">
                        Nuestra visión es ser el espacio digital para estudiantes que desean compartir su pasión por la lectura. A través de nuestra red social supervisada, buscamos conectar a jóvenes lectores de diversas opiniones e intereses, brindándoles una herramienta innovadora que impulse su crecimiento intelectual y personal.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-indigo-dark text-center mb-4">Nuestros Valores</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-orange-600">Innovación</h3>
                            <p className="mt-2 text-sm sm:text-base">
                                Proveer una plataforma digital actualizada que fomente el hábito lector de manera divertida y accesible.
                            </p>
                        </div>
                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold">Comunidad</h3>
                            <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                Crear un entorno de intercambio de ideas donde estudiantes puedan compartir sus experiencias y aprendizajes.
                            </p>
                        </div>
                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-orange-600">Accesibilidad</h3>
                            <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                Garantizar que todos puedan explorar, disfrutar y beneficiarse del mundo de los libros.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl font-semibold text-orange-700 mb-4">¿Por Qué Elegirnos?</h2>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        En Letras y Latidos, no solo promovemos la lectura, sino también el desarrollo personal y académico de cada estudiante. Con nuestra plataforma, ofrecemos la oportunidad de explorar diferentes perspectivas literarias, fomentar el pensamiento crítico y, lo más importante, crear un hábito lector duradero que transforme vidas.
                    </p>
                </section>
            </main>

            <footer className="w-full bg-orange-700 text-white py-4 text-center">
                <p className="text-xs sm:text-sm">&copy; 2025 Book Finder. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
export default AboutPage;