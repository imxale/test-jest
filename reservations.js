const reservationsData = {
    "reservation1": "aaaaaaaaaaa",
    "reservation2": "bbbbbbbbb",
    "reservation3": "ccccccccccc"
};

function getReservationList() {
    return Object.values(reservationsData);
}

module.exports = { getReservationList };
