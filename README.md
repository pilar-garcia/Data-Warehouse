# Proyect-Data-WareHouse (Modo Freelance)

# Objetivo:
Generar una herramienta que permita a una compañía de Marketing administrar todos los contactos de sus clientes para sus campañas.

# Clonar el proyecto desde tu consola:
copia y pega esta línea de comando:

git clone https://github.com/pilar-garcia/Data-Warehouse.git

# El progama consta de una parte frontend y otra backend, que podras ver en el directiorio del que se clono el proyecto
Frontend -> data-warehouse-front
Backend -> data-warehouse-back

# Instalar dependencia:
copia y pega esta línea de comando tanto para la carpeta frontend como la carpeta backend:

npm i 

# Crear Base de Datos:
Existen dos opciones:
1. crear una base de datos con el nombre datawarehouse en el motor mysql, despues crera un usuario de nombre admin y la contraseña datawarehouse.

2. ir al archivo model.js y modificar la conexion a la base de datos por una que se tenga, una vez hecho esto y al ejecutar el proyecto se generaran las tablas necesarias para su funcionamiento.

# Crear usuario con el rol Administrador:
 El sistema unicamente permite registrar usuarios con el rol de Cliente o de Administrador. Por defecto viene con un usuario admin con las siguientes credenciales:
email = admin@admin.co
pass = admin

# Inicia el servidor (Backend)
Tienes varias opciones para iniciar el servidor. Desde tu terminal o editor de código(en la consola) y estando en la carpeta data-warehouse-back puedes introducir cualquiera de estos comandos:

node api.js
nodemon api.js
npm start

Adiconalmente puedes agregar la siguiente coleccion de postman para visualizar el uso adecuado de cada Enpoint:
Para agregar la colecion, debes:
1. ir a la aplicacion de Postman y dar click en File(Archivo).
2. dar click en import(importar) y seleccionar la tercera pestaña(link).
3. copiar y pegar el link acontinuación y dar click en continue(continuar).
https://www.getpostman.com/collections/e74af695931a229422bf

# Inicia el cliente (Frontend)

Desde tu terminal o editor de código(en la consola) y estando en la carpeta data-warehouse-front:

Debes contar con Angular previamente instalado, aqui te la documentacion oficial de como hacerlo:
https://angular.io/guide/setup-local.

lo mas importante es que ejecutes la siguiente linea de comando:
npm install -g @angular/cli

si estas en windows adicionalmente debes ejecutar la siguiente linea de comando en una terminal de powershell con permisos de administrador:
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

ng serve

