const {test,expect}=require('@playwright/test')

test('config-based smoke test',async({page})=>
{
    //navigation relies on baseURL from playwright.config.js
    await page.goto('/login');
    await expect(page).toHaveTitle(/EventHub/i);
    //i is a regular expression flag that stands for case-insensitive.
    expect(page.locator("#email").isVisible());
    expect(page.locator("#login-btn").isVisible());

});

test('page fixture and browser context Test',async ({page,browser})=>
{
     //page fixture gives you one ready-to-use page for the test
     await page.goto("https://eventhub.rahulshettyacademy.com");
     const email=page.locator("#email");
     email.fill("beginner@sample.com");
     await expect(email).toHaveValue('beginner@sample.com');
   
})

test('page fixture and browser context Test2',async ({browser})=>
{
     //browser context is a separate browser session container that can create its own pages
     const isolatedContext = await browser.newContext();
     const isolatedPage = await isolatedContext.newPage();
     await isolatedPage.goto("https://eventhub.rahulshettyacademy.com/login");
     await expect(isolatedPage).toHaveTitle(/EventHub/i);
     expect(isolatedPage.locator("#email")).toHaveValue('');
     await isolatedContext.close();


})

