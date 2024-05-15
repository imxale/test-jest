const { getHotelPhotos } = require("../../pictures");

function testCheckListPictureHotelVerifyOk(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

function testCheckListPictureHotelVerifyKo(description, testFn) {
  test(description, () => {
    try {
      testFn();
    } catch (error) {
      throw new Error(`Test failed: ${description}\n${error.message}`);
    }
  });
}

testCheckListPictureHotelVerifyOk(
  "Display only the list of photos of a hotel (OK)",
  () => {
    const expected = ["EEEEEEEEEEE.png", "DDDDDDDDDDD.png"];
    expect(getHotelPhotos("hotel1")).toEqual(expected);
  }
);

testCheckListPictureHotelVerifyKo(
  "Display only the list of photos of a hotel (KO)",
  () => {
    const expected = ["OZADPOKAZPODK.png", "HUHIH.png"];
    expect(getHotelPhotos()).not.toEqual(expected);
  }
);
