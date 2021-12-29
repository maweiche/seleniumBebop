//Import Dependencies
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

//Initialize the driver for the browser --- Chrome
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const driver = new webdriver.Builder().forBrowser('chrome').build();

//Define target element on screen for bot -- in this case the big cookie
driver.wait(webdriver.until.elementLocated({id: 'bigCookie'})); // tells bot to wait until element is found so an error is not returned
const cookieEl = driver.findElement({id: 'bigCookie'}); 
cookieEl.click();

//Create an interval for bot to operate, or else bot will just perform task once
const startInterval = () => {
    const cookieEl = driver.findElement({id: 'bigCookie'});
    setInterval(() => {
        cookieEl.click();
    }, 500); //set for every half second
};

//Create function for bot to GET website
const init = () => {
    driver.get('https://orteil.dashnet.org/cookieclicker/');
    
};

init();

