import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos';

function CursoCRUD() {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState({ codigo: '', nombre: '', creditos: '' });
  const [codigoEliminar, setCodigoEliminar] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Obtener la lista de cursos al cargar el componente
    axios.get(apiUrl)
      .then((response) => {
        setCursos(response.data.cursos);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de cursos', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  const listarCursos = () => {
    axios.get(apiUrl)
      .then((response) => {
        setCursos(response.data.cursos);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de cursos', error);
      });
  };

  const leerCurso = (codigo) => {
    axios.get(`${apiUrl}/${codigo}`)
      .then((response) => {
        const cursoEncontrado = response.data.curso;
        setMensaje(response.data.mensaje);
        if (cursoEncontrado) {
          setCurso(cursoEncontrado);
        }
      })
      .catch((error) => {
        console.error('Error al leer el curso', error);
      });
  };

  const registrarCurso = () => {
    axios.post(apiUrl, curso)
      .then((response) => {
        setMensaje(response.data.mensaje);
        listarCursos(); // Actualizar la lista de cursos después de registrar uno nuevo
        setCurso({ codigo: '', nombre: '', creditos: '' }); // Limpiar el formulario
      })
      .catch((error) => {
        console.error('Error al registrar el curso', error);
      });
  };

  const eliminarCurso = () => {
    axios.delete(`${apiUrl}/${codigoEliminar}`)
      .then((response) => {
        setMensaje(response.data.mensaje);
        listarCursos(); // Actualizar la lista de cursos después de eliminar uno
        setCodigoEliminar(''); // Limpiar el input de código para eliminar
      })
      .catch((error) => {
        console.error('Error al eliminar el curso', error);
      });
  };

  const actualizarCurso = () => {
    axios.put(`${apiUrl}/${curso.codigo}`, curso)
      .then((response) => {
        setMensaje(response.data.mensaje);
        listarCursos(); // Actualizar la lista de cursos después de actualizar uno
      })
      .catch((error) => {
        console.error('Error al actualizar el curso', error);
      });
  };

  return (
    <div>
      <h1>Gestión de Cursos</h1>
      <div>
        <h2>Lista de Cursos</h2>
        <ul>
          {cursos.map((c) => (
            <li key={c.codigo}>
              {c.codigo} - {c.nombre} ({c.creditos} créditos)
              <button onClick={() => leerCurso(c.codigo)}>Leer</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Registrar Curso</h2>
        <input
          type="text"
          name="codigo"
          placeholder="Código"
          value={curso.codigo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={curso.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="creditos"
          placeholder="Créditos"
          value={curso.creditos}
          onChange={handleInputChange}
        />
        <button onClick={registrarCurso}>Registrar</button>
      </div>
      <div>
        <h2>Eliminar Curso</h2>
        <input
          type="text"
          name="codigoEliminar"
          placeholder="Código a eliminar"
          value={codigoEliminar}
          onChange={(e) => setCodigoEliminar(e.target.value)}
        />
        <button onClick={eliminarCurso}>Eliminar</button>
      </div>
      <div>
        <h2>Actualizar Curso</h2>
        <input
          type="text"
          name="codigo"
          placeholder="Código"
          value={curso.codigo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={curso.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="creditos"
          placeholder="Créditos"
          value={curso.creditos}
          onChange={handleInputChange}
        />
        <button onClick={actualizarCurso}>Actualizar</button>
      </div>
      <div>
        <p>{mensaje}</p>
      </div>
    </div>
  );
}

export default CursoCRUD;
