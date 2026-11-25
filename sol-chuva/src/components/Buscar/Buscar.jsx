
import { useState } from 'react'
import { buscarCoordenadas, buscarClima } from '../../services/climaService'
import './Buscar.css'

function Buscar({ onClimaEncontrado }) {
  const [cidade, setCidade] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const cidadesRapidas = [
    'Florianópolis',
    'São Paulo',
    'Rio de Janeiro',
    'Brasília',
    'Salvador',
    'Porto Alegre',
  ]

  async function pesquisar(nomeCidade = cidade) {
    if (nomeCidade.trim() === '') {
      setErro('Digite o nome de uma cidade.')
      return
    }

    setErro('')
    setCarregando(true)
    setCidade(nomeCidade)

    try {
      const coordenadas = await buscarCoordenadas(nomeCidade)
      const clima = await buscarClima(coordenadas)

      onClimaEncontrado({
        cidade: coordenadas,
        clima: clima,
      })
    } catch (error) {
      setErro(error.message)
    }

    setCarregando(false)
  }

  return (
    <section className="buscar">
      <div className="buscar-campo">
        <input
          type="text"
          list="lista-cidades"
          placeholder="Digite o nome de uma cidade..."
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              pesquisar()
            }
          }}
        />

        <datalist id="lista-cidades">
          {cidadesRapidas.map((nomeCidade) => (
            <option key={nomeCidade} value={nomeCidade} />
          ))}
        </datalist>

        <button
          type="button"
          className="botao-buscar"
          onClick={() => pesquisar()}
          disabled={carregando}
        >
          <img src="/icones/busca.svg" alt="" />
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      <div className="cidades-rapidas">
        {cidadesRapidas.map((nomeCidade) => (
          <button
            key={nomeCidade}
            type="button"
            onClick={() => pesquisar(nomeCidade)}
            disabled={carregando}
          >
            {nomeCidade}
          </button>
        ))}
      </div>

      {erro && <p className="mensagem-erro">{erro}</p>}
    </section>
  )
}

export default Buscar
