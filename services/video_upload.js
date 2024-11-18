const fs = require('fs');
const path = require('path');
const {VIDEO_DIRECTORY} = require('../config/proto_path');

const uploadVideo = (call, callback) => {
  let writeStream = null;
  let videoPath = '';
  let receivedChunks = 0;

  console.log("Inicio de recepción de video...");

  call.on('data', (chunk) => {
    if (!writeStream) {
      if (!chunk.uid) {
        console.error('UID no proporcionado.');
        call.emit('error', new Error('El UID del video es obligatorio.'));
        return;
      }

      videoPath = path.join(VIDEO_DIRECTORY, `${chunk.uid}.mp4`);
      writeStream = fs.createWriteStream(videoPath);
      console.log(`Recibiendo video con UID: ${chunk.uid}`);
    }

    receivedChunks++;
    writeStream.write(chunk.chunk);
  });

  call.on('end', () => {
    if (writeStream) {
      writeStream.end();
      console.log(`Video recibido exitosamente. Total de chunks: ${receivedChunks}`);
      console.log('Guardado en:', videoPath);
      callback(null, { message: 'Video uploaded successfully!' });
    } else {
      console.error('No se recibieron datos.');
      callback(new Error('No se recibió ningún video.'));
    }
  });

  call.on('error', (error) => {
    console.error('Error durante la carga del video:', error);
    if (writeStream) {
      writeStream.end();
    }
  });
};

module.exports = {uploadVideo}