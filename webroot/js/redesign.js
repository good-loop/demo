'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Carousel = function (_React$Component) {
    _inherits(Carousel, _React$Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.state = {
            items: _this.props.items,
            active: _this.props.active,
            show: _this.props.show,
            direction: ''
        };
        _this.rightClick = _this.moveRight.bind(_this);
        _this.leftClick = _this.moveLeft.bind(_this);
        return _this;
    }

    _createClass(Carousel, [{
        key: 'generateItems',
        value: function generateItems() {
            var items = [];
            var level;
            var margin = Math.round(this.state.show/2);
            console.log(index);
            for (var i = this.state.active - (margin-1); i < this.state.active + (margin); i++) {
                var index = i;
                if (i < 0) {
                    index = this.state.items.length + i;
                } else if (i >= this.state.items.length) {
                    index = i % this.state.items.length;
                }
                level = this.state.active - i;
                items.push(React.createElement(Item, { key: index, id: index, name: this.state.items[index], level: level }));
            }
            return items;
        }
    }, {
        key: 'moveLeft',
        value: function moveLeft() {
            var newActive = this.state.active;
            newActive--;
            this.setState({
                active: newActive < 0 ? this.state.items.length - 1 : newActive,
                direction: 'left'
            });
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            var newActive = this.state.active;
            this.setState({
                active: (newActive + 1) % this.state.items.length,
                direction: 'right'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'carousel', className: 'noselect' },
                React.createElement(
                    'div',
                    { className: 'arrow arrow-left', onClick: this.leftClick },
                    React.createElement('i', { className: 'fi-arrow-left' })
                ),
                React.createElement(
                    ReactCSSTransitionGroup,
                    {
                        transitionName: this.state.direction },
                    this.generateItems()
                ),
                React.createElement(
                    'div',
                    { className: 'arrow arrow-right', onClick: this.rightClick },
                    React.createElement('i', { className: 'fi-arrow-right' })
                )
            );
        }
    }]);

    return Carousel;
}(React.Component);

var Item = function (_React$Component2) {
    _inherits(Item, _React$Component2);

    function Item(props) {
        _classCallCheck(this, Item);

        var _this2 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

        _this2.state = {
            level: _this2.props.level
        };
        return _this2;
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            var className = 'item level' + this.props.level;
            return React.createElement(
                'div',
                { className: className },
                this.props.name,
                React.createElement(
                    'div',
                    { className: 'outer outer' + this.props.level },
                    React.createElement('iframe', { className: "inner image img" + this.props.id, src: 'https://codepen.io/chrisgannon/full/NGGKWo/', frameBorder: '0', allowfullscreen: true })
                )
            );
        }
    }]);

    return Item;
}(React.Component);


var items = ['Pre-roll', 'In-read', 'Double-MPU', 'Banner'];
var links = ['https://codepen.io/chrisgannon/full/NGGKWo/', 'https://codepen.io/chrisgannon/full/NGGKWo/', 'https://codepen.io/chrisgannon/full/NGGKWo/', 'https://codepen.io/chrisgannon/full/NGGKWo/'];

ReactDOM.render(React.createElement(Carousel, { items: items, active: 0, show: 3, links: links}), document.getElementById('demo'));
ReactDOM.render(React.createElement(Carousel, { items: items, active: 0, show: 1, links: links}), document.getElementById('demo-mobile'));