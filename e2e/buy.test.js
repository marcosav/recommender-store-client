const {
    login,
    logout,
    createTestUser,
    deleteProduct,
    addToCart,
    createTestProduct,
} = require('./testUtils')

const product1 = {
    name: `TEST PRODUCT1`,
    brand: 'TEST PRODUCT1',
    price: '25.5',
    description: 'TEST PRODUCT1',
}

const product2 = {
    name: `TEST PRODUCT2`,
    brand: 'TEST PRODUCT2',
    price: '103',
    stock: '9999',
    description: 'TEST PRODUCT2',
}

jest.setTimeout(60000)

let user, user2, user3, productId1, productId2

beforeAll(async () => {
    await page.goto('http://localhost:3000')
    user = await createTestUser()
    user2 = await createTestUser(2)
    user3 = await createTestUser(3)
    await logout()

    await login(user.nickname, user.password)
    productId1 = await createTestProduct(product1)
    productId2 = await createTestProduct(product2)
    await logout()
})

afterAll(async () => {
    await login(user.nickname, user.password)
    await deleteProduct(productId1)
    await logout()
})

beforeEach(async () => {
    await page.goto('http://localhost:3000')
    await page.waitForTimeout(500)
})

describe('Buy products', () => {
    afterEach(async () => await logout())

    it('No items to buy', async () => {
        await login(user2.nickname, user2.password)

        await page.goto('http://localhost:3000/cart')

        await page.$('button#proceed-bt[disabled]')
    })

    it('Buy with invalid address', async () => {
        await login(user3.nickname, user3.password)

        await addToCart(productId1)
        await page.waitForTimeout(500)
        await addToCart(productId2, 4)
        await page.waitForTimeout(100)

        await page.goto('http://localhost:3000/cart')
        await page.waitForTimeout(500)

        await expect(page).toClick('#proceed-bt')
        await page.waitForTimeout(200)

        await expect(page).toMatchElement('h1', { text: 'Checkout' })
        await expect(page).toMatchElement('p', { text: 'Total: 437.5 €' })
        await expect(page).toMatchElement('p', { text: '2 Items' })

        const address = {
            recipient:
                'Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue Test avenue',
            code: '123451234512345123451234512345123451234512345123451234512345',
            country:
                'SpainSpainSpainSpainSpainSpainSpainSpainSpainSpainSpainSpainSpainSpain',
            phone: '+34 688 88 88 88',
        }
        await expect(page).toFillForm('#address-form', address)

        await expect(page).toClick('#finish-bt')
        await page.waitForTimeout(100)

        await expect(page).toMatchElement('p', {
            text: 'Max allowed length is 100',
        })
        await expect(page).toMatchElement('p', {
            text: 'Max allowed length is 10',
        })
        await expect(page).toMatchElement('p', {
            text: 'Max allowed length is 24',
        })
        await expect(page).toMatchElement('p', {
            text: 'Mandatory field',
        })
    })

    it('Buy"', async () => {
        await login(user2.nickname, user2.password)

        await addToCart(productId1)
        await page.waitForTimeout(500)
        await addToCart(productId2, 4)
        await page.waitForTimeout(100)

        await page.goto('http://localhost:3000/cart')
        await page.waitForTimeout(500)

        await expect(page).toClick('#proceed-bt')
        await page.waitForTimeout(200)

        const address = {
            recipient: 'Test avenue',
            code: '12345',
            city: 'Madrid',
            region: 'CAM',
            country: 'Spain',
            address: 'misco',
            phone: '+34 688 88 88 88',
        }
        await expect(page).toFillForm('#address-form', address)

        await expect(page).toClick('#finish-bt')

        await page.waitForTimeout(400)

        await expect(page).toMatchElement('h1', {
            text: 'Orders',
        })

        const orders = await page.$$('.order-holder')
        const holder = orders[0]

        await expect(holder).toMatchElement('p', { text: '437.5 €' })
        await expect(holder).toMatchElement('p', { text: '2 Items' })

        await expect(holder).toMatchElement('p', { text: address.address })
        await expect(holder).toMatchElement('p', { text: address.city })
        await expect(holder).toMatchElement('p', { text: address.code })
        await expect(holder).toMatchElement('p', { text: address.recipient })
        await expect(holder).toMatchElement('p', { text: address.region })
        await expect(holder).toMatchElement('p', { text: address.phone })
        await expect(holder).toMatchElement('p', { text: address.country })

        await expect(holder).toMatchElement('p', { text: '25.5 €' })
        await expect(holder).toMatchElement('p', { text: '412 €' })

        await expect(holder).toMatchElement('span', { text: 'x1' })
        await expect(holder).toMatchElement('span', { text: 'x4' })
    })

    afterAll(async () => {
        await login(user.nickname, user.password)
        await deleteProduct(productId2)
        await logout()
    })
})

describe('Buy invalid products', () => {
    it('Buy attempt', async () => {
        await login(user3.nickname, user3.password)

        await page.goto('http://localhost:3000/cart')
        await page.waitForTimeout(500)

        await expect(page).toMatchElement('span', { text: 'Out of stock' })
        await expect(page).toMatchElement('p', { text: 'Total: 25.5 €' })
        await expect(page).toMatchElement('h3', { text: 'Unavailable' })
        await expect(page).toMatchElement('p', { text: product2.name })

        await expect(page).toClick('#proceed-bt')
        await page.waitForTimeout(400)

        await expect(page).toMatchElement('p', {
            text: `Please check the following items, they are unavailable or there is insufficient stock: ${product1.name}, ${product2.name}`,
        })

        await expect(page).toClick('#got-it-bt')

        await page.waitForTimeout(200)

        await page.waitForSelector('#remove-cart-bt')
        const holders = await page.$$('#remove-cart-bt')
        await page.waitForTimeout(100)
        await holders[1].click()

        await expect(page).toClick('#proceed-bt')
        await page.waitForTimeout(400)

        await expect(page).toMatchElement('p', {
            text: `Please check the following items, they are unavailable or there is insufficient stock: ${product1.name}`,
        })

        await logout()
    })

    afterAll(async () => {
        await login(user3.nickname, user3.password)

        await page.goto('http://localhost:3000/cart')

        await page.waitForTimeout(200)
        await page.waitForSelector('#remove-cart-bt')
        const holders = await page.$$('#remove-cart-bt')
        await page.waitForTimeout(100)
        await holders[0].click()

        await logout()
    })
})
