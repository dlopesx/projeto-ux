// estilo base de todos os campos (a altura fica em cada campo, porque o textarea é diferente)
export const estiloCampo =
    'w-full px-4 md:px-5 bg-superficie border border-bege rounded-2xl text-texto outline-none focus:border-laranja focus:ring-2 focus:ring-laranja/25'

// label + campo
export default function CampoForm({ id, label, children, className = '' }) {
    return (
        <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
            <label htmlFor={id} className="text-sm font-medium md:text-base">
                {label}
            </label>
            {children}
        </div>
    )
}

// <select> com seta própria (passe as <option> como filhos)
export function SelectCampo({ children, ...props }) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`${estiloCampo} h-12 md:h-14 appearance-none pr-12 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
            >
                {children}
            </select>
            <svg
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        </div>
    )
}