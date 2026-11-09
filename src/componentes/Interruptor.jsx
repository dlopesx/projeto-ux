// botão liga/desliga (checkbox escondido + trilho que muda de cor)
// uso: <Interruptor name="vacinas" rotulo="Vacinas e cuidados" checked={x} onChange={fn} />
export default function Interruptor({ name, rotulo, checked, onChange }) {
    return (
        <label className="relative inline-flex shrink-0 cursor-pointer items-center">
            <input
                type="checkbox"
                role="switch"
                name={name}
                aria-label={rotulo}
                checked={checked}
                onChange={onChange}
                className="peer sr-only"
            />
            <div
                className="h-6 w-11 rounded-full bg-[#E9DDCF] transition
                    peer-checked:bg-laranja
                    peer-focus-visible:ring-2 peer-focus-visible:ring-laranja peer-focus-visible:ring-offset-2
                    after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full
                    after:bg-white after:transition-all after:content-['']
                    peer-checked:after:translate-x-5"
            />
        </label>
    )
}
