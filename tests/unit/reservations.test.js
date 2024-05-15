const { getReservationList } = require('../../reservations');

test('getReservationList_listeDesReservations_afficherListeDesReservations', () => {
    const expected = ["aaaaaaaaaaa", "bbbbbbbbb", "ccccccccccc"];
    expect(getReservationList()).toEqual(expected);
});
