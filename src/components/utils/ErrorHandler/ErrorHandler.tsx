import React from 'react'

interface ErrorHandlerProps {
    children: React.ReactNode
    component: (error: String, info: Object) => React.ReactNode
}

export default class ErrorHandler extends React.Component<ErrorHandlerProps> {
    constructor(props: any) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            info: null,
        }
    }

    componentDidCatch(error: any, info: any) {
        this.setState({
            hasError: true,
            error,
            info,
        })

        console.log('error', error)
        console.log(info)
    }

    render() {
        const { hasError, error, info }: any = this.state
        const { component, children } = this.props

        return hasError ? component(error, info) : children
    }
}
