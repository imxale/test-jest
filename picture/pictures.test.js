const { getHotelPhotos } = require('./pictures');

test('Afficher uniquement la liste des photos d\'un hôtel', () => {
    const expected = ["EEEEEEEEEEE.png", "DDDDDDDDDDD.png"];
    expect(getHotelPhotos("hotel1")).toEqual(expected);
});
