import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './styles.css';

function App() {


  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){

    if(input === ''){
      alert("Digite seu CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    }catch{
      alert("Failed to get search");
      setInput("");
    }

  }

  return (
    <div className="container">
      <h1 className="title">Qual é o CEP</h1>

      <div className="containerInput">
        <input type="text"
        placeholder="Digite seu CEP.."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25}  color="#000"/>
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          
          <span>{cep.logradouro}</span>
          {cep.complemento !== "" &&(<span>{cep.complemento}</span>
          )}
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        
       </main>
      )};
     

    </div>
  );
}

export default App;
