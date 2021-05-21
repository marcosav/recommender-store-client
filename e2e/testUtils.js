module.exports = {
    buyItems: async () => {
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
    },

    addToCart: async (id, amount = 1) => {
        await page.goto('http://localhost:3000/product/' + id)
        await page.waitForTimeout(300)

        if (amount > 1) {
            await expect(page).toFill('input[name="amount"]', `${amount}`)
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('Enter')
        }

        await expect(page).toClick('#buy-bt')
    },

    createTestUser: async (num = 1) => {
        await expect(page).toClick('#user-nav')
        await expect(page).toClick('#signup-nav-bt')

        const signup = {
            name: 'TEST_USER' + num,
            surname: 'test',
            email: `email_TEST_USER${num}@email.com`,
            repeatedEmail: `email_TEST_USER${num}@email.com`,
            nickname: 'TEST_USER' + num,
            password: '12341234',
            repeatedPassword: '12341234',
        }

        await expect(page).toFillForm('#signup-form', signup)
        await expect(page).toClick('#signup-bt')

        return signup
    },

    createTestProduct: async (product) => {
        await expect(page).toClick('#user-nav')
        await expect(page).toClick('#upload-nav-bt')

        await expect(page).toFillForm('#product-form', product)
        await expect(page).toClick('#publish-bt')

        await page.waitForTimeout(500)

        return parseInt(
            page.url().replace('http://localhost:3000/product/', '')
        )
    },

    deleteProduct: async (id) => {
        await page.goto('http://localhost:3000/product/' + id)
        await page.waitForTimeout(500)

        await expect(page).toClick('#edit-bt')
        await expect(page).toClick('#delete-bt')
    },

    login: async (username, password) => {
        await page.goto('http://localhost:3000/login')
        const login = { username, password }
        await expect(page).toFillForm('#login-form', login)
        await page.keyboard.press('Enter')
        await page.waitForTimeout(500)
    },

    logout: async () => await page.goto('http://localhost:3000/logout'),

    isAtHome: async () =>
        await expect(page).toMatchElement('h1', {
            text: 'What are you buying?',
        }),

    isLoggedIn: async (username) => {
        await page.click('#user-nav')
        await expect(page).toMatchElement('#profile-nav-bt > p', {
            text: username,
        })
    },
}
