import React from 'react'

type Callback = () => void

export interface ServerErrorHandlerListener {
    setCallback: (callback: Callback) => void
}

export interface ServerErrorHandlerEmitter {
    handle: () => void
}

class ServerErrorHandler
    implements ServerErrorHandlerListener, ServerErrorHandlerEmitter {
    private callback: Callback | undefined

    handle = () => {
        if (this.callback) this.callback()
    }

    setCallback = (cb: Callback) => {
        this.callback = cb
    }
}

const instance = new ServerErrorHandler()

export const serverErrorHandler: ServerErrorHandlerEmitter = instance

const ServerErrorHandlerContext = React.createContext<ServerErrorHandlerListener>(
    instance
)

export const useServerErrorHandler = () =>
    React.useContext(ServerErrorHandlerContext)
