const { getBookedHotels } = require("../../bookings");

function testCheckBookedHotelsVerifyOk(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

function testCheckBookedHotelsVerifyKo(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

testCheckBookedHotelsVerifyOk("Display the booked hotels list (OK)", () => {
  const expected = [
    {
      name: "cccccccccccccccccccc",
      pictures: ["HHHHHHHHHHHH.png", "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII.png"],
    },
  ];
  expect(getBookedHotels()).toEqual(expected);
});

testCheckBookedHotelsVerifyKo("Display the booked hotels list (KO)", () => {
  const expected = ["fffffff", "sssss", "cdsdazadz"];
  expect(getBookedHotels()).not.toEqual(expected);
});
