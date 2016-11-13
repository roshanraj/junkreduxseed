import React, { Component } from 'react';
import classNames from 'classnames'

import './rosterlistitem.scss';

export default class RosterListItem extends Component {
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
        <div className="rosterlistitem">
            <div className="image">
                <img  src="https://static.intercomassets.com/avatars/666194/square_128/69b02133-ccb6-4564-9bca-f7e27fc999f6-1470677394.jpg?1470677394" />
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
