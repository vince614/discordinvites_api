const axios = require('axios');
const config = require('./config.json');

/**
 * API class
 */
class API {

    /**
     * Discordinvites endpoint url
     *
     * @type {string}
     */
    DISCORDINVITES_API_ENDPOINT_URL = 'https://discordinvites.net/api/';

    /**
     * Route configuration
     * @type {string}
     */
    SERVER_ROUTE = 'server';
    USER_ROUTE = 'user';
    REACTION_ROUTE = 'reaction';
    GENERAL_ROUTE = 'general';

    /**
     * Init api
     */
    async init(apiKey) {
        if (!this.axios) {
            this.apiKey = apiKey;
            this.APIUrl = this.DISCORDINVITES_API_ENDPOINT_URL;
            this.axios = axios;
        }
    }

    /**
     * Send post request API
     *
     * @param data
     */
    async sendPostRequest(data = {}) {
        let _self = this;
        return new Promise((resolve, reject) => {
            if (!_self.axios) return reject('Please initialise API with token');
            if (!_self.url) return reject('No url found');
            _self.axios.post(_self.url, data).then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    }

    /**
     * Send get request
     *
     * @param data
     */
    async sendGetRequest(data = {}) {
        let _self = this;
        return new Promise((resolve, reject) => {
            if (!_self.axios) return reject('Please initialise API with token');
            if (!_self.url) return reject('No url found');
            _self.constructGetUrl(data);
            _self.axios.get(_self.url).then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    }

    /**
     *
     * Construct url
     *
     * @param data
     */
    constructGetUrl(data) {
        let i = 0;
        Object.entries(data).forEach(v => {
            this.url += (i === 0) ? `?${v[0]}=${v[1]}` : `&${v[0]}=${v[1]}`;
            i++;
        });
    }

    /**
     * Get user information
     *
     * @param userId
     * @returns {Promise<unknown>}
     */
    async getUserInformation(userId) {
        this.url = `${this.APIUrl}${this.apiKey}/${this.USER_ROUTE}`;
        return await this.sendGetRequest({type: 'user_info', userId: userId});
    }

    /**
     * Get server infos
     *
     * @param guildId
     * @returns {Promise<void>}
     */
    async getServerInformation(guildId) {
        this.url = `${this.APIUrl}${this.apiKey}/${this.SERVER_ROUTE}`;
        return await this.sendGetRequest({type: 'server_info', guildId: guildId});
    }

    /**
     * Update invitation of server
     *
     * @param guildId
     * @param invite
     * @returns {Promise<unknown>}
     */
    async updateInvitation(guildId, invite) {
        this.url = `${this.APIUrl}${this.apiKey}/${this.SERVER_ROUTE}`;
        return await this.sendGetRequest({type: 'server_update_invite', guildId: guildId, invite: invite});
    }

    /**
     *
     * @param guildId
     * @param userId
     * @returns {Promise<void>}
     */
    async sendVote(guildId, userId) {
        this.url = `${this.APIUrl}${this.apiKey}/${this.USER_ROUTE}`;
        return await this.sendPostRequest({type: 'user_send_vote', guildId: guildId, userId: userId});
    }
}
module.exports = API;
