import React from 'react'

interface ErrorHandlerProps {
    children: React.ReactNode
}

export default class ErrorHandler extends React.Component<ErrorHandlerProps> {
    componentDidCatch(error: any, info: any) {
        /*console.log('caught', info)
        serverErrorHandler.handle(-1)*/
    }

    render() {
        return this.props.children
    }
}
