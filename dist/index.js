(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.index = mod.exports;
    }
})(this, function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var MyComponent = function (_React$Component) {
        _inherits(MyComponent, _React$Component);

        function MyComponent(props) {
            _classCallCheck(this, MyComponent);

            var _this = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this, props));

            _this.state = {
                breakpoint: ''
            };
            _this._mqls = [];
            _this._onBreakpointChange = _this._onBreakpointChange.bind(_this);
            return _this;
        }

        _createClass(MyComponent, [{
            key: '_setupListeners',
            value: function _setupListeners() {
                var _this2 = this;

                Object.keys(this.props).filter(function (key) {
                    return typeof _this2.props[key] === 'string';
                }).forEach(function (breakpoint) {
                    var mql = window.matchMedia(_this2.props[breakpoint]);
                    mql.addListener && mql.addListener(_this2._onBreakpointChange);
                    _this2._mqls.push(mql);
                });
            }
        }, {
            key: '_onBreakpointChange',
            value: function _onBreakpointChange(breakpoint) {
                var currentBreakpoint = this._getCurrentBreakpoint();
                if (this.state.breakpoint !== currentBreakpoint) {
                    this.setState(Object.assign.apply(Object, [{}].concat(_toConsumableArray(this.state), [{ breakpoint: this._getCurrentBreakpoint() }])));
                }
            }
        }, {
            key: '_getCurrentBreakpoint',
            value: function _getCurrentBreakpoint() {
                var _this3 = this;

                return Object.keys(this.props).filter(function (key) {
                    return typeof _this3.props[key] === 'string';
                }).find(function (breakpoint) {
                    return window.matchMedia(_this3.props[breakpoint]).matches;
                });
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (!window.matchMedia) return;
                this.setState({
                    breakpoint: this._getCurrentBreakpoint() || ''
                });
                this._setupListeners();
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this._mqls.forEach(function (mql) {
                    return mql.removeListener && mql.removeListener();
                });
                this._mqls = [];
            }
        }, {
            key: 'render',
            value: function render() {
                return this.props.children(this.state.breakpoint);
            }
        }]);

        return MyComponent;
    }(_react2.default.Component);

    ;

    MyComponent.propTypes = {
        children: _react.PropTypes.func.isRequired
    };

    exports.default = MyComponent;
});