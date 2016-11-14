import React, { Component } from 'react';

import RightPanel from '../rightpanel/RightPanel';
import LeftPanel from '../leftpanel/LeftPanel';

import './messaging.scss';

export default class Messaging extends Component {
    constructor(props) {
      super(props);

    }

    render() {
        return (
            <div className="messaging">

                <LeftPanel/>
                <RightPanel/>
            </div>
        );
    }
}
