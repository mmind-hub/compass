'use strict';

const React = require('react');
const Element = require('hadron-document').Element;
const TypeChecker = require('hadron-type-checker');

/**
 * General types component.
 */
class Types extends React.Component {

  /**
   * The component constructor.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
    this.element = props.element;
  }

  /**
   * Handles a change in the type.
   *
   * @param {Event} evt - The event.
   */
  handleTypeChange(evt) {
    this.element.edit(TypeChecker.cast(this.castableValue(), evt.target.innerText));
  }

  /**
   * Render a type list.
   *
   * @returns {React.Component} The element component.
   */
  render() {
    return this.element.isValueEditable() ? this.renderDropdown() : this.renderLabel();
  }

  /**
   * Render the type list dropdown.
   *
   * @returns {Component} The react component.
   */
  renderDropdown() {
    return (
      <div className='dropdown types'>
        <button
          className='btn btn-default dropdown-toggle'
          type='button'
          tabIndex='-1'
          id='types-dropdown'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'>
          {this.element.currentType}
          <span className='caret'></span>
        </button>
        <ul className='dropdown-menu' aria-labelledby='types-dropdown'>
          {this.renderTypes()}
        </ul>
      </div>
    );
  }

  /**
   * Render the type list label.
   *
   * @returns {Component} The react component.
   */
  renderLabel() {
    return (
      <div className='types'>
        <span className='type-label'>{this.element.currentType}</span>
      </div>
    );
  }

  /**
   * Render the types
   *
   * @returns {Component} The react component.
   */
  renderTypes() {
    return _.map(TypeChecker.castableTypes(this.castableValue()), (type) => {
      return (
        <li key={type}>
          <span onClick={this.handleTypeChange.bind(this)}>{type}</span>
        </li>
      );
    });
  }

  /**
   * Get the castable value for this value.
   *
   * @returns {Object} The cast value.
   */
  castableValue() {
    if (this.element.elements) {
      if (this.element.currentType === 'Object') {
        return {};
      }
      return _.map(this.element.elements, (element) => {
        return element.currentValue;
      });
    }
    return this.element.currentValue;
  }
}

Types.displayName = 'Types';

module.exports = Types;
