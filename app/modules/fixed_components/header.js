import React from 'react';
require('../../scss/header.scss');

var Header = React.createClass( {
  render() {
    return <div className="header">
      <div className="main-header">
        <span className="cobalt">Cobalt JS</span>
        <span>Everything React in a snap</span>
      </div>
        <div className="sub-header">
        Demo Application
      </div>
    </div>
  }
});

module.exports = Header;
