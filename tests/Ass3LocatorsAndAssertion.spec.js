const { test, expect } = require('@playwright/test')
test('Locators And Assertion Test', async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com");
  //locate by Id
  await page.locator("#email").fill("testevent@email.com");
  //locate by attribute
  await page.locator("[type='password']").fill("Test@123");
  //locate byRole
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: /browse events/i }).first().click();

  //Assert Upcoming Events
  expect(await page.locator('h1', { hasText: 'Upcoming Events' })).toBeTruthy();
  await page.getByPlaceholder('Search events, venues…').fill("world");
  //Locate the All Categories dropdown and select 'Conference' value.
  const allCategoriesDD = await page.locator("div.flex.flex-col select").first();
  await allCategoriesDD.selectOption('Conference');
  const allCitiesDD = await page.locator("div.flex.flex-col select").last();
  await allCitiesDD.selectOption('Hyderabad');
  const eventCards = await page.locator("h3.font-semibold ");

  //added first card to be visible ,without this step one time executed correctly another time it shows error message,so added wait for firstcard to visible
  await expect(eventCards.first()).toBeVisible();
  const eventCardsCount = await eventCards.count();
  console.log(eventCardsCount);
  //Assert the total matched cards count is at least 1
  await expect(eventCardsCount).toBeGreaterThan(0);


  //Assert the first card is visible 
  const firstEventCard = await eventCards.first();
  await expect(firstEventCard).toBeTruthy();

  //Locate the results based on world /Assert the matching card is visible
  const upcomingEventsFiltered = await page.locator('h3.font-semibold').filter({ hasText: /world/i });
  await expect(upcomingEventsFiltered).toBeTruthy();

  const upcomingEventsFilteredCount = await upcomingEventsFiltered.count();
  console.log(upcomingEventsFilteredCount);

  //Assert the filtered locator count is exactly 1
  expect(upcomingEventsFilteredCount).toBe(1);

  //eventTitle from the heading text
  const eventTitle = await upcomingEventsFiltered.textContent();
  console.log(eventTitle);
  await expect(eventTitle).toEqual('World Tech Summit');
  // visible price text
  const priceText = await page.locator('p').filter({ hasText: '$1,500' });
  const eventPriceText1 = await priceText.textContent();
  console.log(eventPriceText1);

  //Assert eventPriceText contains $
  await expect(priceText).toContainText('$');

  //get the eventseatText
  const eventSeat = await page.locator('span').filter({ hasText: 'seat' }).first();
  const eventSeatText = await eventSeat.textContent();
  console.log(eventSeatText);

  const eventSeatTextParts = eventSeatText.split(" ");
  const eventSeatExtract = eventSeatTextParts.length > 0 ? eventSeatTextParts[0] : "";
  const eventSeatNumExtract = Number(eventSeatExtract);

  console.log(eventSeatNumExtract);

  // Verify it's a valid number and greater than 0
  await expect(eventSeatNumExtract).not.toBeNaN();
  await expect(eventSeatNumExtract).toBeGreaterThan(0);

  //Click on BookNow
  //await upcomingEventsFiltered.getByTestId('book-now-btn').click();
  await page.getByRole('article').filter({ hasText: /world/i }).getByTestId('book-now-btn').click();

  //Assert page url contains events
  await expect(page).toHaveURL(/\/events\//);

  const h1Title = await page.locator("h1.text-2xl").textContent();
  await expect(h1Title).toEqual(eventTitle);

  //const eventPriceText2=await page.locator("p.text-lg.font-bold.text-indigo-700").textContent();
  const eventPrice = page.locator('p').filter({ hasText: '$1,500' });
  const eventPriceText = await eventPrice.textContent();
  console.log(eventPriceText);

  //Assert the Price per ticket section contains eventPriceText
  await expect(eventPriceText).toEqual(eventPriceText1);

  await page.goBack();
  const clearFiltersBtn = await page.getByRole('button', { name: 'Clear filters' });
  if (await clearFiltersBtn.isVisible()) {
    await clearFiltersBtn.click();
    console.log("Filtered Cleared");
  }
  /*await page.reload();
  const clearFiltersBtn2=await page.getByRole('button',{name:'Clear filters'});
  if (await clearFiltersBtn2.isVisible()) {
    await clearFiltersBtn2.click();
    
  }*/

  const updatedeventCards = await page.getByTestId('event-card');
  //const updatedeventCards = await page.locator('h3.font-semibold');
  await expect(updatedeventCards.first()).toBeVisible();

  // Assert the total count
  await expect(updatedeventCards).toHaveCount(3);
  const updatedeventCardsCount = await updatedeventCards.count();

  await console.log(updatedeventCardsCount);

  //get the eventheading1Text
  const eventHeading1 = await page.locator("a h3").first();
  const eventHeading1Text = await eventHeading1.textContent();
  console.log(eventHeading1Text);

  //Get the lastevent headingText
  const eventHeadingLast = await page.locator("a h3").last();
  const eventHeadingLastText = await eventHeadingLast.textContent();
  console.log(eventHeadingLastText);

  //Get the 2nd event headingText
  const eventHeading2 = await page.locator("a h3").nth(1);
  const eventHeading2Text = await eventHeading2.textContent();
  console.log(eventHeading2Text);

  //Assert the first and last titles are not equal
  expect(eventHeading1Text).not.toMatch(eventHeadingLastText);


  //Assert all extracted titles are non-empty strings

  const eventTitles = await page.locator('a h3').allTextContents();

  expect(eventTitles.length).toBeGreaterThan(0);
  //Loops through an array of strings called eventTitles & Ensures each item is actually a text string & Removes any accidental whitespace and checks that the string is not empty.
  for (const title of eventTitles) {
    expect(typeof title).toBe('string');
    expect(title.trim()).not.toBe('');


  }


});









