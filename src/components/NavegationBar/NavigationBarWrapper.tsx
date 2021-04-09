import React from 'react'

import { Session, SessionService } from '../../services'

import NavigationBar from './NavigationBar'

interface NavigationBarWrapperProps {
    sessionService: SessionService
}

interface NavigationBarWrapperState {
    session?: Session
}

export default class NavigationBarWrapper extends React.Component<
    NavigationBarWrapperProps,
    NavigationBarWrapperState
> {
    constructor(props: any) {
        super(props)
        this.state = { session: undefined }
    }

    componentDidMount() {
        const getSession = async () => {
            this.setState({
                ...this.state,
                session: this.props.sessionService.current(),
            })
        }

        this.props.sessionService.setCallback((s) =>
            this.setState({ ...this.state, session: s })
        )

        getSession()
    }

    render() {
        return <NavigationBar />
    }
}
