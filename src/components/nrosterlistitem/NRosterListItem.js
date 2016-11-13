import React, { Component } from 'react';
import classNames from 'classnames'

import './nrosterlist.scss';

export default class NRosterList extends Component {
    constructor(props) {
      super(props);
      this.state = {show: false};
    }
  handleClick = () => {
      alert("hello how are you?")
      this.setState({show:true});
  }
  render() {
    return (
        <div className="rosterlist">fdsafsa
            <div className="image">
                
            </div>
        
        </div>
    );
  }
}
