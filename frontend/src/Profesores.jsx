import React, { Component } from 'react';
import { TextField, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

class Profesores extends Component {
  constructor() {
    super();
    this.state = {
      profesores: [],
      id: '',
      nombre: '',
      carrera: '',
    };
  }

  componentDidMount() {
    this.listarProfesores();
  }

  listarProfesores = () => {
    fetch('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores')
      .then((response) => response.json())
      .then((data) => {
        if (data.profesores && Array.isArray(data.profesores)) {
          this.setState({ profesores: data.profesores });
        } else {
          console.error('La respuesta no contiene un array de profesores válido.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la lista de profesores: ', error);
      });
  }

  crearProfesor = () => {
    fetch('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        nombre: this.state.nombre,
        carrera: this.state.carrera,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Profesor registrado') {
          alert('Profesor registrado exitosamente');
          this.listarProfesores();
          this.setState({
            id: '',
            nombre: '',
            carrera: '',
          });
        } else {
          alert('Error al registrar al profesor');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  actualizarProfesor = () => {
    const { id } = this.state;
    fetch(`http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: this.state.nombre,
        carrera: this.state.carrera,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Profesor modificado') {
          alert('Profesor actualizado exitosamente');
          this.listarProfesores();
          this.setState({
            id: '',
            nombre: '',
            carrera: '',
          });
        } else {
          alert('Error al actualizar al profesor');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  eliminarProfesor = () => {
    const { id } = this.state;
    fetch(`http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Profesor eliminado') {
          alert('Profesor eliminado exitosamente');
          this.listarProfesores();
          this.setState({
            id: '',
          });
        } else {
          alert('Error al eliminar al profesor');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { profesores, id, nombre, carrera } = this.state;

    return (
      <div>
        <Button className="Inicio-Boton" style={{ float: 'left', fontSize: '20px', padding: '20px 10px', marginLeft: '20px', marginTop: '20px' }} onClick={() => { window.location.href = '/'; }}>Inicio</Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Typography variant="h4" >Lista de Profesores</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Carrera</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profesores.map((profesor) => (
              <TableRow key={profesor.id}>
                <TableCell>{profesor.id}</TableCell>
                <TableCell>{profesor.nombre}</TableCell>
                <TableCell>{profesor.carrera}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="h4">Crear/Actualizar/Eliminar Profesor</Typography>
        <TextField
          label="ID"
          name="id"
          value={id}
          onChange={this.handleInputChange}
        />

        <Typography variant="h5">Crear/actualizar Profesor</Typography>
        <TextField
          label="Nombre"
          name="nombre"
          value={nombre}
          onChange={this.handleInputChange}
        />
        <TextField
          label="Carrera"
          name="carrera"
          value={carrera}
          onChange={this.handleInputChange}
        />
        <br></br>
        <Button variant="contained" onClick={this.crearProfesor}>
          Crear Profesor
        </Button>
        <Button variant="contained" onClick={this.actualizarProfesor}>
          Actualizar Profesor
        </Button>

        <Typography variant="h5">Eliminar Profesor</Typography>
        <Button variant="contained" onClick={this.eliminarProfesor}>
          Eliminar Profesor
        </Button>
      </div>
    );
  }
}

export default Profesores;
