import React from 'react'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import api from './services/api'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  const handleSearch = async () => {
    if (input === '') {
      alert('Preencha algum CEP!')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert('Erro ao buscar o CEP. Tente novamente.')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="container-input">
        <input type="text" placeholder='Digite seu cep' value={input} onChange={(e) => setInput(e.target.value)} />

        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  )
}

export default App