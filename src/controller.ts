/* eslint camelcase:0 */

const _ = require('lodash');
import { Opts, MCService } from './service';

const handleError = (req: Request, res: Response) => (error) => {
  if (error.status === 400 && error.data.title === "Invalid Resource") {
    res.status(400).json(error.data);
  } else {
    console.error(`Got unexpected error from mailchimp subscribe request. Error was ${ error }, and original config ${ error.config }`);
    res.status(500).end();
  }
};

module.exports.subscribe = (opts: Opts) => {

  const mcService = new MCService(opts);

  return (req: Request, res: Response) => {
    return mcService.subscribe(req.body)
      .then(() => res.status(201).end())
      .catch(handleError(req, res));
  };
};
