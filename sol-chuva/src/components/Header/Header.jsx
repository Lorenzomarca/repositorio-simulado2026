import React from 'react'
import configuracao from '../../config'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <img className="header-logo" src={configuracao.logo} alt={configuracao.nome} />
      <div>
        <h1>{configuracao.nome}</h1>
        <p>{configuracao.slogan}</p>
      </div>
    </header>
  )
}

export default Header
