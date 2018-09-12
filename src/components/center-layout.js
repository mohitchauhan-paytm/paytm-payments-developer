import  React, {Component} from 'react';
import  './layout.css';
export default class CenterLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
              <div className={`small-container`}>
                  {this.props.children}
              </div>
      )
    }
}