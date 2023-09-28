import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alumnos: [],
      codigo: '',
      nombre: '',
      creditos: '',
      ciclo: '',
      carrera: '',
    };
  }

  componentDidMount() {
    // Obtener la lista de alumnos al cargar la página
    this.listarAlumnos();
  }

  listarAlumnos = () => {
    // Realizar una solicitud GET a la API Flask para obtener la lista de alumnos
    fetch('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos')
      .then((response) => response.json())
      .then((data) => this.setState({ alumnos: data.alumnos }))
      .catch((error) => console.error('Error:', error));
  };

  crearAlumno = () => {
    // Realizar una solicitud POST a la API Flask para crear un nuevo alumno
    fetch('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        codigo: this.state.codigo,
        nombre: this.state.nombre,
        creditos: this.state.creditos,
        ciclo: this.state.ciclo,
        carrera: this.state.carrera,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Alumno registrado') {
          alert('Alumno registrado exitosamente');
          this.listarAlumnos();
          this.setState({
            codigo: '',
            nombre: '',
            creditos: '',
            ciclo: '',
            carrera: '',
          });
        } else {
          alert('Error al registrar al alumno');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  actualizarAlumno = () => {
    // Realizar una solicitud PUT a la API Flask para actualizar un alumno existente
    const { codigo } = this.state;
    fetch(`http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos/${codigo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: this.state.nombre,
        creditos: this.state.creditos,
        ciclo: this.state.ciclo,
        carrera: this.state.carrera,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Alumno modificado') {
          alert('Alumno actualizado exitosamente');
          this.listarAlumnos();
          this.setState({
            codigo: '',
            nombre: '',
            creditos: '',
            ciclo: '',
            carrera: '',
          });
        } else {
          alert('Error al actualizar al alumno');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  eliminarAlumno = () => {
    // Realizar una solicitud DELETE a la API Flask para eliminar un alumno existente
    const { codigo } = this.state;
    fetch(`http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos/${codigo}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Alumno eliminado') {
          alert('Alumno eliminado exitosamente');
          this.listarAlumnos();
          this.setState({
            codigo: '',
          });
        } else {
          alert('Error al eliminar al alumno');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>Lista de Alumnos</h1>
        <ul>
          {this.state.alumnos.map((alumno) => (
            <li key={alumno.codigo}>
              Código: {alumno.codigo}, Nombre: {alumno.nombre}, Créditos: {alumno.creditos}, Ciclo: {alumno.ciclo}, Carrera: {alumno.carrera}
            </li>
          ))}
        </ul>

        <h1>Crear/Actualizar/Eliminar Alumno</h1>
        <div>
          <label>Código:</label>
          <input
            type="text"
            name="codigo"
            value={this.state.codigo}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={this.state.nombre}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Créditos:</label>
          <input
            type="text"
            name="creditos"
            value={this.state.creditos}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Ciclo:</label>
          <input
            type="text"
            name="ciclo"
            value={this.state.ciclo}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Carrera:</label>
          <input
            type="text"
            name="carrera"
            value={this.state.carrera}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="button" onClick={this.crearAlumno}>
          Crear Alumno
        </button>
        <button type="button" onClick={this.actualizarAlumno}>
          Actualizar Alumno
        </button>
        <button type="button" onClick={this.eliminarAlumno}>
          Eliminar Alumno
        </button>
      </div>
    );
  }
}

export default App;
