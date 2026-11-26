import React from 'react'
import { useEffect, useState } from 'react'
import './Previsao10Dias.css'

function Previsao10Dias({ dados }) {
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
        console.log('Erro ao carregar os códigos WMO.')
      }
    }

    carregarCodigos()
  }, [])

  if (!dados) return null

  const dias = dados.clima.daily

  function formatarDia(data, indice) {
    if (indice === 0) return 'Hoje'
    if (indice === 1) return 'Amanhã'

    const dataDia = new Date(`${data}T12:00:00`)
    return dataDia.toLocaleDateString('pt-BR', { weekday: 'long' })
  }

  function formatarData(data) {
    const partes = data.split('-')
    return `${partes[2]}/${partes[1]}`
  }

  return (
    <section className="previsao">
      <h2>Previsão para os próximos 10 dias</h2>

      <div className="previsao-grid">
        {dias.time.map((data, indice) => {
          let descricao = 'Condição não identificada'
          let icone = 'nublado.svg'

          codigos.forEach((item) => {
            if (item.codigo === dias.weather_code[indice]) {
              descricao = item.descricao
              icone = item.icone
            }
          })

          return (
            <div className="previsao-card" key={data}>
              <h3>{formatarDia(data, indice)}</h3>
              <p className="previsao-data">{formatarData(data)}</p>
              <img src={`/icones/${icone}`} alt={descricao} className="previsao-icone" />
              <p className="previsao-descricao">{descricao}</p>
              <div className="previsao-temperaturas">
                <strong>{Math.round(dias.temperature_2m_max[indice])}°</strong>
                <span>{Math.round(dias.temperature_2m_min[indice])}°</span>
              </div>
              <p className="previsao-chuva">
                <img src="/icones/chuva-gota.svg" alt="" />
                {dias.precipitation_probability_max[indice]}%
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Previsao10Dias