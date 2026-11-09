// checkbox amarelo ("Ainda não tomou a primeira dose", "Uso contínuo")
export default function CheckboxDestaque({ id, name, checked, onChange, children }) {
    return (
        <label
            htmlFor={id}
            className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl border border-bege bg-[#FEEA8F] px-5 font-semibold transition hover:bg-[#FEEA1F] hover:shadow-md"
        >
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="size-4 accent-laranja"
            />
            {children}
        </label>
    )
}
