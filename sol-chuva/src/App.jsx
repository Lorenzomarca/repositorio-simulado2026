
import { useState } from 'react'
import Header from './components/Header/Header'
import Buscar from './components/Buscar/Buscar'
import ClimaAtual from './components/ClimaAtual/ClimaAtual'
import './App.css'

function App() {
  const [dadosClima, setDadosClima] = useState(null)

  return (
    <div className="app">
      <Header />

      <Buscar onClimaEncontrado={setDadosClima} />

      <ClimaAtual dados={dadosClima} />
    </div>
  )
}

export default App
