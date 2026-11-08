export default function CardAlerta({ titulo, descricao, onEdit }) {
    return (
        <li className="flex flex-col sm:flex-row sm:gap-5 sm:items-center gap-4 p-5 rounded-2xl bg-[#FFAE52] hover:shadow-md transition">
            <div className="flex-1 min-w-0">
                <p className="font-semibold break-words">{titulo}</p>
                <p className="text-sm mt-1">{descricao}</p>
            </div>

            <button
                type="button"
                onClick={onEdit}
                className="flex items-center justify-center sm:justify-start gap-2 font-medium hover:font-semibold transition"
            >
                <img src="/svg/editar.svg" alt="" />
                <span>Editar alerta</span>
            </button>
        </li>
    )
}