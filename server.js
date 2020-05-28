require('dotenv').config();

const grpc = require('grpc');
const contractKit = require('@celo/contractkit');

const { validatorProto } = require('./grpc/init');
const validatorHandlers = require('./handlers/validator_handlers');

const NODE_URL = process.env.NODE_URL;
const PORT = process.env.PORT || 50051;

function wrapHandler(fn, kit) {
  return (call, callback) => {
    fn(kit, call).then(result => {
        callback(null, result)
    }).catch(error => {
      callback({
        code: error.code || grpc.status.UNKNOWN,
        message: error.message
      })
    });
  };
}

async function init() {
  const server = new grpc.Server();
  const credentials = grpc.ServerCredentials.createInsecure();

  if (!NODE_URL) {
    throw new Error('NODE_URL must be defined');
  }

  const kit = contractKit.newKit(NODE_URL);

  server.addService(validatorProto.ValidatorService.service, {
    getByHeight: wrapHandler(validatorHandlers.getByHeight, kit)
  });

  server.bind(`0.0.0.0:${PORT}`, credentials);
  server.start();
}

init().then(() => {
  console.log('Server started');
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
