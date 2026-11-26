import React from 'react'
import { useEffect, useState } from 'react'
import { buscarCoordenadas, buscarClima } from '../../services/climaService'
import './Buscar.css'

function Buscar({ onClimaEncontrado }) {
  const [cidade, setCidade] = useState('')
  const [cidades, setCidades] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarCidades() {
      try {
        const resposta = await fetch('/cidades.csv')
        const texto = await resposta.text()
        const linhas = texto.trim().split(/\r?\n/).slice(1)
        const lista = []

        linhas.forEach((linha) => {
          const colunas = linha.split(',')
          lista.push({
            nome: colunas[0],
            estado: colunas[1]
          })
        })

        setCidades(lista)
      } catch (error) {
        setErro('Não foi possível carregar as sugestões de cidades.')
      }
    }

    carregarCidades()
  }, [])

  async function pesquisar(nomeCidade = cidade) {
    if (!nomeCidade.trim()) {
      setErro('Digite o nome de uma cidade antes de buscar.')
      return
    }

    setErro('')
    setCarregando(true)

    try {
      const local = await buscarCoordenadas(nomeCidade)
      const clima = await buscarClima(local)
      setCidade(nomeCidade)
      onClimaEncontrado({ cidade: local, clima })
    } catch (error) {
      setErro(error.message || 'Não foi possível carregar os dados. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <section className="buscar">
      <div className="buscar-campo">
        <input
          type="text"
          list="lista-cidades"
          placeholder="Digite o nome de uma cidade…"
          value={cidade}
          onChange={(evento) => setCidade(evento.target.value)}
          onKeyDown={(evento) => {
            if (evento.key === 'Enter') pesquisar()
          }}
        />

        <datalist id="lista-cidades">
          {cidades.map((item) => (
            <option key={item.nome} value={item.nome} />
          ))}
        </datalist>

        <button className="botao-buscar" type="button" onClick={() => pesquisar()} disabled={carregando}>
          <img src="/icones/busca.svg" alt="" />
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      <div className="cidades-rapidas">
        {cidades.slice(0, 6).map((item) => (
          <button key={item.nome} type="button" onClick={() => pesquisar(item.nome)} disabled={carregando}>
            {item.nome}
          </button>
        ))}
      </div>

      {carregando && <p className="mensagem-carregando">Carregando dados do clima…</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
    </section>
  )
}

export default Buscar