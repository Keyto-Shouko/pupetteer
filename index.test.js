const puppeteer = require("puppeteer");
const assert = require("assert");

const randomNumberToUseInTests = Math.random() * 1000;
// create a date in string format
const date = new Date();
const dateString = date.toISOString().split("T")[0];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://localhost:8000/task/new");
  await page.type("#task_name", "TestTask" + randomNumberToUseInTests);
  await page.type("#task_due_date", dateString);
  await page.click(".btn");
  //select the last row of the table, and get the cell in the second column
  const name = await page.evaluate(() => {
    const rows = document.querySelectorAll("table tr");
    const lastRow = rows[rows.length - 1];
    const cells = lastRow.querySelectorAll("td");
    return cells[1].innerText;
  });

  assert.strictEqual(name, "TestTask" + randomNumberToUseInTests);
  await browser.close();
  console.log("Task correctly added");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
