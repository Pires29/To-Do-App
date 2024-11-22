import { useState } from "react";
import { GoSearch } from "react-icons/go"; // Importar o ícone de busca

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Pesquisar por:", searchTerm);
    // Aqui você pode adicionar a lógica de pesquisa
  };

  return (
    <div className="d-flex align-items-center position-relative"> {/* Adiciona posição relativa */}
      <GoSearch className="text-light position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }} /> {/* Ícone dentro da barra */}
      <input
        type="text"
        placeholder="Search..."
        className="form-control custom-search-bar ps-5" // Adiciona padding à esquerda para espaço para o ícone
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
