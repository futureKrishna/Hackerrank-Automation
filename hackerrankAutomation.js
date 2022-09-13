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

//if har chiz ka promise nhi chahiye, sidha apna kaam krke chahiye to await use krte hai
//and to use await we have to keep await inside an async function

//bina async await use krke same kaam kiya
// let browserLaunchKaPromise=puppeteer.launch({headless:false});
// browserLaunchKaPromise.then(function(browser){
//     let pagesKaPromise= browser.pages();
//     pagesKaPromise.then(function(pages){
//         let responseKaPromise=pages[0].goto(args.url);
//         responseKaPromise.then(function(response){
//             let closeKaPromise=browser.close();
//             closeKaPromise.then(function(){
//                 console.log("broswer has been closed");
//             })
//         })
//     })
// })

//doing the same above thing with using async-await
//await use krna hai to vo open me nhi reh sakta,usko
//ek async naam k function me dalna padta hai

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

//call kr diya kuchBhi function ko,async function k uppar bhi kr sakte the
//and niche bhi kr sakte hai, dono me chal jayega
kuchBhi();

// Ye sahi se nhi chal rha,last wale login me jake login nhi ho rha
//     let pages=await browser.pages();
//     await pages.goto(args.url);
//     await pages[0].click("li#menu-item-2887");
//     await pages[0].waitForNavigation();
//     await pages[0].click("a.fl-button[href='https://www.hackerrank.com/login' " );
//     await pages[0].waitForNavigation();

//     await pages[0].type("input[name='username']",configJSO.userid);
//     await pages[0].type("input[name='password']",configJSO.password);
//     await browser.close();
//     console.log("browser closed");
// }

//kuchBhi();//call kr diya kuchBhi function ko

/*
(async()=>{
    let browser=await puppeteer.launch({headless:false});
    let page=await browser.newPage();
    await page.goto(args.url);
    await page.screenshot({path:"example.png"});
    await browser.close();
})();
*/
