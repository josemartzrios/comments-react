import React, {useState, useEffect} from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {

  // SetPeople para traer mi array data
  // setIndex para la posición de cada comentario (por ahora en 0)
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // cada 5 segundos se cambia de comentario 
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>//</span>Reseñas
        </h2>
      </div>
      <div className="section-center">
        {/* itero con el método map a people con dos parametros: person, personIndex */}
        {/* inicializo los elementos que utilizaré */}
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          // cuando itere por mi array activo las clases para aparecer un comentario solamente
          let position = 'nextSlide';
          // Si mi personIndex coincide con mi index cambio la position de mi comentario
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            // Articulo con cada comentario con id, image, name, title, quote
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}

        {/* Botón para ir a la izquierda */}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>

        {/* Botón para ir a la derecha */}
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;