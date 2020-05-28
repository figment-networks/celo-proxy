const { InvalidArgumentError } = require('../utils/errors');

/**
 * Get validators by height
 */
async function getByHeight(kit, call) {
  if (call.request.height != 0) {
    var height = call.request.height;
  }

  try {
    const validatorsWrapper = await kit.contracts.getValidators();
    const validators = await validatorsWrapper.getRegisteredValidators(height);

    return { validators };
  } catch(error) {
    throw new InvalidArgumentError(error.message);
  }
}

module.exports = {
  getByHeight
};
