import React from 'react'

import ErrorAlert from './ErrorAlert'

import { ServerErrorHandlerListener } from '../../../utils'

interface ErrorWrapperClassProps {
    serverErrorHandler: ServerErrorHandlerListener
}

interface ErrorWrapperClassState {
    error?: number
    open: boolean
}

export default class ErrorWrapperClass extends React.Component<
    ErrorWrapperClassProps,
    ErrorWrapperClassState
> {
    constructor(props: any) {
        super(props)
        this.state = { error: undefined, open: false }
    }

    componentDidMount() {
        this.props.serverErrorHandler.setCallback((code) =>
            this.setState({ error: code, open: true })
        )
    }

    setOpen(open: boolean) {
        this.setState({ ...this.state, open })
    }

    render() {
        return (
            <ErrorAlert
                {...{
                    error: this.state.error,
                    setOpen: this.setOpen.bind(this),
                    open: this.state.open,
                }}
            />
        )
    }
}
