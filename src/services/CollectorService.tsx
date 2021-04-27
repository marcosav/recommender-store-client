import React from 'react'

import { CollectorAPI, CollectorService } from '../api'

export const CollectorContext = React.createContext<CollectorService>(
    new CollectorAPI()
)

const useCollectorService = () => React.useContext(CollectorContext)

export default useCollectorService
