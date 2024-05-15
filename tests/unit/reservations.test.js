const { getReservationList } = require("../../reservations");

function testCheckReservationListVerifyOk(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

function testCheckReservationListVerifyKo(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

testCheckReservationListVerifyOk("Display the reservation list (OK)", () => {
  const expected = ["aaaaaaaaaaa", "bbbbbbbbb", "ccccccccccc"];
  expect(getReservationList()).toEqual(expected);
});

testCheckReservationListVerifyKo("Display the reservation list (KO)", () => {
  const expected = ["fffffff", "sssss", "cdsdazadz"];
  expect(getReservationList()).not.toEqual(expected);
});
