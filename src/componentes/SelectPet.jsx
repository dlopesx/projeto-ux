import CampoForm, { SelectCampo } from './CampoForm'

// "Para qual pet?" — o campo precisa se chamar petId no state do formulário
export default function SelectPet({ pets, value, onChange, id = 'petId', label = 'Para qual pet?' }) {
    return (
        <CampoForm id={id} label={label}>
            <SelectCampo id={id} name="petId" required value={value} onChange={onChange}>
                <option value="" disabled>
                    Selecione o pet
                </option>
                {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                        {pet.nome}
                    </option>
                ))}
            </SelectCampo>
        </CampoForm>
    )
}
