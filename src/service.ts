const axios = require('axios');
const crypto = require('crypto');

const md5 = (str: string = "") => crypto.createHash("md5").update(str.toLowerCase()).digest("hex");

export interface Opts {
  MAILCHIMP_API_KEY: string,
  listId: string
}

export interface SubscribeInfo {
  email_address: string
}

export class MCService {
  private MAILCHIMP_DATACENTER: string;
  private MAILCHIMP_ENDPOINT: string;
  private MAILCHIMP_API_KEY: string;
  private listId: string;

  constructor (opts: Opts) {

    if (!opts.MAILCHIMP_API_KEY) {
      throw new Error('must provide Mailchimp API key');
    }

    if (!opts.listId) {
      throw new Error('must provide list id');
    }

    this.MAILCHIMP_API_KEY = opts.MAILCHIMP_API_KEY;
    this.MAILCHIMP_DATACENTER = this.MAILCHIMP_API_KEY.split('-')[1];
    this.MAILCHIMP_ENDPOINT = `https://playi:${ this.MAILCHIMP_API_KEY }@${ this.MAILCHIMP_DATACENTER }.api.mailchimp.com/3.0`;
    this.listId = opts.listId;
  }

  subscribe (info: SubscribeInfo) {
    const hash = md5(info.email_address);
    info.status = 'subscribed';
    return axios.put(`${ this.MAILCHIMP_ENDPOINT }/lists/${ this.listId }/members/${ hash }`, info);
  } 
}