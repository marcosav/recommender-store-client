const { login, logout, createTestUser } = require('./testUtils')

let user, user2, id

beforeAll(async () => {
    await page.goto('http://localhost:3000')

    user = await createTestUser()
    user2 = await createTestUser(2)

    await logout()
})

beforeEach(async () => {
    await page.goto('http://localhost:3000')
})

afterEach(async () => await logout())

describe('Add product', () => {
    beforeEach(async () => {
        await login(user.nickname, user.password)

        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#upload-nav-bt')

        await expect(page).toMatchElement('h1', { text: 'Publish product' })
    })

    it('Create product"', async () => {
        const product = {
            name: `prod${Math.random().toString(16).substr(2, 8)}`,
            brand: 'Test',
            price: '10.5',
            stock: '9',
            description: 'This is a test item',
        }
        await expect(page).toFillForm('#product-form', product)

        await expect(page).toClick('#publish-bt')

        await expect(page).toMatchElement('h1', { text: product.name })
        await expect(page).toMatchElement('h2', { text: product.brand })
        await expect(page).toMatchElement('h6', { text: `${product.price} €` })
        await expect(page).toMatchElement('p', { text: product.description })
        await expect(page).toMatchElement('a', { text: user.nickname })
        await expect(page).toMatchElement('span', { text: 'Fashion' })

        await page.waitForTimeout(500)

        id = parseInt(page.url().replace('http://localhost:3000/product/', ''))

        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#profile-nav-bt')

        await expect(page).toMatchElement('h2', { text: 'Products' })
        await expect(page).toMatchElement('span', { text: product.name })
    })

    it('Create incomplete product"', async () => {
        const product = {
            name: 'shrt',
            price: '0',
            stock: '-1',
        }
        await expect(page).toFillForm('#product-form', product)

        await page.waitForTimeout(100)
        await expect(page).toClick('#publish-bt')

        await expect(page).toMatchElement('p', {
            text: 'Min allowed length is 5',
        })
        await expect(page).toMatchElement('p', {
            text: 'Mandatory field',
        })
        await expect(page).toMatchElement('p', {
            text: 'Minimum valid value is 0',
        })
    })
})

describe('View product (not owner)', () => {
    it('View', async () => {
        await login(user2.nickname, user2.password)

        await page.goto('http://localhost:3000/product/' + id)
        await page.waitForTimeout(300)
        
        try {
            await expect(page).toClick('#edit-bt')
            fail()
        } catch (ex) {}
    })
})

describe('Edit product', () => {
    beforeEach(async () => {
        await login(user.nickname, user.password)

        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#profile-nav-bt')

        await expect(page).toMatchElement('h2', { text: 'Products' })

        await page.waitForSelector('button.product')
        const holders = await page.$$('button.product')
        await holders[0].click()
        await page.waitForTimeout(100)
        await holders[0].press('Enter')

        await page.waitForTimeout(300)

        await expect(page).toClick('#edit-bt')

        await expect(page).toMatchElement('h1', { text: 'Edit product' })
    })

    it('Edit and view product', async () => {
        const product = {
            name: `eprod${Math.random().toString(16).substr(2, 8)}`,
            brand: `prod${Math.random().toString(16).substr(2, 8)}`,
            price: (Math.random() * 100).toString(),
            stock: '1',
            description: 'This is an EDITED test item ' + Math.random(),
        }
        await expect(page).toFillForm('#product-form', product)

        await expect(page).toClick('#publish-bt')

        const shownPrice = Math.round(product.price * 100) / 100

        await expect(page).toMatchElement('h1', { text: product.name })
        await expect(page).toMatchElement('h2', { text: product.brand })
        await expect(page).toMatchElement('h6', { text: `${shownPrice} €` })
        await expect(page).toMatchElement('p', { text: product.description })
        await expect(page).toMatchElement('a', { text: user.nickname })
        await expect(page).toMatchElement('span', { text: 'Fashion' })

        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#profile-nav-bt')

        await expect(page).toMatchElement('h2', { text: 'Products' })
        await expect(page).toMatchElement('span', { text: product.name })
        await expect(page).toMatchElement('p', { text: `${shownPrice}€` })
    })

    it('Delete product', async () => {
        await expect(page).toClick('#delete-bt')

        try {
            await expect(page).toMatchElement('span', { text: product.name })
            fail()
        } catch (ex) {}
    })
})
