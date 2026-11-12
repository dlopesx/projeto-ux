import { Link } from "react-router-dom";

export default function Card({nome, svg, petId, pagina}) {

    return(
        <li>
        <Link to={`/pet/${petId}/${pagina}`}
            className="flex flex-col items-start gap-2.5 md:gap-[18px] h-20 md:h-[118px] min-w-0
            p-3.5 md:p-6 rounded-2xl md:rounded-[20px] bg-superficie border border-bege text-xs md:text-base
            hover:shadow-md hover:-translate-y-0.5 transition
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
            <img src={`/svg/${svg}.svg`} alt="" aria-hidden="true" className="size-5 md:size-6 shrink-0" />
            {nome}
        </Link>
        </li>
    );
}
