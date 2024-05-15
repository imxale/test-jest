const hotelsData = {
    "hotel1": [
        {
            "name": "aaaaaaaaaaa",
            "pictures": {
                "photo1": "EEEEEEEEEEE.png",
                "photo2": "DDDDDDDDDDD.png"
            },
            "book": false
        }
    ],
    "hotel2": [
        {
            "name": "bbbbbbbbbbbbbbb",
            "pictures": {
                "photo1": "FFFFFFFFFFF.png",
                "photo2": "GGGGGGGGGGG.png"
            },
            "book": false
        }
    ],
    "hotel3": [
        {
            "name": "cccccccccccccccccccc",
            "pictures": {
                "photo1": "HHHHHHHHHHHH.png",
                "photo2": "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII.png"
            },
            "book": true
        }
    ],
};

function getBookedHotels() {
    const bookedHotels = [];
    let hasBooking = false;
    for (const hotelName in hotelsData) {
        if (hotelsData.hasOwnProperty(hotelName)) {
            const hotel = hotelsData[hotelName][0];
            if (hotel.book) {
                bookedHotels.push({ name: hotel.name, pictures: Object.values(hotel.pictures) });
                hasBooking = true;
            }
        }
    }
    if (!hasBooking) {
        throw new Error("Vous n'avez fait aucune réservation");
    }
    return bookedHotels;
}

module.exports = { getBookedHotels };
