const { logout, isLoggedIn, isAtHome } = require('./testUtils')

beforeEach(async () => {
    await page.goto('http://localhost:3000')
})

describe('Login', () => {
    it('Is at home page', async () => await isAtHome())

    it('Successfull login', async () => {
        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#login-nav-bt')

        await expect(page).toMatchElement('h1', { text: 'Log in' })

        const login = { username: 'u1', password: '1' }
        await expect(page).toFillForm('#login-form', login)

        await page.keyboard.press('Enter')

        await isAtHome()
        await isLoggedIn(login.username)
    })

    it('Logout', async () => {
        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#logout-nav-bt')

        await isAtHome()
    })

    it('Failed login', async () => {
        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#login-nav-bt')

        await expect(page).toMatchElement('h1', { text: 'Log in' })

        const login = { username: 'asgdfliaugdl', password: '1asdf' }
        await expect(page).toFillForm('#login-form', login)
        await page.keyboard.press('Enter')

        await expect(page).toMatchElement('h1', { text: 'Log in' })
        await expect(page).toMatchElement('p', {
            text: 'Incorrect user/password',
        })
    })
})

describe('Signup', () => {
    beforeEach(async () => {
        await expect(page).toClick('#user-nav')
        await page.waitForTimeout(100)
        await expect(page).toClick('#signup-nav-bt')

        await expect(page).toMatchElement('h1', { text: 'Sign up' })
    })

    const randomNick = `usr${Math.random().toString(16).substr(2, 8)}`
    const randomEmail = `email${Math.random()
        .toString(16)
        .substr(2, 8)}@email.com`

    it('Successfull signup', async () => {
        const signup = {
            name: randomNick,
            surname: 'test',
            email: randomEmail,
            repeatedEmail: randomEmail,
            nickname: randomNick,
            password: '12341234',
            repeatedPassword: '12341234',
            description: 'No mucho',
        }
        await expect(page).toFillForm('#signup-form', signup)
        await expect(page).toClick('#signup-bt')

        await page.waitForTimeout(100)

        await isAtHome()
        await isLoggedIn(signup.username)

        await logout()
    })

    it('Repeated signup user', async () => {
        let signup = {
            name: `${randomNick}-2`,
            surname: 'test2',
            email: randomEmail,
            repeatedEmail: randomEmail,
            nickname: `${randomNick}-2`,
            password: '12341234',
            repeatedPassword: '12341234',
            description: 'No mucho 2',
        }

        await expect(page).toFillForm('#signup-form', signup)
        await expect(page).toClick('#signup-bt')

        await expect(page).toMatchElement('p', {
            text: 'Already exists',
        })

        signup = {
            name: `${randomNick}-2`,
            surname: 'test2',
            email: `${randomEmail}-2`,
            repeatedEmail: `${randomEmail}-2`,
            nickname: randomNick,
            password: '12341234',
            repeatedPassword: '12341234',
            description: 'No mucho 2',
        }

        await expect(page).toFillForm('#signup-form', signup)
        await expect(page).toClick('#signup-bt')

        await expect(page).toMatchElement('p', {
            text: 'Already exists',
        })
    })

    const randomNick2 = `usr${Math.random().toString(16).substr(2, 8)}`
    const randomEmail2 = `email${Math.random()
        .toString(16)
        .substr(2, 8)}@email.com`

    it('Incomplete signup', async () => {
        const signup = {
            email: randomEmail2,
            repeatedEmail: randomEmail2,
            nickname: randomNick2,
            password: '12341234',
            repeatedPassword: 'aaa',
        }
        await expect(page).toFillForm('#signup-form', signup)
        await expect(page).toClick('#signup-bt')

        await expect(page).toMatchElement('p', {
            text: 'Mandatory field',
        })
    })
})
