'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PageView = require('./PageView');

var _PageView2 = _interopRequireDefault(_PageView);

var _BreakView = require('./BreakView');

var _BreakView2 = _interopRequireDefault(_BreakView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationBoxView = function (_Component) {
  _inherits(PaginationBoxView, _Component);

  function PaginationBoxView(props) {
    _classCallCheck(this, PaginationBoxView);

    var _this = _possibleConstructorReturn(this, (PaginationBoxView.__proto__ || Object.getPrototypeOf(PaginationBoxView)).call(this, props));

    _this.handlePreviousPage = function (evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false; // eslint-disable-line no-unused-expressions
      if (_this.state.selected > 0) {
        //this.handlePageSelected(this.state.selected - 1, evt)
        _this.handlePageSelectedIn[_this.state.selected - 1](evt);
      }
    };

    _this.handleNextPage = function (evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false; // eslint-disable-line no-unused-expressions
      if (_this.state.selected < _this.props.pageCount - 1) {
        //this.handlePageSelected(this.state.selected + 1, evt)
        _this.handlePageSelectedIn[_this.state.selected + 1](evt);
      }
    };

    _this.callCallback = function (selectedItem) {
      if (typeof _this.props.onPageChange !== 'undefined' && typeof _this.props.onPageChange === 'function') {
        _this.props.onPageChange({ selected: selectedItem });
      }
    };

    _this.pagination = function () {
      var items = [];

      if (_this.props.pageCount <= _this.props.pageRangeDisplayed) {

        for (var index = 0; index < _this.props.pageCount; index++) {
          items.push(_this.getPageElement(index));
        }
      } else {

        var leftSide = _this.props.pageRangeDisplayed / 2;
        var rightSide = _this.props.pageRangeDisplayed - leftSide;

        if (_this.state.selected > _this.props.pageCount - _this.props.pageRangeDisplayed / 2) {
          rightSide = _this.props.pageCount - _this.state.selected;
          leftSide = _this.props.pageRangeDisplayed - rightSide;
        } else if (_this.state.selected < _this.props.pageRangeDisplayed / 2) {
          leftSide = _this.state.selected;
          rightSide = _this.props.pageRangeDisplayed - leftSide;
        }

        var _index = void 0;
        var page = void 0;
        var breakView = void 0;
        var createPageView = function createPageView(index) {
          return _this.getPageElement(index);
        };

        for (_index = 0; _index < _this.props.pageCount; _index++) {

          page = _index + 1;

          if (page <= _this.props.marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          }

          if (page > _this.props.pageCount - _this.props.marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          }

          if (_index >= _this.state.selected - leftSide && _index <= _this.state.selected + rightSide) {
            items.push(createPageView(_index));
            continue;
          }

          var keys = Object.keys(items);
          var breakLabelKey = keys[keys.length - 1];
          var breakLabelValue = items[breakLabelKey];

          if (_this.props.breakLabel && breakLabelValue !== breakView) {
            var key = 'breakview' + _index;
            breakView = _react2.default.createElement(_BreakView2.default, { breakLabel: _this.props.breakLabel,
              breakClassName: _this.props.breakClassName,
              key: key });

            items.push(breakView);
          }
        }
      }

      return items;
    };

    _this.state = {
      selected: props.initialPage ? props.initialPage : props.forcePage ? props.forcePage : 0
    };

    _this.handlePageSelectedIn = {};
    for (var i = 0; i < props.pageCount; ++i) {
      _this.handlePageSelectedIn[i] = _this.handlePageSelected(i);
    }

    return _this;
  }

  _createClass(PaginationBoxView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Call the callback with the initialPage item:
      if (typeof this.props.initialPage !== 'undefined' && !this.props.disableInitialCallback) {
        this.callCallback(this.props.initialPage);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.forcePage !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
        this.setState({ selected: nextProps.forcePage });
      }
    }
  }, {
    key: 'handlePageSelected',
    value: function handlePageSelected(selected) {
      var _this2 = this;

      return function (evt) {
        evt.preventDefault ? evt.preventDefault() : evt.returnValue = false; // eslint-disable-line no-unused-expressions

        if (_this2.state.selected === selected) return;

        _this2.setState({ selected: selected });

        // Call the callback with the new selected item:
        _this2.callCallback(selected);
      };
    }
  }, {
    key: 'hrefBuilder',
    value: function hrefBuilder(pageIndex) {
      if (this.props.hrefBuilder && pageIndex !== this.state.selected && pageIndex >= 0 && pageIndex < this.props.pageCount) {
        return this.props.hrefBuilder(pageIndex + 1);
      }
    }
  }, {
    key: 'getPageElement',
    value: function getPageElement(index) {
      return _react2.default.createElement(_PageView2.default, { onClick: this.handlePageSelectedIn[index],
        selected: this.state.selected === index,
        pageClassName: this.props.pageClassName,
        pageLinkClassName: this.props.pageLinkClassName,
        activeClassName: this.props.activeClassName,
        extraAriaContext: this.props.extraAriaContext,
        href: this.hrefBuilder(index),
        page: index + 1,
        key: index });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var disabled = this.props.disabledClassName;
      var previousClasses = (0, _classnames2.default)(this.props.previousClassName, _defineProperty({}, disabled, this.state.selected === 0));
      var nextClasses = (0, _classnames2.default)(this.props.nextClassName, _defineProperty({}, disabled, this.state.selected === this.props.pageCount - 1));

      return _react2.default.createElement(
        'ul',
        { className: this.props.containerClassName },
        function (_) {
          var pagination = [_react2.default.createElement(
            'li',
            { className: previousClasses, key: 'prev' },
            _react2.default.createElement(
              'a',
              { onClick: _this3.handlePreviousPage,
                className: _this3.props.previousLinkClassName,
                href: _this3.hrefBuilder(_this3.state.selected - 1),
                tabIndex: '0',
                onKeyPress: _this3.handlePreviousPage },
              _this3.props.previousLabel
            )
          )].concat(_this3.pagination()).concat(_react2.default.createElement(
            'li',
            { className: nextClasses, key: 'next' },
            _react2.default.createElement(
              'a',
              { onClick: _this3.handleNextPage,
                className: _this3.props.nextLinkClassName,
                href: _this3.hrefBuilder(_this3.state.selected + 1),
                tabIndex: '0',
                onKeyPress: _this3.handleNextPage },
              _this3.props.nextLabel
            )
          ));
          if (_this3.props.side == 'left') {
            pagination.splice(1, 0, pagination.pop());
          }

          if (_this3.props.side == 'right') {
            pagination.splice(pagination.length - 2, 0, pagination.shift());
          }

          return pagination;
        }()
      );
    }
  }]);

  return PaginationBoxView;
}(_react.Component);

