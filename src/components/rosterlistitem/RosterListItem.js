import React, { Component } from 'react';
import classNames from 'classnames'

import './rosterlist.scss';

export default class RosterList extends Component {
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
        <div className="rosterlist">
            <div className="image">
                
            </div>
            <div className="name">
                Samula John
            </div>
            <div className="msgcount">
                <div className="msgcount-badge">
                    90
                </div>
            </div>
        </div>
    );
  }
}
