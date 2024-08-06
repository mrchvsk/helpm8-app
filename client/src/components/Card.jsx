export default function Card({ title = '', desc = '', participants = 0, participantsMax = 100 }) {
    const maxLength = 90;
    const shortenedDesc = desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;

    return (
        <div className="card min-w-96 w-3/5 md:w-48 bg-base-200 shadow-xl">
            <progress className="progress h-2 w-full" value={participants} max={participantsMax}></progress>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-justify">{shortenedDesc}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary text-white">Participate</button>
                </div>
            </div>
        </div>
    );
}