import React from 'react'
import { useState } from 'react'
import Header from './components/Header/Header'
import Buscar from './components/Buscar/Buscar'
import ClimaAtual from './components/ClimaAtual/ClimaAtual'
import Previsao10Dias from './components/Previsao10Dias/Previsao10Dias'
import configuracao from './config'
import './App.css'

function App() {
  const [dadosClima, setDadosClima] = useState(null)

  return (
    <main className={dadosClima ? 'app app-com-clima' : 'app app-inicial'}>
      {!dadosClima ? (
        <section className="inicio">
          <div className="inicio-marca">
            <img src={configuracao.logo} alt="Logo Sol Chuva" />
            <h1>{configuracao.nome}</h1>
            <p>{configuracao.slogan}</p>
          </div>
          <div className="inicio-texto">
            <h2>Veja como está o tempo</h2>
            <p>Digite uma cidade para ver o clima.</p>
          </div>
          <Buscar onClimaEncontrado={setDadosClima} />
      
        </section>
      ) : (
        <>
          <Header />
          <Buscar onClimaEncontrado={setDadosClima} />
          <ClimaAtual dados={dadosClima} />
          <Previsao10Dias dados={dadosClima} />
         
        </>
      )}
    </main>
  )
}


export default App
