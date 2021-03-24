const es = {
    nav: {
        header: 'Tienda',
        favorites: 'Favoritos',
        upload: 'Publicar producto',
        logout: 'Salir',
        login: 'Iniciar sesión',
        login_info: 'Entra con tu cuenta',
        signup: 'Registrarse',
        signup_info: '¿No tienes? Regístrate',
        search: 'Buscar',
    },
    login: {
        title: 'Inicia sesión',
        subtitle: '¿Aún no te has registrado? ¡Hazlo ya!',
        field: {
            username: 'Seudónimio o correo',
            password: 'Password',
            incorrect: 'Incorrect user/password',
        },
    },
    signup: {
        title: 'Registrar',
        subtitle: '¿Ya estás registrado?',
        field: {
            name: 'Nombre',
            surname: 'Apellidos',
            email: 'Correo electrónico',
            repeatedEmail: 'Repite el correo',
            nickname: 'Seudónimo',
            password: 'Contraseña',
            repeatedPassword: 'Repite contraseña',
            description: 'Descripción',
            photo_footer: 'Foto de perfil (Máx 14MB .jpeg, .jpg, .png)',
        },
    },
    cart: {
        empty: 'Carrito vacío',
    },
    search: {
        no_results: 'Sin resultados',
    },
    product: {
        buy: 'Comprar',
        amount: 'Cantidad',
        no_stock: 'Sin stock',
    },
    home: {
        popular: 'Populares',
        recommended: 'Recomendados',
    },
    validation: {
        min_length: 'Longitud mínima de {0}',
        max_length: 'Longitud máxima de {0}',
        mandatory: 'Campo obligatorio',
        invalid_format: 'Formato inválido',
        already_exists: 'Ya está en uso',
        not_matching: 'Los campos no coinciden',
        min: 'El valor mínimo es {0}',
        max: 'El valor máximo es {0}',
        invalid: 'Valor inválido',
        invalid_img_format: 'Extensión inválida, usa .jpg, .jpeg o .png',
        max_size: 'Tamaño máximo permitido {0}MB',
    },
    info: {
        title: '¿Qué vas a comprar?',
        loading: 'Cargando...',
        interesting: 'Podría interesarte...',
    },
    error: {
        500: {
            text:
                'Lo sentimos, ha ocurrido un error, ¡por favor recarga la página e inténtalo de nuevo!',
        },
        401: {
            text: '¡Inicia sesión para hacer esto!',
        },
        other: {
            text: 'Ha pasado algún error desconocido, recarga la página',
        },
        not_found: 'No encontrado | 404',
    },
    category: {
        fashion: 'Moda',
        multimedia: 'Multimedia',
        phones: 'Teléfonos',
        'computers-electronic': 'Ordenadores/Electrónica',
        sports: 'Deportes',
        games: 'Juegos',
        home: 'Hogar',
        others: 'Otros',
    },
}

export default Object.freeze({ translation: es })
