import React, { Component } from 'react';
import { TextField, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

class Cursos extends Component {
  constructor() {
    super();
    this.state = {
      cursos: [],
      codigo: '',
      nombre: '',
      creditos: '',
    };
  }

  componentDidMount() {
    this.listarCursos();
  }

  listarCursos = () => {
    fetch('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos')
      .then((response) => response.json())
      .then((data) => {
        // Comprueba si "cursos" existe en la respuesta antes de actualizar el estado
        if (data.cursos && Array.isArray(data.cursos)) {
          this.setState({ cursos: data.cursos });
        } else {
          console.error('La respuesta no contiene un array de cursos válido.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la lista de cursos: ', error);
      });
  }

  crearCurso = () => {
    fetch('http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        codigo: this.state.codigo,
        nombre: this.state.nombre,
        creditos: this.state.creditos,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Curso registrado') {
          alert('Curso registrado exitosamente');
          this.listarCursos();
          this.setState({
            codigo: '',
            nombre: '',
            creditos: '',
          });
        } else {
          alert('Error al registrar el curso');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  actualizarCurso = () => {
    const { codigo } = this.state;
    fetch(`http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos/${codigo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: this.state.nombre,
        creditos: this.state.creditos,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Curso modificado') {
          alert('Curso actualizado exitosamente');
          this.listarCursos();
          this.setState({
            codigo: '',
            nombre: '',
            creditos: '',
          });
        } else {
          alert('Error al actualizar el curso');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  eliminarCurso = () => {
    const { codigo } = this.state;
    fetch(`http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos/${codigo}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje === 'Curso eliminado') {
          alert('Curso eliminado exitosamente');
          this.listarCursos();
          this.setState({
            codigo: '',
          });
        } else {
          alert('Error al eliminar el curso');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { cursos, codigo, nombre, creditos } = this.state;
  
    return (
      <div>
        <Button className="Inicio-Boton" style={{ float: 'left', fontSize: '20px', padding: '20px 10px', marginLeft: '20px', marginTop: '20px' }} onClick={() => { window.location.href = '/'; }}>Inicio</Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
  
        <Typography variant="h4" >Lista de Cursos</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Créditos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.codigo}>
                <TableCell>{curso.codigo}</TableCell>
                <TableCell>{curso.nombre}</TableCell>
                <TableCell>{curso.creditos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
              
        <Typography variant="h4">Crear/Actualizar/Eliminar Curso</Typography>
        <TextField
          label="Código"
          name="codigo"
          value={codigo}
          onChange={this.handleInputChange}
        />
  
        {/* Botón y formulario para Crear curso */}
        <Typography variant="h5">Crear/actualizar Curso</Typography>
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
        <br></br>
        <Button variant="contained" onClick={this.crearCurso}>
          Crear Curso
        </Button>
        <Button variant="contained" onClick={this.actualizarCurso}>
          Actualizar Curso
        </Button>
  
        {/* Botón y formulario para eliminar curso */}
        <Typography variant="h5">Eliminar Curso</Typography>
        <Button variant="contained" onClick={this.eliminarCurso}>
          Eliminar Curso
        </Button>
      </div>
    );
  }
  
}

export default Cursos;
