const hotelsData = {
    "hotel1": "aaaaaaaaaaa",
    "hotel2": "bbbbbbbbb",
    "hotel3": "ccccccccccc"
};

function getHotelList() {
    if (Object.keys(hotelsData).length === 0) {
        throw new Error("Aucun hôtel disponible");
    }
    return Object.values(hotelsData);
}

module.exports = { getHotelList };
