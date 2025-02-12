// Foro Card
function ForoCard({ foro, index }) {
    const bgImage = ["bg-foro-pattern1", "bg-foro-pattern2", "bg-foro-pattern3", "bg-foro-pattern4", "bg-foro-pattern5", "bg-foro-pattern6", "bg-foro-pattern7", "bg-foro-pattern8", "bg-foro-pattern9"];

    return (
        <div
            className={`font-poppins text-white shadow-md p-6 sm:p-8 lg:p-10 rounded-md overflow-hidden bg-no-repeat ${bgImage[index % bgImage.length]}`}
            key={foro._id}
        >
            <h1 className="text-md sm:text-lg lg:text-xl font-bold">{foro.bookTitle}</h1>
            <p className="text-sm sm:text-base">― {foro.author}</p>
            <p className="text-xs sm:text-sm mt-1">{foro.grade} - {foro.group}</p>
        </div>
    );
}

export default ForoCard;