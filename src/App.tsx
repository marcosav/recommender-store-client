import React, { Fragment, Suspense } from 'react'

import Routes from './routes'

const App = () => {
    return (
        <Suspense fallback={<Fragment></Fragment>}>
            <Routes />
        </Suspense>
    )
}

export default App
