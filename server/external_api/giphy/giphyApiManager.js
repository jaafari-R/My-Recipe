const { default: axios } = require("axios");

const { GIPHY_API } = require("../../config").externalApiConfigs;

// TODO make query max length
class GiphyApiManager {
    static getGif(text) {
        const url = `${GIPHY_API}&limit=1&q=${text}`
        return axios.get(url)
        .then(response => response.data.data[0].images.original.url)
        .catch(error => {
            console.log("Giphy - Get Error\n", url);
            return null;
        });
    }
}

module.exports = GiphyApiManager;