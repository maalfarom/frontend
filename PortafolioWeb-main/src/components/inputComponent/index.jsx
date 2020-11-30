import React from 'react';
import { StyleInput } from './styles';

class InputComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

render() {
  return (
  <input
    // placeholder={props.placeholder}
    maxLength={this.props.maxLength}
    disabled={this.props.disabled}
    type={this.props.type}
    onChange={this.handleChange} value={this.props.value} name={this.props.name} 
  />
  )
}
handleChange(event) {
  this.props.onChange(event.target); 
}

}

export default InputComponent;