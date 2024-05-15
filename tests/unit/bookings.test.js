const { getBookedHotels } = require('../../bookings');

test('getBookedHotels_listeDesHotelsReserves_afficherListeDesHotelsReserves', () => {
    const expected = [{ name: "cccccccccccccccccccc", pictures: ["HHHHHHHHHHHH.png", "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII.png"] }];
    expect(getBookedHotels()).toEqual(expected);
});