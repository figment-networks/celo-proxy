const grpc = require('grpc');
const { validatorProto } = require('./grpc/init');

function main() {
  const url = 'localhost:50051';
  const credentials = grpc.credentials.createInsecure();

  const validatorService = new validatorProto.ValidatorService(url, credentials);

  validatorService.getByHeight({}, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
  });
}

main();
