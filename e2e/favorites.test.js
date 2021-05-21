const {
    login,
    logout,
    createTestUser,
    deleteProduct,
    createTestProduct,
} = require('./testUtils')

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

jest.setTimeout(60000)

let user, user2

beforeAll(async () => {
    await page.goto('http://localhost:3000')
    user = await createTestUser()
    user2 = await createTestUser(2)
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

describe('Favorites (logged in)', () => {
    beforeEach(async () => {
        await login(user2.nickname, user2.password)
    })

    afterEach(async () => await logout())

    it('Add to favorites', async () => {
        await page.goto('http://localhost:3000/product/' + productId1)
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('.favorite-not-selected')

        await expect(page).toClick('#fav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('.favorite-selected')

        await expect(page).toClick('#fav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('.favorite-not-selected')

        await page.reload()
        await page.waitForTimeout(500)

        await expect(page).toMatchElement('.favorite-not-selected')

        await expect(page).toClick('#fav-bt')
    })

    it('Check favorites', async () => {
        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#fav-nav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('span', { text: product1.name })
        await expect(page).toMatchElement('p', { text: '25.5€' })
    })

    it('Add to favorites 2', async () => {
        await page.goto('http://localhost:3000/product/' + productId2)
        await page.waitForTimeout(300)

        await expect(page).toClick('#fav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('.favorite-selected')

        await page.reload()
        await page.waitForTimeout(500)

        await expect(page).toMatchElement('.favorite-selected')
    })

    it('Check favorites 2', async () => {
        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#fav-nav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('span', { text: product1.name })
        await expect(page).toMatchElement('p', { text: '25.5€' })
        await expect(page).toMatchElement('span', { text: product2.name })
        await expect(page).toMatchElement('p', { text: '103€' })
    })

    it('Delete from favorites', async () => {
        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#fav-nav-bt')
        await page.waitForTimeout(300)

        await page.waitForSelector('.holder-fav-bt')
        const holders = await page.$$('.holder-fav-bt')
        await page.waitForTimeout(100)
        await holders[0].click()

        await page.waitForTimeout(300)

        await expect(page).toMatchElement('span', { text: product1.name })
        await expect(page).toMatchElement('span', { text: product2.name })

        await page.reload()
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('span', { text: product1.name })

        try {
            await expect(page).toMatchElement('h2', { text: product2.name })
            fail()
        } catch (ex) {}

        await expect(page).toClick('.holder-fav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('span', { text: product1.name })

        await page.reload()
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('p', { text: 'No favorites' })
    })
})

describe('Favorites (not logged in)', () => {
    it('Add to favorites', async () => {
        await page.goto('http://localhost:3000/product/' + productId1)
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('.favorite-not-selected')

        await expect(page).toClick('#fav-bt')
        await page.waitForTimeout(300)

        await expect(page).toMatchElement('div', {
            text: 'Please log in to do that!',
        })
        await expect(page).toMatchElement('.favorite-not-selected')
    })
})
