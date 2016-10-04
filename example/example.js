import React from 'react'
import ReactDOM from 'react-dom'
import MediaQuery from '../dist/index'

const App = () => {
    return (
        <MediaQuery
            x-small="(max-width: 399px)"
            small="(min-width: 400px) and (max-width: 719px)"
            medium="(min-width: 720px) and (max-width: 1023px)"
            large="(min-width: 1024px) and (max-width: 1239px)"
            x-large="(min-width: 1240px)">
            {breakpoint => <span>{breakpoint.toUpperCase()}</span>}
        </MediaQuery>
    )
}

const init = () => ReactDOM.render(<App />, document.getElementById('app'))

init()

