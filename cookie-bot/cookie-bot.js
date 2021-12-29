//Import Dependencies
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

//Initialize the driver for the browser --- Chrome
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const driver = new webdriver.Builder().forBrowser('chrome').build();

//=====Additional Feature ======- 'product' buying feature for cookie clicking boosts
//Create function to check if 'products' array is empty, if it isn't then click on it's last element. Why last? This game lists upgrades from worst to best, with a choice between two we will always choose the better upgrade
const checkProducts = async () => {
    //findElements returns Promise opposed to findElement which returns a ready-to-use WebElement. We do not want to assign the 'products' Promise variable, but what the Promise returns instead. 
    //The await in the variable definition forces us to be asynchronous in our funciton
    const products = await driver.findElements({className: 'product unlocked enabled'});
    if (products.length > 0) {
        products.pop().click(); 
    }
}

//Define target element on screen for bot -- in this case the big cookie

const cookieEl = driver.findElement({id: 'bigCookie'}); 
cookieEl.click();

//Create an interval for bot to operate, or else bot will just perform task once
const startInterval = () => {
    const cookieEl = driver.findElement({id: 'bigCookie'});
    setInterval(async () => {
        cookieEl.click();
        await checkProducts(); //checks for 'products' to upgrade
    }, 500); //set for every half second
};

//Create function for bot to initialize
const init = () => {
    driver.get('https://orteil.dashnet.org/cookieclicker/'); //sets bot's target website
    driver.wait(webdriver.until.elementLocated({id: 'bigCookie'})); // tells bot to wait until element is found so an error is not returned
    driver.wait(webdriver.until.elementLocated({className: 'product'})); // again, tells bot to wait until specified object is in DOM
    startInterval();
};

init();

