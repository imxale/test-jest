const { getReservationList } = require('./reservations');

test('Afficher la liste des réservations', () => {
    const expected = ["aaaaaaaaaaa", "bbbbbbbbb", "ccccccccccc"];
    expect(getReservationList()).toEqual(expected);
});
