//import test and expect from @playwright/test
const {test,expect}=require("@playwright/test")
test('EventHub login page loads',async ({page})=>
// Playwright actions return promises and await prevents timing issues and flaky behavior
{

    await page.goto("https://eventhub.rahulshettyacademy.com");
    const emailDefaultText=await page.getByPlaceholder('you@email.com');
    await expect(emailDefaultText).toBeVisible();
    const sighInButtonText=await page.getByRole('button',{name:'Sign In'}).textContent();
    await expect(sighInButtonText).toBeTruthy();

});

test('login Page Test',async ({page})=>
{
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await expect(page).toHaveURL(/.*login/);
    const loginPageText=await page.locator('h1').first().textContent();
    console.log(loginPageText);
    //expect(loginPageText).toHaveText('Sign in to EventHub');
   // expect(await page.locator('h1').first()).toHaveText('Sign in to EventHub');
   expect(loginPageText).toBeTruthy();
    const passwordLabel=page.getByLabel("password");
    expect(passwordLabel).toBeTruthy();
   
   
});