import React, { Component } from 'react';
import { connect } from 'react-redux';

import Roster from '../../components/nroster/NRoster';

import classNames from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import { getRoster, updateRoster } from '../../actions/roster';

import './notification.scss';

class Notification extends Component {
    constructor(props) {
      super(props);
      this.state = {show: false};
    }


    componentDidMount() {
        console.log("______________________________________________");
        console.log(this.props);
    }

  handleClick = () => {
      //this.refs.roster.handleClick();
      this.setState({show: !this.state.show});
      dispatch(getRoster())

  }
  render() {
    return (
    <div>
    <ReactCSSTransitionGroup transitionName="thing"  transitionAppear={true}>
        { this.state.show ? <Roster ref="roster" list={this.props.roster}/> : null }
    </ReactCSSTransitionGroup>
      <div className ={classNames({"notification":true," notification-active":this.state.show})} onClick={this.handleClick}>

        <div className="count" >
            800
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
    return {roster:state.roster};
}

export default connect(mapStateToProps)(Notification);
