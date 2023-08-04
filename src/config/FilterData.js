import DATA_english from "../data/DATA_enus.json"
import DATA_portuguese from "../data/DATA_ptbr.json"

const getDataEn = () => {
    const filteredData = {};
    let key = 0;
    for (const itemId in DATA_english.data) {
        if (DATA_portuguese.data.hasOwnProperty(itemId) && DATA_portuguese.data["name"] !== " ") {
            const item = DATA_english.data[itemId];
            if (item.name.trim() !== "") {
                filteredData[key] = {
                    id: itemId,
                    name: item.name,
                    description: item.description,
                    plaintext: item.plaintext,
                    image: item.image,
                    gold: item.gold,
                    stats: item.stats,
                };
                key++;
            }
        }
    }
    return filteredData;
};
const getDataPt = () => {
    const filteredData = {};
    let key = 0;
    for (const itemId in DATA_portuguese.data) {
        if (DATA_portuguese.data.hasOwnProperty(itemId)) {
            const item = DATA_english.data[itemId];
            if (item.name.trim() !== "") {
                filteredData[key] = {
                    id: itemId,
                    name: item.name,
                    description: item.description,
                    plaintext: item.plaintext,
                    image: item.image,
                    gold: item.gold,
                    stats: item.stats,
                };
                key++;
            }
        }
    }
    return filteredData;
};

export {
    getDataEn,
    getDataPt
}