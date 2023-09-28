import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material'; // Importa los componentes de Material-UI que necesitas

function Home() {
  return (
    <Container maxWidth="md"> {/* Utiliza el componente Container para controlar el ancho del contenido */}
      <Typography variant="h3" component="h3" gutterBottom>
        Bienvenido a la Aplicación de Gestión Escolar
      </Typography>
      <div>
        <Typography variant="h4" component="h4" gutterBottom>
          Menú de Navegación
        </Typography>
        <List>
          <ListItem button component={Link} to="/alumnos">
            <ListItemText primary="Alumnos" />
          </ListItem>
          <ListItem button component={Link} to="/cursos">
            <ListItemText primary="Cursos" />
          </ListItem>
          <ListItem button component={Link} to="/profesores">
            <ListItemText primary="Profesores" />
          </ListItem>
        </List>
      </div>
    </Container>
  );
}

export default Home;
