from flask import Flask, jsonify, request
# from flask_mysqldb import MySQL #el editor tira error aca pero no hacer caso
from flaskext.mysql import MySQL

app = Flask(__name__)

#Create an instance of MySQL
mysql = MySQL()

#Set database credentials in config.
app.config['MYSQL_DATABASE_USER'] = 'admin'
app.config['MYSQL_DATABASE_PASSWORD'] = 'lVqArHhM1o4ZMzivVsaD'
app.config['MYSQL_DATABASE_DB'] = 'universidad'
app.config['MYSQL_DATABASE_HOST'] = 'database-1.czslunqzhzce.us-east-1.rds.amazonaws.com'

#Initialize the MySQL extension
mysql.init_app(app)

@app.route('/alumnos', methods=['GET'])
def listar_alumnos():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        sql = "SELECT codigo, nombre, creditos, ciclo, carrera FROM alumnos"
        cursor.execute(sql)
        datos = cursor.fetchall()
        alumnos = []
        for fila in datos:
            alumno = {'codigo':fila[0],'nombre':fila[1],"creditos":fila[2],"ciclo":fila[3],"carrera":fila[4]}
            alumnos.append(alumno)
        return jsonify({'alumnos':alumnos,'mensaje':"Alumnos listados"})
    except Exception as ex:
        print(ex)
        return jsonify({"mensaje":"Error"})

@app.route('/alumnos/<codigo>',methods=['GET'])
def leer_alumno(codigo):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        sql = "SELECT codigo, nombre, creditos, ciclo, carrera FROM alumnos WHERE codigo={0}".format(codigo)
        cursor.execute(sql)
        datos = cursor.fetchone()
        
        if datos != None:
            alumno = {'codigo': datos[0],'nombre':datos[1],'creditos':datos[2], 'ciclo':datos[3],'carrera':datos[4]}
            return jsonify({'alumno':alumno,'mensaje':"Alumno encontrado"})
        else:
            return jsonify({'mensaje':'Alumno no encontrado'})
    except Exception as ex:
        print("exception:", ex)
        return jsonify({'mensaje':"Alumno no encontrado"})

@app.route('/alumnos',methods=['POST'])
def registrar_alumno():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        sql_val = "SELECT * FROM alumnos WHERE codigo={0}".format(request.json['codigo'])
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos != None:
            return jsonify({'mensaje':"un alumno con el mismo codigo ya ha sido registrado"})

        sql = """INSERT INTO alumnos(codigo, nombre, creditos,ciclo,carrera) 
        VALUES ('{0}', '{1}', '{2}', '{3}','{4}')""".format(request.json['codigo'],request.json['nombre'],request.json['creditos'],request.json['ciclo'],request.json['carrera'])
        cursor.execute(sql)
        conn.commit()

        return jsonify({'mensaje':'Alumno registrado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})
    
@app.route('/alumnos/<codigo>',methods=['DELETE'])
def eliminar_alumno(codigo):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()

        sql_val = "SELECT * FROM alumnos WHERE codigo={0}".format(codigo)
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos == None:
            return jsonify({'mensaje':"no existe un alumno con el codigo enviado"})


        sql = "DELETE FROM alumnos WHERE codigo='{0}'".format(codigo)
        
        cursor.execute(sql)
        conn.commit()

        return jsonify({'mensaje':'Alumno eliminado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})

@app.route('/alumnos/<codigo>', methods=['PUT'])
def actualizar_alumno(codigo):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()

        sql_val = "SELECT * FROM alumnos WHERE codigo={0}".format(codigo)
        cursor.execute(sql_val)
        datos = cursor.fetchone()

        if datos == None:
            return jsonify({'mensaje':"no existe un alumno con el codigo enviado"})


        sql = """UPDATE alumnos
        SET nombre='{0}', creditos='{1}', ciclo='{2}', carrera='{3}' 
        WHERE codigo='{4}'""".format(request.json['nombre'],request.json['creditos'],request.json['ciclo'],request.json['carrera'],codigo)
        
        cursor.execute(sql)
        conn.commit()

        return jsonify({'mensaje':'Alumno modificado'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje':"Error"})


def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe</h1>",404

if(__name__=='__main__'):
    # app.config.from_object(config['development'])
    app.register_error_handler(404,pagina_no_encontrada)
    app.run(host='0.0.0.0',port=8000,debug=True)