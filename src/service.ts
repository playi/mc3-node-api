const axios = require('axios');
crypto = require('crypto');

const md5 = (str = "") => crypto.createHash("md5").update(str.toLowerCase()).digest("hex");

class MCService {
  constructor (MAILCHIMP_API_KEY) {
    if (!MAILCHIMP_API_KEY) {
      throw new Error('must provide Mailchimp API key')
    }

    this.MAILCHIMP_API_KEY = MAILCHIMP_API_KEY;
    this.MAILCHIMP_DATACENTER = this.MAILCHIMP_API_KEY.split('-')[1];
    this.MAILCHIMP_ENDPOINT = `https://playi:${ this.MAILCHIMP_API_KEY }@${ this.MAILCHIMP_DATACENTER }.api.mailchimp.com/3.0`;
  }
  subscribe (body) {
    const hash = md5(body.email_address);
    return axios.put(`${ this.MAILCHIMP_ENDPOINT }/lists/${ this.MAILCHIMP_TEACHER_MAILING_LIST }/members/${ hash }`, body);
  } 
}

module.exports = MCService;