import React, {
  Component
} from 'react';
import {Row, Panel} from 'react-bootstrap'
import './wrapper.css';

class WrapperComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='container-fluid'>
          <Row>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Panel className="panel-default">
                <Panel.Body>
                  <h1>{this.props.title}</h1>
                  <hr/>
                  {this.props.children}
                </Panel.Body>
              </Panel>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default WrapperComponent;