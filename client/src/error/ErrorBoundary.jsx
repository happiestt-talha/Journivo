import React, { Component } from 'react'
import Error500 from './Error500'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info) {
        console.log(error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <Error500 />
            )
        }
        return (
            this.props.children
        )
    }
}

export default ErrorBoundary
