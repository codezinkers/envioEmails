En este script se emplea el módulo Nodemailer para el envío de correos mediante Node.js
La explicación del set up va dirigida a su instalacion en una distribución GNU/Linux.
En Windows sería muy similar. Para ello hay que abrir la consola pulsar windows + r y escribir cmd. Solo hay que omitir el paso 1

Lo primero es tener instalado Node.js. Para hay que acceder a la terminal.
Si se trabaja en un entorno gráfico, buscar en el panel de búsqueda terminal

1. Actualizamos los paquetes
sudo apt-get upgrade

2. Instalacion de Node.js
sudo apt-get install nodejs (v.8.10.0) Una versión superior no debería afectar.
(En windows) Se puede instalar Node.js mediante su instalador --> https://nodejs.org/es/ Descargar la estable

3. Instalar el modulo convert-csv-to-array
npm i convert-csv-to-array -S (v.1.0.3)

Este modulo nos permite leer un fichero CSV y convertirlo en un array

A continuación hay que poscionarse en la carpeta donde se encuentre el script. Para ello empleamos
el comando cd rutaDirectorio para posicionaros sobre él.

Una vez en la carpeta raiz, ejecutamos el script con el comando node nombreScript.js

IMPORTANTE
==========================
Antes de ejecutarlo, acceder al script y cambiar los valores de la variable usuarioCorreo, que contiene el email del 
remitente, la variable ficheroDatos, que contiene la ruta al fichero csv y también hay que configurar los parámetros de la constante
transporter. Seguir los comentarios explicativos del script
==========================
