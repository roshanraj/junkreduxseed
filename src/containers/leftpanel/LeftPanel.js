import React, { Component } from 'react';
import {LeftNav} from '../../components/nav';
import {LeftFooter} from '../../components/footer';

import './LeftPanel.scss';

export default class LeftPanel extends Component {
    constructor(props) {
      super(props);

    }

    render() {
        return (
          <div className="leftpanel">
              <LeftNav/>
              <div className="leftpanel-body">
                  ----------------------------
              </div>
              <LeftFooter/>
            
          </div>
        );
    }
}
