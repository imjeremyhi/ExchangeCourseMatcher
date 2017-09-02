(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FacultyDropDown = function (_React$Component) {
  _inherits(FacultyDropDown, _React$Component);

  function FacultyDropDown(props) {
    _classCallCheck(this, FacultyDropDown);

    var _this = _possibleConstructorReturn(this, (FacultyDropDown.__proto__ || Object.getPrototypeOf(FacultyDropDown)).call(this, props));

    _this.state = {
      facultyChosen: ''
    };
    return _this;
  }

  _createClass(FacultyDropDown, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'select',
          { onChange: this.props.handleChange },
          React.createElement(
            'option',
            { value: '', selected: true, disabled: true, hidden: true },
            'Select faculty'
          ),
          React.createElement(
            'option',
            { value: '' },
            'All'
          ),
          this.props.faculties.map(function (faculty) {
            return React.createElement(
              'option',
              { value: faculty },
              faculty
            );
          })
        )
      );
    }
  }]);

  return FacultyDropDown;
}(React.Component);

var CourseSearch = function (_React$Component2) {
  _inherits(CourseSearch, _React$Component2);

  function CourseSearch(props) {
    _classCallCheck(this, CourseSearch);

    var _this2 = _possibleConstructorReturn(this, (CourseSearch.__proto__ || Object.getPrototypeOf(CourseSearch)).call(this, props));

    _this2.state = {
      searchedCourse: ''
    };
    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(CourseSearch, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.props = nextProps;
      this.setState({ searchedCourse: '' });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ searchedCourse: event.target.value });
      console.log("course updated!");
    }
  }, {
    key: 'render',
    value: function render() {
      var courses = this.props.courses;
      var course = this.state.searchedCourse.trim().toLowerCase();

      if (course.length > 0) {
        courses = courses.filter(function (courseFilter) {
          return courseFilter.name.toLowerCase().includes(course);
        });
      }

      return React.createElement(
        'div',
        null,
        React.createElement('input', { type: 'text', value: this.state.course, onChange: this.handleChange, placeholder: 'Course' }),
        React.createElement(
          'ul',
          null,
          courses.map(function (courseFilter) {
            return React.createElement(
              'li',
              null,
              courseFilter.name,
              ' '
            );
          })
        )
      );
    }
  }]);

  return CourseSearch;
}(React.Component);

exports.FacultyDropDown = FacultyDropDown;
exports.CourseSearch = CourseSearch;

},{}]},{},[1]);
