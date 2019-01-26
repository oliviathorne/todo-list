import React from "react";

class Input extends React.Component {
  render() {
    const { label, name, type, value, handleChange } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          className="form-control"
          id={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
}

export default Input;
