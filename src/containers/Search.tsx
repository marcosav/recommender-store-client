import React from 'react'

import { RouteComponentProps } from 'react-router'

interface SearchParams {
    query: string
}

const Search: React.FC<RouteComponentProps<SearchParams>> = ({ match }) => {
    const { query } = match.params
    return <>{query}</>
}

export default Search
