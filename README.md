# WellDone
Repositorio para proyecto final KC

## Json-Server

Para el poder correr la base de datos de desarrollo se utiliza Json-Server que emula un API en el servidor.

Instalación de Jason-Server:

```script
npm install -g json-server
```
Ejecución de la base de datos (db.json) y arranque del servidor:

```script
json-server -p 4000 db.json
```

Esto arrancará los endpoints del fichero db.json en el puerto 4000 de nuestra máquina local. Podemos acceder al API mediante las URLs que nos facilita: [http://localhost:4000/articulos](http://localhost:4000/articulos)

## Arrancamos proyecto WellDone

Ejecutamos el script:

```script
npm start
```

