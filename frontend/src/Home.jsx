// Home.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Supongamos que estás utilizando React Router para la navegación.

function Home() {
  return (
    <div>
      <h1>Bienvenido a la Aplicación de Gestión Escolar</h1>
      <div>
        <h2>Menú de Navegación</h2>
        <ul>
          <li>
            <Link to="/alumnos">Alumnos</Link>
          </li>
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/profesores">Profesores</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
