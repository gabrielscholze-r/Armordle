import DATA_english from "../../public/data/DATA_enus.json"
import DATA_portuguese from "../../public/data/DATA_ptbr.json"

const getDataEn = () => {
    const filteredData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];
            filteredData[key] = {
                id: key,
                name: item.name,
                description: item.description,
                plaintext: item.plaintext,
                image: item.image,
                gold: item.gold,
                stats: item.stats
            };
        }
    }
    return filteredData;
    
}