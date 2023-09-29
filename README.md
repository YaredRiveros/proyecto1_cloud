# Proyecto parcial - Cloud Computing

## Dependencias
- pip install flask
- pip install flask_mysqldb  <- no lo pude instalar en mi linux (wsl), puede que de problemas en las MV. Podríamos cambiar a otro conector de mysql
- pip install flask_cors

Front end

To create a react project
- npx create-react app


Install

- npm install react-router-dom
- npm install react-modal
- npm install @mui/material
- @mui/icons-material

- pip install flask-cors


## Llamar a las API's desde la nube

### GET
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos

### GET (traer un solo resultado)
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos/codigo
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores/id
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos/codigo

### POST 

- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos (enviar formulario por json)
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores (enviar formulario por json)
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos (enviar formulario por json)

### PUT

- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos/codigo (enviar formulario por json sin el codigo)
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores/id (enviar formulario por json sin el id)
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos/codigo (enviar formulario por json sin el codigo)

### DELETE
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8001/alumnos/codigo
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8002/profesores/id
- http://lb-prod-73038203.us-east-1.elb.amazonaws.com:8003/cursos/codigo
