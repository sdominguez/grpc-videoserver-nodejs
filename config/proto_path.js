const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(process.cwd(), 'video.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const videoProto = grpc.loadPackageDefinition(packageDefinition).video;

const VIDEO_DIRECTORY = path.join('C:/videos_uploaded', 'videos');

module.exports = {
    videoProto,
    VIDEO_DIRECTORY
}