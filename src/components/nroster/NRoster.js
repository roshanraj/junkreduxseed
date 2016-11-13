import React, { Component } from 'react';


import classNames from 'classnames'
import RosterListItem from '../nrosterlist/NRosterListItem'


import './nroster.scss';

export default class Roster extends Component {
    constructor(props) {
      super(props);
      this.state = {show: false};
      console.log("list of user ", this.props.list);
    }
  handleClick = () => {
      alert("hello how are you?")
      this.setState({show:true});
  }
  render() {
    return (



      <div className={classNames({"roster":true, "hide_ani":this.state.show})}>

            {/*** components -- body bar ****/}
            <div className="list">
            {
                this.props.list.map(function(i){
                    return <RosterListItem info={i} />
                })
            }
                


            </div>

      </div>


    );
  }
}
