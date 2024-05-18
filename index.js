const puppeteer = require("puppeteer");
let randomNumber = Math.floor(Math.random() * 1000000);
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:8000/register");
  await page.screenshot({ path: "register_page.png" });
  await page.click("#registration_form_email");
  await page.type(
    "#registration_form_email",
    "this_is_a_test_mail" + randomNumber
  );
  await page.screenshot({ path: "form_with_id.png" });
  await page.click("#registration_form_plainPassword");
  await page.type(
    "#registration_form_plainPassword",
    "this_is_a_test_password" + randomNumber
  );
  await page.screenshot({ path: "form_with_password.png" });
  await page.click("#registration_form_agreeTerms");
  await page.click(".btn");
  await page.screenshot({ path: "form_submitted.png" });
  await browser.close();
})();
