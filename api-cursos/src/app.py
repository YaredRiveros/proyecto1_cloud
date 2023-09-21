from flask import Flask, jsonify, request
from flask_mysqldb import MySQL #el editor tira error aca pero no hacer caso
from config import config

app = Flask(__name__)

conexion = MySQL(app)

@app.route('/cursos', methods=['GET'])
def listar_cursos():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT codigo, nombre, creditos FROM cursos"
        cursor.execute(sql)
        datos = cursor.fetchall()
        cursos = []
        for fila in datos:
            curso = {'codigo':fila[0],'nombre':fila[1],"creditos":fila[2]}
            cursos.append(curso)
        return jsonify({'cursos':cursos,'mensaje':"Cursos listados"})
    except Exception as ex:
        return jsonify({"mensaje":"Error"})

@app.route('/cursos/<codigo>',methods=['GET'])
def leer_curso(codigo):
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT codigo, nombre, creditos FROM cursos WHERE codigo={0}".format(codigo)
        cursor.execute(sql)
        datos = cursor.fetchone()
        
        if datos != None:
            curso = {'codigo': datos[0],'nombre':datos[1],'creditos':datos[2]}
            return jsonify({'curso':curso,'mensaje':"Curso encontrado"})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Curso no encontrado"})

@app.route('/cursos',methods=['POST'])
def registrar_curso():
    try:
        cursor = conexion.connection.cursor()
        sql_val = "SELECT * FROM cursos WHERE codigo={0}".format(request.json['codigo'])
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos != None:
            return jsonify({'mensaje':"un curso con el mismo codigo ya ha sido registrado"})

        sql = """INSERT INTO cursos(codigo, nombre, creditos) 
        VALUES ('{0}', '{1}', '{2}')""".format(request.json['codigo'],request.json['nombre'],request.json['creditos'])
        cursor.execute(sql)
        conexion.connection.commit()

        return jsonify({'mensaje':'Curso registrado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})
    
@app.route('/cursos/<codigo>',methods=['DELETE'])
def eliminar_curso(codigo):
    try:
        cursor = conexion.connection.cursor()

        sql_val = "SELECT * FROM cursos WHERE codigo={0}".format(codigo)
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos == None:
            return jsonify({'mensaje':"no existe un curso con el codigo enviado"})


        sql = "DELETE FROM cursos WHERE codigo='{0}'".format(codigo)
        
        cursor.execute(sql)
        conexion.connection.commit()

        return jsonify({'mensaje':'Curso eliminado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})

@app.route('/cursos/<codigo>', methods=['PUT'])
def actualizar_curso(codigo):
    try:
        cursor = conexion.connection.cursor()

        sql_val = "SELECT * FROM cursos WHERE codigo={0}".format(codigo)
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos == None:
            return jsonify({'mensaje':"no existe un curso con el codigo enviado"})


        sql = """UPDATE cursos
        SET nombre='{0}', creditos='{1}' 
        WHERE codigo='{2}'""".format(request.json['nombre'],request.json['creditos'],codigo)
        
        cursor.execute(sql)
        conexion.connection.commit()

        return jsonify({'mensaje':'Curso modificado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})


def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe</h1>",404

if(__name__=='__main__'):
    app.config.from_object(config['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run()