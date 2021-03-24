const en = {
    nav: {
        header: 'Shop',
        favorites: 'Favorites',
        upload: 'Upload product',
        logout: 'Logout',
        login: 'Login',
        login_info: 'Login with your account',
        signup: 'Sign up',
        signup_info: 'Not registered? Sign up',
        search: 'Search',
    },
    login: {
        title: 'Log in',
        subtitle: 'Not registered yet? Do it now!',
        field: {
            username: 'Nickname or e-mail',
            password: 'Password',
            incorrect: 'Incorrect user/password',
        },
    },
    signup: {
        title: 'Sign up',
        subtitle: 'Alredy registered?',
        field: {
            name: 'Name',
            surname: 'Surname',
            email: 'E-mail',
            repeatedEmail: 'Repeated e-mail',
            nickname: 'Nickname',
            password: 'Password',
            repeatedPassword: 'Repeated password',
            description: 'Description',
            photo_footer: 'Profile photo (Max 14MB .jpeg, .jpg, .png)',
        },
    },
    cart: {
        empty: 'Cart is empty',
    },
    search: {
        no_results: 'No results',
    },
    product: {
        buy: 'Buy',
        amount: 'Amount',
        no_stock: 'No stock',
    },
    home: {
        title: 'What are you buying?',
        popular: 'Popular',
        recommended: 'Recommended',
    },
    validation: {
        min_length: 'Min allowed length is {0}',
        max_length: 'Max allowed length is {0}',
        mandatory: 'Mandatory field',
        invalid_format: 'Invalid format',
        already_exists: 'Already exists',
        not_matching: 'Fields not matching',
        min: 'Minimum valid value is {0}',
        max: 'Maximum valid value is {0}',
        invalid: 'Invalid value',
        invalid_img_format: 'Invalid format use .jpg, .jpeg o .png',
        max_size: 'Maximum allowed size is {0}MB',
    },
    info: {
        loading: 'Loading...',
        interesting: 'May interest you...',
    },
    error: {
        500: {
            text:
                'Sorry, an error has ocurred, please represh the page and try again!',
        },
        401: {
            text: 'Please log in to do that!',
        },
        other: {
            text: 'An unknown error has ocurred, refresh the page!',
        },
        not_found: 'Not found | 404',
    },
    category: {
        fashion: 'Fashion',
        multimedia: 'Multimedia',
        phones: 'Phones',
        'computers-electronic': 'Computers/Electronic',
        sports: 'Sports',
        games: 'Games',
        home: 'Home',
        others: 'Others',
    },
}

export default Object.freeze({ translation: en })
