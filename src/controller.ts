/* eslint camelcase:0 */

const marked = require('marked');
const _ = require('lodash');
const MCService = require('./MCService');

const handleError = (req, res) => (error) => {
  if (error.status === 400 && error.data.title === "Invalid Resource") {
    res.status(400).json(error.data);
  } else {
    console.error("Got unexpected error from mailchimp subscribe request. Error was %o, and original config: %o", error, error.config);
    res.status(500).end();
  }
};

module.exports.subscribe = MAILCHIMP_API_KEY => {

  const mcService = new MCService(MAILCHIMP_API_KEY);

  return (req, res) => {
    return mcService.subscribe(req.body)
      .then(() => res.status(201).end())
      .catch(handleError(req, res));
  };
};
