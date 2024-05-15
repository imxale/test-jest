const { getHotelPhotos } = require('../../pictures');

test('getHotelPhotos_listeDesPhotos_afficherListeDesPhotos', () => {
    const expected = ["EEEEEEEEEEE.png", "DDDDDDDDDDD.png"];
    expect(getHotelPhotos("hotel1")).toEqual(expected);
});
