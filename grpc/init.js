const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const defaultOptions = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

// Validator
const packageDefinition = protoLoader.loadSync('./grpc/validator.proto', defaultOptions);
const validatorProto = grpc.loadPackageDefinition(packageDefinition).validator;

module.exports = {
  validatorProto
};
