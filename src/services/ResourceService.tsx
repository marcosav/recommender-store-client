import React from 'react'

import { ResourceAPI, ResourceService } from '../api'

export const ResourceContext = React.createContext<ResourceService>(new ResourceAPI())

const useResourceService = () => React.useContext(ResourceContext)

export default useResourceService
