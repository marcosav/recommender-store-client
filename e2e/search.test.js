const {
    login,
    logout,
    createTestUser,
    deleteProduct,
    createTestProduct,
    isAtHome,
} = require('./testUtils')

const product1 = {
    name: `TE___ST PRODUCT`,
    brand: 'TEST PRODUCT',
    price: '173',
    stock: '9999',
    description: 'TEST PRODUCT',
}

const product2 = {
    name: `ABCTE___ST PRODUCTABC`,
    brand: 'TEST PRODUCT',
    price: '123',
    stock: '9999',
    description: 'TEST PRODUCT',
}

jest.setTimeout(30000)

let user, productId1, productId2

beforeAll(async () => {
    await page.goto('http://localhost:3000')
    user = await createTestUser()
    await logout()

    await login(user.nickname, user.password)
    productId1 = await createTestProduct(product1)
    productId2 = await createTestProduct(product2)
    await logout()
})

afterAll(async () => {
    await login(user.nickname, user.password)
    await deleteProduct(productId1)
    await page.waitForTimeout(500)
    await deleteProduct(productId2)
    await logout()
})

beforeEach(async () => {
    await page.goto('http://localhost:3000')
    await page.waitForTimeout(500)
})

describe('Search', () => {
    it('Blank', async () => {
        await expect(page).toFill('input#search-input', ' ')
        await page.keyboard.press('Enter')

        await page.waitForTimeout(500)

        await isAtHome()
    })

    it('No results', async () => {
        await expect(page).toFill(
            'input#search-input',
            'SEA$$.RCH_AsdfAfafofg p7 fgp p'
        )
        await page.keyboard.press('Enter')

        await page.waitForTimeout(500)

        await expect(page).toMatchElement('p', { text: 'No results' })
        await expect(page).toMatchElement('h1', {
            text: 'Found 0 results for "SEA$$.RCH_AsdfAfafofg p7 fgp p"',
        })
    })

    it('One result', async () => {
        await expect(page).toFill('input#search-input', 'ABCTE___ST PRODUCTABC')
        await page.keyboard.press('Enter')

        await page.waitForTimeout(500)

        await expect(page).toMatchElement('h1', {
            text: 'Found 1 results for "ABCTE___ST PRODUCTABC"',
        })
    })

    it('More result', async () => {
        await expect(page).toFill('input#search-input', 'TE___ST PRODUCT')
        await page.keyboard.press('Enter')

        await page.waitForTimeout(500)

        await expect(page).toMatchElement('h1', {
            text: 'Found 2 results for "TE___ST PRODUCT"',
        })
    })
})
