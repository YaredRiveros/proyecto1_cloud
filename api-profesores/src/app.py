from flask import Flask, jsonify, request
from flask_mysqldb import MySQL #el editor tira error aca pero no hacer caso
from config import config

app = Flask(__name__)

conexion = MySQL(app)

@app.route('/profesores', methods=['GET'])
def listar_profesores():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT id, nombre, carrera FROM profesores"
        cursor.execute(sql)
        datos = cursor.fetchall()
        profesores = []
        for fila in datos:
            profesor = {'id':fila[0],'nombre':fila[1],"carrera":fila[2]}
            profesores.append(profesor)
        return jsonify({'profesores':profesores,'mensaje':"Profesores listados"})
    except Exception as ex:
        return jsonify({"mensaje":"Error"})

@app.route('/profesores/<id>',methods=['GET'])
def leer_profesor(id):
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT id, nombre, carrera FROM profesores WHERE id={0}".format(id)
        cursor.execute(sql)
        datos = cursor.fetchone()
        
        if datos != None:
            profesor = {'id': datos[0],'nombre':datos[1],'carrera':datos[2]}
            return jsonify({'profesor':profesor,'mensaje':"Profesor encontrado"})
        else:
            return jsonify({'mensaje':'Profesor no encontrado'})
    except Exception as ex:
        print("exception:", ex)
        return jsonify({'mensaje':"Profesor no encontrado"})

@app.route('/profesores',methods=['POST'])
def registrar_profesor():
    try:
        cursor = conexion.connection.cursor()
        sql_val = "SELECT * FROM profesores WHERE id={0}".format(request.json['id'])
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos != None:
            return jsonify({'mensaje':"un profesor con el mismo codigo ya ha sido registrado"})

        sql = """INSERT INTO profesores(id, nombre, carrera) 
        VALUES ('{0}', '{1}', '{2}')""".format(request.json['id'],request.json['nombre'],request.json['carrera'])
        cursor.execute(sql)
        conexion.connection.commit()

        return jsonify({'mensaje':'Profesor registrado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})
    
@app.route('/profesores/<id>',methods=['DELETE'])
def eliminar_profesor(id):
    try:
        cursor = conexion.connection.cursor()

        sql_val = "SELECT * FROM profesores WHERE id={0}".format(id)
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos == None:
            return jsonify({'mensaje':"no existe un profesor con el id enviado"})


        sql = "DELETE FROM profesores WHERE id='{0}'".format(id)
        
        cursor.execute(sql)
        conexion.connection.commit()

        return jsonify({'mensaje':'Profesor eliminado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})

@app.route('/profesores/<id>', methods=['PUT'])
def actualizar_profesor(id):
    try:
        cursor = conexion.connection.cursor()

        sql_val = "SELECT * FROM profesores WHERE id={0}".format(id)
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos == None:
            return jsonify({'mensaje':"no existe un profesor con el id enviado"})


        sql = """UPDATE profesores
        SET nombre='{0}', carrera='{1}' 
        WHERE id='{2}'""".format(request.json['nombre'],request.json['carrera'],id)
        
        cursor.execute(sql)
        conexion.connection.commit()

        return jsonify({'mensaje':'Profesor modificado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})


def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe</h1>",404

if(__name__=='__main__'):
    app.config.from_object(config['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run()