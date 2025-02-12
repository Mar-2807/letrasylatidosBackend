//ContactPage.jsx
function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-poppins">
            <header className="w-full bg-indigo text-white py-6 shadow-lg">
                <h1 className="text-3xl font-bold text-center">¿QUIÉNES SOMOS?</h1>
            </header>

            <main className="flex-grow container mx-auto p-4 sm:p-6">
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-700 text-center mb-4">Nuestro Equipo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-orange-600">Marely Mejía Abúndez</h3>
                            <p className="text-sm text-gray-500 mt-2">bluemly2807@gmail.com</p>
                        </div>

                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-orange-600">Marely Neri Leana</h3>
                            <p className="text-sm text-gray-500 mt-2">marelyluwu@gmail.com</p>
                        </div>

                        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition">
                            <h3 className="text-xl font-bold text-orange-600">Sakura Nicole Peña Aguillón</h3>
                            <p className="text-sm text-gray-500 mt-2">sandranicolecastillo0@gmail.com</p>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl font-semibold text-orange-700 mb-4">Contáctanos</h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        No dudes en comunicarte con nosotros si tienes alguna pregunta o comentario.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default ContactPage;