PaginationBoxView.propTypes = {
  pageCount: _propTypes2.default.number.isRequired,
  pageRangeDisplayed: _propTypes2.default.number.isRequired,
  marginPagesDisplayed: _propTypes2.default.number.isRequired,
  previousLabel: _propTypes2.default.node,
  nextLabel: _propTypes2.default.node,
  breakLabel: _propTypes2.default.node,
  hrefBuilder: _propTypes2.default.func,
  onPageChange: _propTypes2.default.func,
  initialPage: _propTypes2.default.number,
  forcePage: _propTypes2.default.number,
  disableInitialCallback: _propTypes2.default.bool,
  containerClassName: _propTypes2.default.string,
  pageClassName: _propTypes2.default.string,
  pageLinkClassName: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  previousClassName: _propTypes2.default.string,
  nextClassName: _propTypes2.default.string,
  previousLinkClassName: _propTypes2.default.string,
  nextLinkClassName: _propTypes2.default.string,
  disabledClassName: _propTypes2.default.string,
  breakClassName: _propTypes2.default.string,
  side: _propTypes2.default.oneOf(['both', 'left', 'right'])
};
PaginationBoxView.defaultProps = {
  pageCount: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: 'selected',
  previousClassName: 'previous',
  nextClassName: 'next',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  breakLabel: '...',
  disabledClassName: 'disabled',
  disableInitialCallback: false
};
exports.default = PaginationBoxView;


if (process.env.NODE_ENV !== 'production') {
  PaginationBoxView.displayName = 'PaginationBoxView';
}
//# sourceMappingURL=PaginationBoxView.js.map