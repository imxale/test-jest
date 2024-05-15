const { getHotelList } = require("../../hotels");

function testCheckHotelVerifyOk(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

function testCheckHotelVerifyKo(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

testCheckHotelVerifyOk("Display the list of hotels names (OK)", () => {
  const expected = ["aaaaaaaaaaa", "bbbbbbbbb", "ccccccccccc"];
  expect(getHotelList()).toEqual(expected);
});

testCheckHotelVerifyKo("Display the list of hotels names (KO)", () => {
  const expected = ["fffffff", "sssss", "cdsdazadz"];
  expect(getHotelList()).not.toEqual(expected);
});
