const es = {
    cancel: 'Cancelar',
    nav: {
        header: 'Tienda',
        favorites: 'Favoritos',
        upload: 'Publicar producto',
        history: 'Mis pedidos',
        logout: 'Salir',
        login: 'Iniciar sesión',
        login_info: 'Entra con tu cuenta',
        signup: 'Registrarse',
        signup_info: '¿No tienes? Regístrate',
        search: 'Buscar',
        admin: {
            reports: 'Reportes',
        },
    },
    login: {
        title: 'Inicia sesión',
        subtitle: '¿Aún no te has registrado? ¡Hazlo ya!',
        field: {
            username: 'Seudónimio o correo',
            password: 'Contraseña',
            incorrect: 'Usuario o contraseña incorrectos',
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
        continue: 'Continuar',
    },
    cart: {
        empty: 'Carrito vacío',
        title: 'Carrito',
        buy: 'Proceder',
        total: 'Total',
        items: 'Ítems',
        item: 'Ítem',
        unit: 'Unidad',
        unavailable: 'No disponible ya',
        no_stock: 'Stock insuficiente',
        favorites: 'Tus favoritos',
        content: {
            invalid:
                'Por favor revisa los siguientes items del carrito, ya no están disponibles o no hay suficiente stock: ',
            title: 'Productos inválidos',
            button: 'Entendido',
        },
    },
    favorites: {
        title: 'Mis favoritos',
        empty: 'No hay favoritos',
        products: 'Productos',
        vendors: 'Vendedores',
    },
    profile: {
        empty: 'No hay productos',
        shown: 'Visibles',
        hidden: 'Ocultos',
        product_title: 'Productos',
        edit: {
            title: 'Editar perfil',
        },
    },
    search: {
        no_results: 'Sin resultados',
        found: 'Encontrados {0} resultados para "{1}"',
        filter: {
            date: 'Más recientes',
            price_down: 'Precio descendente',
            price_up: 'Precio ascendente',
        },
    },
    product: {
        buy: 'Comprar',
        amount: 'Cantidad',
        no_stock: 'Agotado',
        name: 'Título',
        brand: 'Marca',
        description: 'Descripción',
        price: 'Precio',
        stock: 'Stock disponible',
        hidden: 'Hidden',
        category: 'Categoría',
        edit: 'Editar producto',
        publish: 'Publicar producto',
        save: 'Guardar',
        delete: 'Borrar',
        report: {
            title: 'Reportar producto',
            body:
                'Si consideras que el contenido de este producto puede ser inadeacuado, repórtalo para que lo revise un administrador.',
            placeholder: 'Mensaje',
            button: 'Reportar',
        },
    },
    home: {
        title: '¿Qué vas a comprar?',
        popular: 'Populares',
        recommended: 'Recomendados',
    },
    reports: {
        empty: 'No hay reportes',
        product: 'Producto',
        date: 'Fecha',
        reason: 'Motivo',
    },
    checkout: {
        title: 'Pago',
        finish: 'Completar',
        success: '¡El pedido #{0} se ha completado correctamente!',
        empty: 'Por favor revisa el carrito de compra, porque está vacío.',
        invalid:
            'Por favor revisa el carrito de compra, hay problemas con la disponibilidad de alguno de los ítems.',
        recent_addresses: 'Direcciones recientes',
        no_recent_addresses: 'No hay direcciones recientes',
        loading_recent_addresses: 'Cargando direcciones recientes...',
    },
    address: {
        recipient: 'Nombre y apellidos',
        city: 'Ciudad',
        region: 'Región',
        code: 'Código postal',
        country: 'País',
        address: 'Dirección',
        phone: 'Teléfono',
    },
    orders: {
        title: 'Compras',
        empty: 'No hay productos',
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
        already_reported: 'Ya has reportado este producto, ¡por favor espera!',
    },
    info: {
        loading: 'Cargando...',
        interesting: 'Podría interesarte...',
        no_articles: 'No hay recomendaciones',
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
        appliances: 'Electrodomésticos',
        phones: 'Teléfonos',
        'computers-electronic': 'Ordenadores/Electrónica',
        sports: 'Deportes',
        games: 'Juegos',
        home: 'Hogar',
        others: 'Otros',
    },
}

export default Object.freeze({ translation: es })
