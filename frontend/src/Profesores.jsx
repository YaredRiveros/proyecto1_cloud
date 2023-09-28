import React, { Component } from 'react';
import axios from 'axios';

class Profesores extends Component {
  constructor() {
    super();
    this.state = {
      profesores: [],
      nuevoProfesor: {
        id: '',
        nombre: '',
        carrera: '',
      },
    };
  }

  componentDidMount() {
    this.getProfesores();
  }

  getProfesores = () => {
    axios.get('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores')
      .then((response) => {
        this.setState({ profesores: response.data.profesores });
      })
      .catch((error) => {
        console.error('Error al obtener la lista de profesores: ', error);
      });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      nuevoProfesor: {
        ...prevState.nuevoProfesor,
        [name]: value,
      },
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores', this.state.nuevoProfesor)
      .then((response) => {
        console.log(response.data.mensaje);
        this.getProfesores();
      })
      .catch((error) => {
        console.error('Error al registrar al profesor: ', error);
      });
  }

  render() {
    const { profesores, nuevoProfesor } = this.state;

    return (
      <div>
        <h1>Lista de Profesores</h1>
        <ul>
          {profesores.map((profesor) => (
            <li key={profesor.id}>
              {profesor.nombre} - {profesor.carrera}
            </li>
          ))}
        </ul>

        <h2>Registrar Profesor</h2>
        <form onSubmit={this.handleSubmit}>
          <label>ID:
            <input type="text" name="id" value={nuevoProfesor.id} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>Nombre:
            <input type="text" name="nombre" value={nuevoProfesor.nombre} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>Carrera:
            <input type="text" name="carrera" value={nuevoProfesor.carrera} onChange={this.handleInputChange} />
          </label>
          <br />
          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  }
}

export default Profesores;
