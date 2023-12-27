const { default: axios } = require("axios");

const { GIPHY_API, GIPHY_QUERY_MAX_LENGTH } = require("../../config").externalApiConfigs;

class GiphyApiManager {
    static getGif(text) {
        const url = `${GIPHY_API}&rating=pg&limit=1&q=${text.slice(0,GIPHY_QUERY_MAX_LENGTH)}`
        return axios.get(url)
        .then(response => response.data.data[0].images.downsized_large.url)
        .catch(error => {
            console.log("Giphy - Get Error\n", url);
            return null;
        });
    }
}

module.exports = GiphyApiManager;