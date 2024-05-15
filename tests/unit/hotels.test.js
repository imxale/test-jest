const { getHotelList } = require('../../hotels');

test('getHotelList_listeDesHotels_afficherListeDesHotels', () => {
    const expected = ["aaaaaaaaaaa", "bbbbbbbbb", "ccccccccccc"];
    expect(getHotelList()).toEqual(expected);
});
