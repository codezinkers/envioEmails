/**
 * @Author: Héctor Lozano Sandoval
 * @Date:   2019-03-27T13:44:22+01:00
 * @Email:  hector.lozsando@codezink.es
 * @Last modified by:   Héctor Lozano Sandoval
 * @Last modified time: 2019-04-04T10:42:39+02:00
 * @Copyright: Copyright (C) 2019 Hector Lozano
 * @Descripcion: Script de Node.js que lee los datos de un fichero CSV y envía
  un e-mail de bienvenida a cada usuario

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Modulos
const nodemailer = require('nodemailer'); // servicio Mails
const fs = require('fs');  // File System
// Constantes de las librerias para la conversion de ficheros csv en array
const { convertCSVToArray } = require('convert-csv-to-array');
const converter = require('convert-csv-to-array');

// Ficheros
var ficheroDatos = '/home/ubuntu/serviciocorreo/mails.csv' // Ruta al fichero CSV

// Mail del remitente
var usuarioCorreo = 'correo@correo.es';

// Constante con los credenciales del emisor del email
const transporter = nodemailer.createTransport({
  service: 'nombreServicioMail', // Por ejemplo, ionos es 1und1. Consultar servicios mensajeria well known
  auth: {
    user: usuarioCorreo, // Correo a usar para el envio
    pass: 'contraseña'
  }
});

// Funcion que lee un fichero csv recibido por parametro y lo transforma en un array
function leerarchivo(fichero){

  if (fichero){
    // Se lee el fichero CSV y se codifica con UTF-8
    fs.readFile(fichero, 'utf-8', (err, datos) => {
  	  if(err) {
  		console.log('error: ', err);
  	  } else {
  		 // Constante que almacena el listado csv en forma de array
  		  const listado = convertCSVToArray(datos, {
  			  type: 'array',
  			  separator: ';', // Establecer el separador del csv (e.g. '\t', ',', ';' ...)
  			});
  			construirMensaje(listado);
  		}
  	});
  } else {
    console.log('No se ha encontrado el fichero. Comprueba si la ruta al fichero es correcta.');
  }
}

// Funcion que recibe un archivo csv como array y manda un email
function construirMensaje(listado){
  if (listado != null){

// Se omite la iteracion de la primera fila, pues son las cabeceras
    for (i = 1; i < listado.length; i++){
      let nombre = listado[i][0];
      let email = listado[i][1];

      // Delay para controlar posibles errores
      setTimeout(() => {
        enviarMail(nombre, email);
      }, 5000);
    }
  } else {
    console.log('Ha ocurrido un error con el fichero CSV...');
  }
}

// Funcion que recibe el nombre y mail del destinatario y le envia un correo
function enviarMail(nombre, destinatario){
  let cuerpoMensaje = 'Saludos ' + nombre + '. Bienvenido a DevAcademy'

  // Variable de configuracion del envio
  let mailOptions = {
    from: "DevAcademy <"+ usuarioCorreo + ">",
    to: destinatario,
    subject: 'El equipo de DevAcademy',
    text: cuerpoMensaje
  }

// Envio del mail. Recibe la configuracion de evío y una función de control de errores
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}

leerarchivo(ficheroDatos);
