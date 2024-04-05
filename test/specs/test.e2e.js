const login = require("../pageobjects/jtrack.login");
const keyboard = require("../pageobjects/jtrack.keyboard");
const fixtureFile = require("../fixtures/employeeDetails.json");
const unitFixture = require("../fixtures/unitDetails.json");

describe("Jtrack Login test", () => {
  it("Verify can login to Jtrack", async () => {
    await login.clickTapAnywhereToStart();
    // Driver Identification Page:
    await keyboard.keyboardButtonEnabledIs("BACK", true);
    await keyboard.keyboardButtonEnabledIs("GUEST", true);
    await keyboard.keyboardButtonEnabledIs("NEXT", false);
    await keyboard.keyboardButtonEnabledIs("ABC", false);
    await login.verifyDriverIdentificationPage1Labels();
    await login.enterEmployeeNumber(
      fixtureFile.validEmployee[0].employeeNumber
    );
    await login.verifyEmployeeNumber(
      fixtureFile.validEmployee[0].employeeNumber
    );
    await keyboard.keyboardButtonEnabledIs("BACK", true);
    await keyboard.keyboardButtonEnabledIs("NEXT", true);
    await keyboard.keyboardButtonClick("NEXT");

    await login.verifyDriverIdentificationPage2Labels();
    await login.verifyDriverIdentificationLoginDetails(
      fixtureFile.validEmployee[0].employeeName,
      fixtureFile.validEmployee[0].employeeNumber
    );
    await keyboard.keyboardButtonEnabledIs("CHANGE", true);
    await keyboard.keyboardButtonClick("NEXT");
    // Unit Identification Page:
    await keyboard.keyboardButtonEnabledIs("ABC", true);
    //await login.enterUnitNumber(unitFixture.validUnit[0].unitNumber);
    //Following command deletes the session:
    // await driver.executeScript("mobile: terminateApp", [
    //  { appId: "au.com.jjrichards.jtrack.client" },
    //  ]);
  });
});
