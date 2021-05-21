const {
    login,
    logout,
    createTestUser,
    deleteProduct,
    addToCart,
    createTestProduct,
    buyItems,
} = require('./testUtils')

const product1 = {
    name: `TEST PRODUCT1`,
    brand: 'TEST PRODUCT1',
    price: '25.5',
    description: 'TEST PRODUCT1',
}

jest.setTimeout(60000)

let user, user2, productId1

beforeAll(async () => {
    await page.goto('http://localhost:3000')
    user = await createTestUser()
    user2 = await createTestUser(2)
    await logout()

    await login(user.nickname, user.password)
    productId1 = await createTestProduct(product1)
    await logout()

    await login(user2.nickname, user2.password)
    await addToCart(productId1)
    await page.waitForTimeout(400)
    await buyItems()
    await page.waitForTimeout(400)
    await logout()
})

afterAll(async () => {
    await login(user.nickname, user.password)
    await deleteProduct(productId1)
    await logout()
})

describe('Rate products', () => {
    beforeEach(async () => {
        await login(user2.nickname, user2.password)

        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#history-nav-bt')
        await page.waitForTimeout(100)

        await expect(page).toMatchElement('h1', {
            text: 'Orders',
        })

        await page.waitForTimeout(500)
    })

    afterEach(async () => await logout())

    it('New rating"', async () => {
        const orders = await page.$$('.order-holder')
        const holder = orders[0]

        await expect(holder).toClick('.accordion-expander')

        await page.waitForTimeout(1000)

        await expect(holder).toMatchElement(
            `span.rater > span > label[for=product-rating-${productId1}-4] > span.MuiRating-iconEmpty`
        )

        await rate(productId1, holder, '4')

        await expect(holder).toMatchElement(
            `span.rater > span > label[for=product-rating-${productId1}-4-5] > span.MuiRating-iconEmpty`
        )
    })

    it('Change rating"', async () => {
        const orders = await page.$$('.order-holder')
        const holder = orders[0]

        await expect(holder).toClick('.accordion-expander')

        await page.waitForTimeout(1000)

        await expect(holder).toMatchElement(
            `span.rater > span > label[for=product-rating-${productId1}-2-5] > span.MuiRating-iconFilled`
        )

        await rate(productId1, holder, '2')

        await expect(holder).toMatchElement(
            `span.rater > span > label[for=product-rating-${productId1}-2-5] > span.MuiRating-iconEmpty`
        )
    })
})

const rate = async (id, holder, value) => {
    await expect(holder).toClick(
        `span.rater > span > label[for=product-rating-${id}-${value}]`
    )

    await expect(holder).toMatchElement(
        `span.rater > span > label[for=product-rating-${id}-${value}] > span.MuiRating-iconFilled`
    )
}
