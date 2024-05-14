const { getHotelList } = require('./hotels');

test('Afficher la liste des hôtels', () => {
    const expected = ["aaaaaaaaaaa", "bbbbbbbbb", "ccccccccccc"];
    expect(getHotelList()).toEqual(expected);
});
