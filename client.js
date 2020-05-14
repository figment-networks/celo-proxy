const grpc = require('grpc');
const { validatorProto } = require('./grpc/init');

function main() {
  const url = 'localhost:50051';
  const credentials = grpc.credentials.createInsecure();

  const validatorService = new validatorProto.ValidatorService(url, credentials);

  validatorService.getByHeight({}, (_error, response) => {
    console.log(response);
  });
}

main();
