const hotelsData = {
    "hotel1": [
        {
            "name": "aaaaaaaaaaa",
            "pictures": {
                "photo1": "EEEEEEEEEEE.png",
                "photo2": "DDDDDDDDDDD.png"
            }
        }
    ],
    "hotel2": [
        {
            "name": "bbbbbbbbbbbbbbb",
            "pictures": {
                "photo1": "FFFFFFFFFFF.png",
                "photo2": "GGGGGGGGGGG.png"
            }
        }
    ],
    "hotel3": [
        {
            "name": "cccccccccccccccccccc",
            "pictures": {
                "photo1": "HHHHHHHHHHHH.png",
                "photo2": "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII.png"
            }
        }
    ],
};

function getHotelPhotos(hotelName) {
    const hotel = hotelsData[hotelName];
    if (hotel && hotel.length > 0) {
        return Object.values(hotel[0].pictures);
    }
    return [];
}

module.exports = { getHotelPhotos };
