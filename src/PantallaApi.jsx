import React, { useEffect, useState } from "react";
import axios from "axios";

const pantallaApi = () => {
  const [characters, setCharacters] = useState([]); // Datos de la API
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Personaje seleccionado

  // Cargar datos desde la API al montar el componente
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("https://rickandmortyapi.com/api/character");
        setCharacters(response.data.results);
    };

    fetchData();

    // Comprobar si hay un personaje guardado en localStorage
    const savedCharacter = localStorage.getItem("selectedCharacter");
    if (savedCharacter) {
      setSelectedCharacter(JSON.parse(savedCharacter));
    }
  }, []);

  // Manejar la selección de un personaje
  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
    localStorage.setItem("selectedCharacter", JSON.stringify(character)); // Guardar en localStorage
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">Ricky y Morty serie</h1>

      {/* Mostrar personaje seleccionado */}
      {selectedCharacter && (
        <div className="mb-5 ">
            <div className="row g-3 mx-auto">
              <div className="col-md-4 text-center">
                <img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <strong>
                    <h5 className="card-title">{selectedCharacter.name}</h5>
                  </strong>
                  <p className="card-text">
                    <strong>Estado:</strong> {selectedCharacter.status}
                  </p>
                  <p className="card-text">
                    <strong>Especie:</strong> {selectedCharacter.species}
                  </p>
                  <p className="card-text">
                    <strong>Creacion del personaje:</strong> {selectedCharacter.created}
                  </p>
                </div>
              </div>
            </div>
        </div>
      )}

      {/* Lista de personajes */}
      <div className="row">
        {characters.map((character) => (
          <div
            key={character.id}
            className="col-6 col-md-4 col-lg-2  mb-4"
            onClick={() => handleSelectCharacter(character)}
          >
            <div className="card h-100 cursor-pointer">
              <img
                src={character.image}
                alt={character.name}
                className="card-img-top "
              />
              <div className="card-body text-center">
                <h5 className="card-title">{character.name}</h5>
                <p>{character.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default pantallaApi;
