import { expect, test } from '@playwright/test'
import { clearDatabase } from '../utils/database'
import { addTodos } from '../utils/todo'

test.beforeEach(async () => {
  await clearDatabase()
  await addTodos()
})

test('should see the todo list', async ({ page }) => {
  await page.goto('/')

  expect(await page.locator('main > div > h1').textContent()).toEqual('Todos')

  expect(await page.locator('li').count()).toEqual(2)

  expect(await page.locator('li:nth-child(1) > a > h1').textContent()).toEqual('Done')

  expect(await page.locator('li:nth-child(1) > a > p').textContent()).toEqual('This is done')

  expect(await page.locator('li:nth-child(1) > button').textContent()).toEqual('Delete')

  expect(await page.locator('li:nth-child(2) > a > h1').textContent()).toEqual('Finish the Project')

  expect(await page.locator('li:nth-child(2) > a > p').textContent()).toEqual(
    'Complete remaining tasks',
  )

  expect(await page.locator('li:nth-child(2) > button').textContent()).toEqual('Delete')
})

test('should be able to delete the todos', async ({ page }) => {
  await page.goto('/')

  expect(await page.locator('li').count()).toEqual(2)

  await Promise.all([
    page.locator('li:nth-child(1) > button').click(),
    page.waitForResponse(
      (response) =>
        /http:\/\/localhost:8000\/todos\/.*/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'DELETE',
    ),
    page.waitForResponse(
      (response) =>
        response.url() === 'http://localhost:8000/todos' &&
        response.status() === 200 &&
        response.request().method() === 'GET',
    ),
  ])

  expect(await page.locator('li').count()).toEqual(1)

  await Promise.all([
    page.locator('li:nth-child(1) > button').click(),
    page.waitForResponse(
      (response) =>
        /http:\/\/localhost:8000\/todos\/.*/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'DELETE',
    ),
    page.waitForResponse(
      (response) =>
        response.url() === 'http://localhost:8000/todos' &&
        response.status() === 200 &&
        response.request().method() === 'GET',
    ),
  ])

  expect(await page.locator('li').count()).toEqual(0)

  expect(await page.locator('main > div > p').textContent()).toEqual('All done')
})

test('should navigate to the todo page', async ({ page }) => {
  await page.goto('/')

  await page.locator('li:nth-child(1) > a').click()

  await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/todos\/.*/)

  expect(await page.locator('main > div > h1').textContent()).toEqual('Done')

  expect(await page.locator('main > div > p').textContent()).toEqual('This is done')
})

test('should render no todo found error', async ({ page }) => {
  await page.goto('/todos/00000000-0000-0000-0000-000000000000')

  expect(await page.locator('main > p').textContent()).toEqual('No Todo found')
})

test('should render uuid validation error', async ({ page }) => {
  await page.goto('/todos/123')

  const expectedError =
    '[ { "validation": "uuid", "code": "invalid_string", "message": "Invalid uuid", "path": [ "id" ] } ]'

  expect(await page.locator('main > p').textContent()).toEqual(
    JSON.stringify(JSON.parse(expectedError), null, 2),
  )
})
