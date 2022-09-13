//node hackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

//npm init -y
//npm install minimist
//npm install puppeteer

let minimist = require("minimist");
let fs = require("fs");
let puppeteer = require("puppeteer");

let args = minimist(process.argv);
let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);

//async await use krke same kaam kiya
async function kuchBhi() {
  //start the browser
  let browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  //get a tab
  let pages = await browser.pages();
  let page = pages[0];

  //go to url
  await page.goto(args.url);

  //click on login1
  await page.waitForSelector("a[data-event-action='Login']");
  await page.click("a[data-event-action='Login']");

  //click on login2
  await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
  await page.click("a[href='https://www.hackerrank.com/login']");

  //type userid
  await page.waitForSelector("input[name='username']");
  await page.type("input[name='username']", configJSO.userid, { delay: 30 });

  //type password
  await page.waitForSelector("input[name='password']");
  await page.type("input[name='password']", configJSO.password, { delay: 30 });

  //click on login3
  await page.waitForSelector("button[data-analytics='LoginPassword']");
  await page.click("button[data-analytics='LoginPassword']");
}

kuchBhi();
