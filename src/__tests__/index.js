import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import MediaQuery from '../index';

describe('Register Queries', () => {
    const addListenerSpy = sinon.spy()
    beforeEach(() => window.matchMedia = () => {})

    afterEach(() => window.matchMedia = undefined)
    
    it('should return true for the small breakpoint', () => {
        sinon.stub(window, 
            'matchMedia', 
            query => query === '(min-width: 400px)' ?
                {matches: true, addListener: addListenerSpy} :
                {matches: false, addListener: addListenerSpy})
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        expect(wrapper.state('breakpoint')).to.be.string('small')
    })

    it('should return true for the medium breakpoint', () => {
        sinon.stub(window,
            'matchMedia',
            query => query === '(min-width: 720px)' ?
                {matches: true, addListener: addListenerSpy} : 
                {matches: false, addListener: addListenerSpy})
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        expect(wrapper.state('breakpoint')).to.be.string('medium')
    })

    it('should return true for the large breakpoint', () => {
        sinon.stub(window,
            'matchMedia',
            query => query === '(min-width: 1024px)' ?
            {matches: true, addListener: addListenerSpy}:
            {matches: false, addListener: addListenerSpy})
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        expect(wrapper.state('breakpoint')).to.be.string('large')
    })

    it('should return true for the x-large breakpoint', () => {
        sinon.stub(window,
            'matchMedia',
            query => query === '(min-width: 1240px)' ?
            {matches: true, addListener: addListenerSpy} : 
            {matches: false, addListener: addListenerSpy})
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        expect(wrapper.state('breakpoint')).to.be.string('x-large')
    })

    it('should return empty string if no breakpoint matches', () => {
        sinon.stub(window,
            'matchMedia',
            query => query === '(min-width: 5000px)' ?
            {matches: true, addListener: addListenerSpy} :
            {matches: false, addListener: addListenerSpy})
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        expect(wrapper.state('breakpoint')).to.be.string('')
    })
})

describe('Register listeners', () => {
    beforeEach(() => window.matchMedia = () => {})

    afterEach(() => window.matchMedia = undefined)

    it('should register listener for the media queries', () => {
        const addListenerSpy = sinon.spy()
        sinon.stub(window, 'matchMedia', query => ({ addListener : addListenerSpy }))
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>);
        expect(addListenerSpy.callCount).to.equal(4)
    })

    it('should not throw an exception if addListener is not defined', () => {
        const addListenerSpy = sinon.spy()
        sinon.stub(window, 'matchMedia', query => ({ addListener : undefined }))
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>);
        expect(addListenerSpy.callCount).to.equal(0)
    })
})

describe('Handle breakpoint change', () => {
    beforeEach(() => window.matchMedia = () => {})

    afterEach(() => window.matchMedia = undefined)
    
    it('should update the current breakpoint state', () => {
        let callback
        const addListenerSpy = sinon.spy()
        sinon.stub(window,
            'matchMedia',
            query => (query === '(min-width: 1024px)' ? {
                matches: true,
                addListener : arg => {
                    callback = arg
                }} :
                {
                    matches: false,
                    addListener: addListenerSpy
                }
        ))
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        callback()
        expect(wrapper.state('breakpoint')).to.be.string('large')
        expect(addListenerSpy.callCount).to.equal(3)
    })
})

describe('Unsupported Matchmedia', () => {
    beforeEach(() => {
        window.matchMedia = undefined
    })
    it('should not throw an exception if match media is not supported', () => {
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        expect(wrapper.state('breakpoint')).to.be.string('')
    })
})

describe('Unsupported addListener', () => {
    beforeEach(() => window.matchMedia = () => {})

    afterEach(() => window.matchMedia = undefined)

    it('should not throw an exception if addListener is not supported', () => {
        sinon.stub(window, 'matchMedia', query => ({ addListener : undefined }))
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>)
        expect(wrapper.state('breakpoint')).to.be.string('')
    })
})

describe('Remove listeners', () => {
    beforeEach(() => window.matchMedia = () => {})

    afterEach(() => window.matchMedia = undefined)

    it('should not remove listener on component unmount', () => {
        const removeListenerSpy = sinon.spy()
        sinon.stub(window, 'matchMedia', query => ({ removeListener : removeListenerSpy }))
        const div = global.document.createElement('div');
        global.document.body.appendChild(div)
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>, { attachTo: div })
        wrapper.detach()
        expect(removeListenerSpy.callCount).to.equal(4)
    })
})

describe('Remove listeners', () => {
    beforeEach(() => window.matchMedia = () => {})

    afterEach(() => window.matchMedia = undefined)

    it('should not throw an exception if remove listener is undefined', () => {
        const removeListenerSpy = sinon.spy()
        sinon.stub(window, 'matchMedia', query => ({ removeListener : undefined }))
        const div = global.document.createElement('div');
        global.document.body.appendChild(div)
        const wrapper = mount(<MediaQuery 
            small="(min-width: 400px)"
            medium="(min-width: 720px)"
            large="(min-width: 1024px)"
            x-large="(min-width: 1240px)">
                {(state) => <div>{state}</div>}
            </MediaQuery>, { attachTo: div })
        const innerText = wrapper.text()
        wrapper.detach()
        expect(innerText).to.equal('')
    })
})