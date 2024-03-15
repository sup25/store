/**
 *
 * @param {String} message - message to the frontend
 * @param {Object} data - data to be sent to the frontend
 * @param {Number} status
 * @returns
 */
export const internalRes = (message, data, status) => {
  let resObj = {
    message,
    returnedData: data,
    status,
  };
  if (status >= 400) {
    resObj.error = message;
  }
  return Response.json(resObj, {
    status,
  });
};
