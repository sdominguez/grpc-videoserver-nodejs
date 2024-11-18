const grpc = require('@grpc/grpc-js');
const fs = require('fs');
const {VIDEO_DIRECTORY, videoProto} = require('./config/proto_path');
const {uploadVideo} = require('./services/video_upload');
const {getVideo} = require('./services/video_download');
require('dotenv').config();

const PORT = process.env.PORT;

const main = () => {
  if (!fs.existsSync(VIDEO_DIRECTORY)) {
    fs.mkdirSync(VIDEO_DIRECTORY);
  }

  const server = new grpc.Server();
  server.addService(videoProto.VideoService.service, { uploadVideo, getVideo });
  server.bindAsync(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
};

main();