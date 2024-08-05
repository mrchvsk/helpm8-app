export default function Card({ title = '', desc = '', participants = 0, participantsMax = 100 }) {
    const maxLength = 90;
    const shortenedDesc = desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;

    return (
        <div className="card w-96 sm:w-4/5 bg-base-100 shadow-xl">
            <progress className="progress h-1 w-full" value={participants} max={participantsMax}></progress>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-justify">{shortenedDesc}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Participate</button>
                </div>
            </div>
        </div>
    );
}