import React from 'react'
import { useEffect, useState } from 'react'
import './ClimaAtual.css'

function ClimaAtual({ dados }) {
  const [codigos, setCodigos] = useState([])

  useEffect(() => {
    async function carregarCodigos() {
      try {
        const resposta = await fetch('/codigos_wmo.csv')
        const texto = await resposta.text()
        const linhas = texto.trim().split(/\r?\n/).slice(1)
        const lista = []

        linhas.forEach((linha) => {
          const colunas = linha.split(',')
          lista.push({
            codigo: Number(colunas[0]),
            descricao: colunas[1],
            icone: colunas[2]
          })
        })

        setCodigos(lista)
      } catch (error) {
        console.log('Erro ao carregar os códigos do clima.')
      }
    }

    carregarCodigos()
  }, [])

  if (!dados) return null

  const cidade = dados.cidade
  const clima = dados.clima
  const atual = clima.current
  const diario = clima.daily

  let descricao = 'Condição não identificada'
  let icone = 'nublado.svg'

  codigos.forEach((item) => {
    if (item.codigo === atual.weather_code) {
      descricao = item.descricao
      icone = item.icone
    }
  })

  const indicadores = [
    { nome: 'Sensação', valor: `${Math.round(atual.apparent_temperature)}°C`, icone: 'termometro.svg' },
    { nome: 'Umidade', valor: `${atual.relative_humidity_2m}%`, icone: 'umidade.svg' },
    { nome: 'Vento', valor: `${atual.wind_speed_10m} km/h`, icone: 'vento.svg' },
    { nome: 'Precipitação', valor: `${atual.precipitation} mm`, icone: 'chuva-gota.svg' },
    { nome: 'Índice UV', valor: diario.uv_index_max[0], icone: 'uv.svg' },
    { nome: 'Nascer do sol', valor: diario.sunrise[0].slice(11, 16), icone: 'nascer-sol.svg' },
    { nome: 'Pôr do sol', valor: diario.sunset[0].slice(11, 16), icone: 'por-sol.svg' }
  ]

  return (
    <section className="clima-atual">
      <div className="clima-cabecalho">
        <div>
          <h2>{cidade.name}</h2>
          <p>{cidade.admin1 || ''} — {cidade.country || ''}</p>
        </div>
        <span>Atualizado às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div className="clima-conteudo">
        <div className="clima-principal">
          <img src={`/icones/${icone}`} alt={descricao} />
          <div>
            <h3>{Math.round(atual.temperature_2m)}°C</h3>
            <p>{descricao}</p>
          </div>
        </div>

        <div className="indicadores-grid">
          {indicadores.map((item) => (
            <div className="indicador-card" key={item.nome}>
              <div className="indicador-titulo">
                <img src={`/icones/${item.icone}`} alt="" />
                <span>{item.nome}</span>
              </div>
              <strong>{item.valor}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClimaAtual