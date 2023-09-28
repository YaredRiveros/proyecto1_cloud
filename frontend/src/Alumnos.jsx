import React, { Component } from 'react';
import { TextField, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

class Alumnos extends Component {
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
    this.listarAlumnos();
  }

  listarAlumnos = () => {
    fetch('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos')
      .then((response) => response.json())
      .then((data) => {
        // Comprueba si "alumnos" existe en la respuesta antes de actualizar el estado
        if (data.alumnos && Array.isArray(data.alumnos)) {
          this.setState({ alumnos: data.alumnos });
        } else {
          console.error('La respuesta no contiene un array de alumnos válido.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la lista de alumnos: ', error);
      });
  }
  
  

  crearAlumno = () => {
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
    const { alumnos, codigo, nombre, creditos, ciclo, carrera } = this.state;

    return (
      <div>
        <Button className="Inicio-Boton" style={{ float: 'left', fontSize: '20px', padding: '20px 10px', marginLeft: '20px', marginTop: '20px' }} onClick={() => { window.location.href = '/'; }}>Inicio</Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Typography variant="h4" >Lista de Alumnos</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Créditos</TableCell>
              <TableCell>Ciclo</TableCell>
              <TableCell>Carrera</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.codigo}>
                <TableCell>{alumno.codigo}</TableCell>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.creditos}</TableCell>
                <TableCell>{alumno.ciclo}</TableCell>
                <TableCell>{alumno.carrera}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="h4">Crear/Actualizar/Eliminar Alumno</Typography>
        <TextField
          label="Código"
          name="codigo"
          value={codigo}
          onChange={this.handleInputChange}
        />

        {/* Botón y formulario para Crear alumno */}
        <Typography variant="h5">Crear/actualizar Alumno</Typography>
        <TextField
          label="Nombre"
          name="nombre"
          value={nombre}
          onChange={this.handleInputChange}
        />
        <TextField
          label="Créditos"
          name="creditos"
          value={creditos}
          onChange={this.handleInputChange}
        />
        <TextField
          label="Ciclo"
          name="ciclo"
          value={ciclo}
          onChange={this.handleInputChange}
        />
        <TextField
          label="Carrera"
          name="carrera"
          value={carrera}
          onChange={this.handleInputChange}
        />
        <br></br>
        <Button variant="contained" onClick={this.crearAlumno}>
          Crear Alumno
        </Button>
        <Button variant="contained" onClick={this.actualizarAlumno}>
          Actualizar Alumno
        </Button>

      {/* Botón y formulario para eliminar alumno */}
        <Typography variant="h5">Eliminar Alumno</Typography>
        <Button variant="contained" onClick={this.eliminarAlumno}>
          Eliminar Alumno
        </Button>
      </div>
    );
  }
}

export default Alumnos;

