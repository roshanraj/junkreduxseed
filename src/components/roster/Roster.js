import React, { Component } from 'react';


import classNames from 'classnames'
import RosterListItem from '../rosterlist/RosterListItem'


import './roster.scss';

export default class Roster extends Component {
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



      <div className={classNames({"roster":true, "hide_ani":this.state.show})}>
            {/*** components -- top bar ****/}
            <div className="header"></div>
            {/*** components -- body bar ****/}
            <div className="list">
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
                <RosterListItem/>
            </div>
            {/*** components -- footer bar ****/}
            <div className="footer"></div>
      </div>


    );
  }
}
