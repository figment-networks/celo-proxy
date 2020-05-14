/**
 * Get validators by height
 */
const getByHeight = (kit) => async (call, callback) => {
  if (call.request.height != 0) {
    var height = call.request.height;
  }

  try {
    const validatorsWrapper = await kit.contracts.getValidators();
    const validators = await validatorsWrapper.getRegisteredValidators(height);

    callback(null, { validators });
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  getByHeight
};
