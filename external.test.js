const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("safari").build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  };

  it("As a user I want to open localhost and make sure the title is Home", async () => {
    try {
      await driver.get("http://localhost:3000");
      let title = await driver.getTitle();
      assert.strictEqual(title, "Home");
    } catch (error) {
      console.error("Failed in testHomePage:", error);
    }
  });

  it("As a user I want to open the contact page and make sure the title is Contact", async () => {
    try {
      await driver.get("http://localhost:3000/contact");
      let title = await driver.getTitle();
      assert.strictEqual(title, "Contact Us");
    } catch (error) {
      console.error("Failed in testContactPage:", error);
    }
  });

  it("As a user I want to test the input and button response", async () => {
    try {
      await driver.get("http://localhost:3000/contact");
      const email = "test@example.com";
      await driver.findElement(By.id("formInput")).sendKeys(email);
      await driver.findElement(By.id("formSubmit")).click();
      let message = await driver
        .wait(until.elementLocated(By.id("formMessage")), 10000)
        .getText();
      assert.strictEqual(message, `More info coming to ${email}`);
    } catch (error) {
      console.error("Failed in testSignUpForMoreInfo:", error);
    }
  });
});
