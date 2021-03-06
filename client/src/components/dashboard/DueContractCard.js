import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { markActionAsComplete } from '../../actions';
import '../../css/dueContractCard.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export class DueContractCard extends Component {
  constructor() {
    super();
    this.state = {};

    this.IsLinkHover = false;
    this.markAsComplete = this.markAsComplete.bind(this);
  }

  markAsComplete(event, actionId) {
    const { contract } = this.props;

    confirmAlert({
      title: '',
      message: 'ทำการปิดการแจ้งเตือน ?',
      buttons: [
        {
          label: 'ตกลง',
          onClick: () => this.props.markActionAsComplete(contract._id, actionId)
        },
        {
          label: 'ยกเลิก',
          onClick: () => {}
        }
      ]
    });

    event.preventDefault();
  }

  renderAlertSection(action) {
    const upComingDay = moment(action.dueDate, 'DD/MM/YYYY').diff(
      moment().startOf('day'),
      'days'
    );
    const upComingTextColor = upComingDay => {
      if (upComingDay <= 10) return 'red-text darken-4';
      else if (upComingDay <= 20) return 'amber-text text-accent-4';

      return 'green-text darken-4';
    };

    return (
      <div>
        <div className="left-align">
          <span data-test="contract-action-type" >
            {action.type && `${action.type} : ${action.dueDate}`}
          </span>
          <span data-test="contract-upcoming-day"
            className={`${upComingTextColor(upComingDay)}`}
          >
            {action.type && ` (${upComingDay} วัน)`}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { contract, index } = this.props;

    return (
      <div
        data-test="component-dueContarctCard"
        className={`row dueContractRow-desktop ${
          index % 2 ? '' : 'grey lighten-4'
        }`}
        style={{ color: '#4d4d4d' }}
      >
        <div className="col s12 m12 l5 truncate">
          <Link to={`/Contract/${contract.no}`}>
            <span data-test="contract-no">{`#${contract.no} : `} </span>
            <span data-test="contract-title" style={{ fontWeight: '500' }}>{`${contract.title} `} </span>
          </Link>
        </div>
        <div className="col s12 m10 l6 truncate">
          {this.renderAlertSection(contract.actions[0])}
        </div>
        <div          
          className="col s2 offset-s10 m2 l1 valign-wrapper"
          style={{ height: '35px' }}
        >
          <a
            href="#!"        
            data-test="contract-mark-as-complete"    
            className="valign-wrapper"
            onMouseOver={() => this.setState({IsLinkHover: true})}   
            onMouseLeave={() => this.setState({IsLinkHover: false})}       
            onClick={event =>
              this.markAsComplete(event, contract.actions[0]._id)
            }
          >
            {this.state.IsLinkHover ?
            <i className="material-icons grey-text" style={{fontSize: '2rem'}}>alarm_off</i> : 
            <i className="material-icons blue-grey-text">alarm_off</i> 
          }
          </a>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    { markActionAsComplete }
  ),
  withRouter
)(DueContractCard);
