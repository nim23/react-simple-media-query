import React, { PropTypes } from 'react'

class MediaQuery extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            breakpoint: ''
        }
        this._mqls = []
        this._onBreakpointChange = this._onBreakpointChange.bind(this)
    }

    _setupListeners() {
        Object.keys(this.props)
            .filter(key => typeof this.props[key] === 'string')
            .forEach(breakpoint => {
                const mql = window.matchMedia(this.props[breakpoint])
                mql.addListener && mql.addListener(this._onBreakpointChange)
                this._mqls.push(mql)
            })
    }

    _onBreakpointChange (breakpoint) {
        const currentBreakpoint = this._getCurrentBreakpoint()
        if (this.state.breakpoint !== currentBreakpoint) {
            this.setState(Object.assign({},
            ...this.state,
            { breakpoint: this._getCurrentBreakpoint() }))
        }
    }

    _getCurrentBreakpoint() {
        return Object.keys(this.props)
            .filter(key => typeof this.props[key] === 'string')
            .find(breakpoint => window.matchMedia(this.props[breakpoint]).matches)
    }
    
    componentDidMount() {
        if (!window.matchMedia) return
        this.setState({
            breakpoint: this._getCurrentBreakpoint() || ''
        })
        this._setupListeners()
    }

    componentWillUnmount() {
        this._mqls.forEach(mql => mql.removeListener && mql.removeListener())
        this._mqls = []
    }

    render() {
        return this.props.children(this.state.breakpoint)
    }
};

MediaQuery.propTypes = {
    children: PropTypes.func.isRequired
}

export default MediaQuery;