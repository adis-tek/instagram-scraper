const puppeteer = require('puppeteer');
const secrets = require('./secrets');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://instagram.com');

  await page.waitForSelector('input');

  const inputs = await page.$$('input');
  await inputs[0].type(secrets.USERNAME);
  await inputs[1].type(secrets.PASSWORD);

  const logInButton = (await page.$$('button'))[1];
  await logInButton.click();
  await page.waitForNavigation();

  const USERNAMES = 'danbilzerian';
  //await page.goto(`https://www.instagram.com/${USERNAME}/`);


  for (let i = 0; i < 1; i++) {
    await page.goto(`https://www.instagram.com/${USERNAMES}/`);
    await page.waitForSelector('img');
    const imgSrc = await page.$eval('img', el => el.getAttribute('src'));
    const headerData = await page.$$eval('header li', els => els.map(el => el.textContent));
    const name = await page.$eval('header h1', el => el.textContent);
    const desc = await page.$$eval('span', els => els[12].textContent);
    const profile = { imgSrc, headerData, name, desc, };
    console.log({ profile });
    await browser.close();
  }






  //   await page.waitForSelector('article a');
  //   await (await page.$('article a')).click();
  //   await page.waitFor(3000);
  //   await (await page.$$('article button'))[2].click();

  //this works on console like button $$('article button')[2].click();

  // xpath button click example (try not to use xpath)
  //   const logInButton = await page.$x('//*[@id="loginForm"]/div/div[3]/button');
  //   logInButton[0].click();

  // await browser.close();
})();