import LayoutPagina from '../componentes/LayoutPagina'
import { NOME_APP, VERSAO_APP } from '../js/app'

function Sobre() {
    return (
        <LayoutPagina tituloMobile={`Sobre o ${NOME_APP}`}>
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-8 md:max-w-4xl">
                {/* apresentação */}
                <div className="flex flex-col items-center gap-3 text-center md:gap-4">
                    <div className="flex size-20 items-center justify-center rounded-3xl bg-[#FFF0DF]">
                        <img
                            src="/svg/paw-print.svg"
                            alt={`Patinha que representa o ${NOME_APP}`}
                            className="size-10"
                        />
                    </div>

                    <h2 className="text-2xl font-semibold md:text-3xl">Conheça o {NOME_APP}</h2>

                    <p className="text-sm text-[#75634F] md:text-base">
                        Cuidado, organização e carinho em um só lugar.
                    </p>
                </div>

                {/* sobre o app */}
                <div className="w-full rounded-2xl border border-bege bg-white p-6 md:p-9">
                    <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">
                        O que é o {NOME_APP}?
                    </h3>

                    <p className="text-sm leading-7 text-[#75634F] md:text-base">
                        O {NOME_APP} é uma plataforma desenvolvida para auxiliar tutores no
                        acompanhamento da saúde e dos cuidados de seus animais de estimação.
                    </p>

                    <p className="mt-4 text-sm leading-7 text-[#75634F] md:text-base">
                        Por meio do aplicativo, é possível organizar informações importantes dos
                        pets, acompanhar vacinas e consultas e compartilhar dados com outros
                        tutores.
                    </p>

                    <div className="my-7 border-t border-bege" />

                    <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">Nosso objetivo</h3>

                    <p className="text-sm leading-7 text-[#75634F] md:text-base">
                        Tornar a rotina de cuidados com os animais mais simples e organizada,
                        ajudando os tutores a manterem as informações de seus pets sempre
                        acessíveis.
                    </p>
                </div>

                {/* rodapé */}
                <div className="text-center">
                    <p className="text-xs text-[#75634F] md:text-sm">
                        {NOME_APP} · Versão {VERSAO_APP}
                    </p>
                    <p className="mt-2 text-xs text-[#75634F] md:text-sm">
                        Desenvolvido com carinho para quem ama seus pets.
                    </p>
                </div>
            </div>
        </LayoutPagina>
    )
}

export default Sobre
