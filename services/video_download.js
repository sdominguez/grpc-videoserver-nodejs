const fs = require('fs');
const path = require('path');
const VIDEO_DIRECTORY = require('../config/proto_path');

const getVideo = (call) => {
    const { uid } = call.request;
    console.log(`Solicitud para recuperar video con UID: ${uid}`);
  
    const videoPath = path.join(VIDEO_DIRECTORY, `${uid}.mp4`);
    if (!fs.existsSync(videoPath)) {
      console.error(`Video con UID: ${uid} no encontrado.`);
      call.end();
      return;
    }
  
    const readStream = fs.createReadStream(videoPath);
    readStream.on('data', (chunk) => {
      call.write({ chunk });
    });
  
    readStream.on('end', () => {
      console.log(`Video con UID: ${uid} enviado correctamente.`);
      call.end();
    });
  
    readStream.on('error', (error) => {
      console.error('Error al leer el archivo:', error);
      call.end();
    });
  };

module.exports = {getVideo}