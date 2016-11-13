import React, { Component } from 'react';
import classNames from 'classnames'

import './nrosterlistitem.scss';

export default class NRosterListItem extends Component {
    constructor(props) {
      super(props);
      this.state = {show: false};

    }
  handleClick = (msg) => {
      console.log("$##################",msg);
      alert("hello how are you? "+msg )
  }
  render() {
      const id = this.props.info.id
    return (

        <div className="rosterlistitem">
            <div className="image">
                < img src = {
                              this.props.info.pic
                            }
                            onClick = {
                              (text) => this.handleClick(id)
                            }
                            />
            </div>

        </div>
    );
  }
}
