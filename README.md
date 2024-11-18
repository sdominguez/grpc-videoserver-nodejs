# gRPC Video Server

A gRPC-based video server that allows video upload and retrieval via streaming. Built using Node.js, `@grpc/grpc-js`, and `@grpc/proto-loader`.

## Features

- **Upload Video**: Streams video data from the client to the server, saving the uploaded video to a specified directory.
- **Retrieve Video**: Streams video data from the server to the client based on a unique video identifier (UID).

## Requirements

- Node.js (v20)
- npm (comes with Node.js installation)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/grpc-video-server.git
2. Navigate to the project directory:
   ```bash
   cd grpc-video-server
3. Install dependencies
   ```bash
   npm install
