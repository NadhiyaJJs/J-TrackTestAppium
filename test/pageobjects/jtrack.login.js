const { $ } = require("@wdio/globals");
const keyboard = require("../pageobjects/jtrack.keyboard");

class Login {
  /**
   * Define Elements
   */

  entryTextLabel() {
    return $("~CustomEntryControl-Label-EntryTextLabel");
  }

  get tapAnywhereLabel() {
    return $(
      '//android.widget.TextView[@content-desc="AppStartPage-Label-Tap"]'
    );
  }

  get driverIdentificationTitle() {
    return $("~DriverLoginPage-Label-driver_login_title");
  }

  get instructions1() {
    return $("~DriverLoginPage-Label-driver_login_instructions_1");
  }

  get instructions2() {
    return $("~DriverLoginPage-Label-driver_login_instructions_2");
  }

  get driverConfirmationHeading1() {
    return $("~DriverConfirmationPage-Label-driver_confirm_heading-1");
  }

  get driverConfirmationEmployeeNumber() {
    return $("~DriverConfirmationPage-Label-State-EmployeeNumber");
  }

  get driverConfirmationEmployeeName() {
    return $("~DriverConfirmationPage-Label-State-EmployeeName");
  }

  get driverConfirmationEnterNameMessage() {
    return $("~DriverConfirmationPage-Label-driver_confirm_enter_name");
  }

  get confirmUnitIdentification() {
    return $("~UnitConfirmationPage-Label-unit_confirm_changed_heading");
  }

  // METHODS:

  async clickTapAnywhereToStart() {
    await this.tapAnywhereLabel.click();
    await this.driverIdentificationTitle.waitForExist();
  }

  async enterEmployeeNumber(number) {
    const digits = number.split("");
    for (const digit of digits) {
      await keyboard.keyBoardElement(digit).click();
    }
  }

  async verifyEmployeeNumber(number) {
    let enteredText = await this.entryTextLabel().getText();
    await expect(enteredText).toEqual(number);
  }

  async enterUnitNumber(number) {
    let ABC = await keyboard.keyBoardButton("ABC");
    expect(ABC).toBeEnabled();
    const digits = number.split("");
    for (const digit of digits) {
      await keyboard.keyBoardElement(digit).click();
    }
  }
  // -----Verify text - 1 method to find the content-desc label with its text-------//

  //  async verifyLabelText(label,text) {
  // isDisplayed(label);
  // await expect(label).toHaveText(text);
  //}

  //-------------------------//

  async verifyDriverIdentificationPage1Labels() {
    this.instructions1.isDisplayed();
    await expect(this.instructions1).toHaveText(
      "Enter your employee number then press NEXT"
    );
    this.instructions2.isDisplayed();
    await expect(this.instructions2).toHaveText(
      "Press GUEST if you are unsure or your number isn't working"
    );
  }

  async verifyDriverIdentificationPage2Labels() {
    this.driverConfirmationHeading1.isDisplayed();
    await expect(this.driverConfirmationHeading1).toHaveText("Logging in as");

    this.driverConfirmationEnterNameMessage.isDisplayed();
    await expect(this.driverConfirmationEnterNameMessage).toHaveText(
      "Press NEXT if this is correct"
    );
  }

  async verifyDriverIdentificationLoginDetails(employeeName, employeeNumber) {
    await expect(this.driverConfirmationEmployeeName).toHaveText(employeeName);
    await expect(this.driverConfirmationEmployeeNumber).toHaveText(
      employeeNumber
    );
  }
}

module.exports = new Login();
