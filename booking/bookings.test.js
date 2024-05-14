const { getBookedHotels } = require('./bookings');

test('Afficher uniquement la liste des hôtels réservés', () => {
    const expected = [{ name: "cccccccccccccccccccc", pictures: ["HHHHHHHHHHHH.png", "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII.png"] }];
    expect(getBookedHotels()).toEqual(expected);
});
