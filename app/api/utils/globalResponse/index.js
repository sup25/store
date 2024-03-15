/**
 *
 * @param {String} message - message to the frontend
 * @param {Object} data - data to be sent to the frontend
 * @param {Number} status
 * @returns
 */
export const internalRes = (message, data, status) => {
  return Response.json(
    {
      message,
      data: { data },
      status,
    },
    {
      status,
    }
  );
};
