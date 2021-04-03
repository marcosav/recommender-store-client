const en = {
    cancel: 'Cancel',
    nav: {
        header: 'Shop',
        favorites: 'Favorites',
        upload: 'Upload product',
        history: 'My orders',
        logout: 'Logout',
        login: 'Login',
        login_info: 'Login with your account',
        signup: 'Sign up',
        signup_info: 'Not registered? Sign up',
        search: 'Search',
        admin: {
            reports: 'Reports',
        },
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
        continue: 'Continue',
    },
    cart: {
        empty: 'Cart is empty',
        title: 'Cart',
        buy: 'Proceed',
        total: 'Total',
        items: 'Items',
        item: 'Item',
        unit: 'Unit',
        unavailable: 'Unavailable',
        no_stock: 'Insufficient stock',
        favorites: 'Your favorites',
        invalid: {
            content:
                'Please check the following items, they are unavailable or there is insufficient stock: ',
            title: 'Invalid products',
            button: 'Got it',
        },
    },
    favorites: {
        title: 'My favorites',
        empty: 'No favorites',
        products: 'Products',
        vendors: 'Vendors',
    },
    profile: {
        empty: 'No products',
        shown: 'Shown',
        hidden: 'Hidden',
        product_title: 'Products',
        edit: {
            title: 'Edit profile',
        },
    },
    search: {
        no_results: 'No results',
        found: 'Found {0} results for "{1}"',
    },
    product: {
        buy: 'Buy',
        amount: 'Amount',
        no_stock: 'Out of stock',
        name: 'Title',
        description: 'Description',
        price: 'Price',
        stock: 'Available stock',
        hidden: 'Hidden',
        category: 'Category',
        edit: 'Edit product',
        publish: 'Publish product',
        save: 'Save',
        delete: 'Delete',
        report: {
            title: 'Report product',
            body:
                'If you think that the content of this product may be inappropriate, please report it to an administrator for review.',
            placeholder: 'Message',
            button: 'Report',
        },
    },
    home: {
        title: 'What are you buying?',
        popular: 'Popular',
        recommended: 'Recommended',
    },
    reports: {
        empty: 'No reports',
        product: 'Product',
        date: 'Date',
        reason: 'Reason',
        title: 'Reports',
    },
    checkout: {
        title: 'Checkout',
        finish: 'Finish',
        success: 'Order #{0} has been successfully completed!',
        empty: "Please check your shopping cart because it's empty!",
        invalid:
            'Please check your shopping cart, there are some problems regarding the availability of some items.',
    },
    address: {
        recipient: 'Full name',
        city: 'City',
        region: 'Region',
        code: 'Zip code',
        country: 'Country',
        address: 'Address',
        phone: 'Phone number',
    },
    history: {
        title: 'Order history',
        empty: 'No products',
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
        already_reported:
            'You have already reported this product, please wait!',
    },
    info: {
        loading: 'Loading...',
        interesting: 'May interest you...',
    },
    error: {
        500: {
            text:
                'Sorry, an error has ocurred, please refresh the page and try again!',
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
