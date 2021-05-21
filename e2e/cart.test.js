const {
    createTestProduct,
    deleteProduct,
    login,
    logout,
    createTestUser
} = require('./testUtils')

let testItem1, testItem2, user

const product1 = {
    name: `TEST PRODUCT1`,
    brand: 'TEST PRODUCT1',
    price: '25.5',
    stock: '9999',
    description: 'TEST PRODUCT1',
}

const product2 = {
    name: `TEST PRODUCT2`,
    brand: 'TEST PRODUCT2',
    price: '103',
    stock: '9999',
    description: 'TEST PRODUCT2',
}

jest.setTimeout(10000)

beforeAll(async () => {
    await page.goto('http://localhost:3000')

    user = await createTestUser()

    await login(user.nickname, user.password)
    testItem1 = await createTestProduct(product1)
    testItem2 = await createTestProduct(product2)
    await logout()
})

afterAll(async () => {
    await login(user.nickname, user.password)
    await deleteProduct(testItem1)
    await deleteProduct(testItem2)
    await logout()
})

beforeEach(async () => {
    await page.goto('http://localhost:3000')
})

const tests = async () => {
    it('Add to cart', async () => {
        await page.goto('http://localhost:3000/product/' + testItem1)
        await page.waitForTimeout(300)

        await expect(page).toFill('input[name="amount"]', '3')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')

        await expect(page).toClick('#buy-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('button > span > span > span', {
            text: '1',
        })
    })

    it('Check cart', async () => {
        await expect(page).toClick('#cart-nav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('h2', { text: product1.name })
        await expect(page).toMatchElement('h2', { text: '1 Item' })
        await expect(page).toMatchElement('p', { text: 'Total: 76.5 €' })
        await expect(page).toMatchElement('h6', { text: '76.5 €' })
        await expect(page).toMatchElement('span', { text: '25.5 €/Unit' })
    })

    it('Add to cart 2', async () => {
        await page.goto('http://localhost:3000/product/' + testItem2)
        await page.waitForTimeout(300)

        await expect(page).toClick('#buy-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('button > span > span > span', {
            text: '2',
        })
    })

    it('Check cart 2', async () => {
        await expect(page).toClick('#cart-nav-bt')
        await page.waitForTimeout(500)

        await expect(page).toMatchElement('h2', { text: product2.name })
        await expect(page).toMatchElement('h2', { text: '2 Items' })
        await expect(page).toMatchElement('p', { text: 'Total: 179.5 €' })
        await expect(page).toMatchElement('h6', { text: '103 €' })
        await expect(page).toMatchElement('span', { text: '103 €/Unit' })
    })

    it('Delete cart item', async () => {
        await page.waitForTimeout(500)
        await expect(page).toClick('#cart-nav-bt')

        await page.waitForTimeout(100)
        await page.waitForSelector('#remove-cart-bt')
        const holders = await page.$$('#remove-cart-bt')
        await page.waitForTimeout(100)
        await holders[0].click()

        await page.waitForTimeout(300)

        await expect(page).toMatchElement('h2', { text: '1 Item' })
        await expect(page).toMatchElement('button > span > span > span', {
            text: '1',
        })
        await expect(page).toMatchElement('p', { text: 'Total: 103 €' })

        await expect(page).toMatchElement('h2', { text: product1.name })

        await page.reload()
        await page.waitForTimeout(300)

        try {
            await expect(page).toMatchElement('h2', { text: product1.name })
            fail()
        } catch (ex) {}

        await expect(page).toClick('#remove-cart-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('h2', { text: '0 Item' })
        await expect(page).toMatchElement('p', { text: 'Total: 0 €' })

        await page.reload()
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('p', { text: 'Cart is empty' })
    })
}

describe('Cart with session', () => {
    beforeEach(async () => {
        await login(user.nickname, user.password)
    })

    afterEach(async () => await logout())

    tests()
})

describe('Cart without session', () => {
    tests()
})