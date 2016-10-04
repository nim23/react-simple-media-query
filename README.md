# Simple React Media Query Component

This component is a simple wrapper around window.matchMedia()

The core idea of this component idea is taken from the following blog post https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9#.o2aobpvp7

## How to use:

```javascript
    <MediaQuery
            x-small="(max-width: 399px)"
            small="(min-width: 400px) and (max-width: 719px)"
            medium="(min-width: 720px) and (max-width: 1023px)"
            large="(min-width: 1024px) and (max-width: 1239px)"
            x-large="(min-width: 1240px)">
            {breakpoint => <span> { breakpoint === 'small' ? <Small/> : <Default/> } </span>}
        </MediaQuery>
```

Provide media query breakpoints as props. The props keys i.e `small, medium etc..` are then passed into
the child component function as an argument. From then you can decide to
render different views based on the argument.

## To Contribute

1. Clone this repo
2. Inside cloned repo run `npm install`
3. If you want to run tests: `npm test` or `npm run testonly` or `npm run test-watch`. You need to write tests in `__tests__` folder. You need at least Node 4 on your machine to run tests.
4. If you want to run linting: `npm test` or `npm run lint`. Fix bugs: `npm run lint-fix`. You can adjust your `.eslintrc` config file.
5. Test on your local browser by running `npm run example-browser`


## License

MIT
