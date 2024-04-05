const { $ } = require("@wdio/globals");

class Keyboard {
  /**
   * Define Elements
   */

  keyBoardElement(digit) {
    const key = $(
      `//android.widget.Button[@content-desc='CustomKeypadButtonControl-Button-CustomKeypadButtonText'] [@text='${digit}']`
    );
    return key;
  }

  keyBoardButton(button) {
    const key = $(`//android.widget.Button[@text='${button}']`);
    return key;
  }

  // METHODS:

  async keyboardButtonEnabledIs(buttonName, btnState) {
    let button = await this.keyBoardButton(buttonName);
    return btnState
      ? await expect(button).toBeEnabled()
      : await expect(button).toBeDisabled();
  }

  async keyboardButtonDisplayedIs(buttonName, btnState) {
    let button = await this.keyBoardButton(buttonName);
    return btnState
      ? await expect(button).toBeDisplayed()
      : await expect(button).not.toBeDisabled();
  }

  async keyboardButtonClick(buttonName) {
    await this.keyBoardButton(buttonName).click();
  }

  // leaving for future:
  // async keyboardNumbers(number) {
  //   const digits = number.split("");
  //   for (const digit of digits) {
  //     const key = $(
  //       `//android.widget.Button[@content-desc='CustomKeypadButtonControl-Button-CustomKeypadButtonText'] [@text='${digit}']`
  //     );
  //     await key.click();
  //   }
  // }
}

module.exports = new Keyboard();
