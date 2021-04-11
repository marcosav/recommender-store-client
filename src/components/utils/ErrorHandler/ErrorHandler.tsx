import React from 'react'

interface ErrorHandlerProps {
    children: React.ReactNode
}

export default class ErrorHandler extends React.Component<ErrorHandlerProps> {
    componentDidCatch(error: any, info: any) {
    }

    render() {
        return this.props.children
    }
}
