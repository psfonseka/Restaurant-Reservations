import * as React from 'react';
import { SearchEntry } from '../types';
import SimpleReactValidator from 'simple-react-validator';

interface Props {
  handleSubmit: (search: SearchEntry) => void;
  validator: SimpleReactValidator;
}

interface State {
  searchEntry: SearchEntry
}

class GuestInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchEntry: {
        fullName: "",
        email: "",
        phoneNumber: "",
        partySize: 1,
        hasBirthday: false,
        hasSmoker: false,
        hasChildren: false,
        birthdayName: ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let newEntry = Object.assign({}, this.state.searchEntry, {[name]: value});
    this.setState({
      searchEntry: newEntry
    });
  }

  render() {
    return (
      <div className="guestInfo">
        Please Fill in the following information to find available reservations slots:
        <form onSubmit={(e)=>{
          e.preventDefault();
          if (this.props.validator.allValid()) {
            this.props.handleSubmit(this.state.searchEntry);
            //alert('You submitted the form and stuff!');
          } else {
            this.props.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
          }
        }}>
          <label>
            Full Name:
            <input
              name="fullName"
              type="string"
              value={this.state.searchEntry.fullName}
              onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            E-mail:
            <input
              name="email"
              type="string"
              value={this.state.searchEntry.email}
              onChange={this.handleInputChange}/>
          </label>
          {this.props.validator.message('email', this.state.searchEntry.email, 'required|email', { className: 'text-danger' })}
          <br />
          <label>
            Phone Number:
            <input
              name="phoneNumber"
              type="string"
              value={this.state.searchEntry.phoneNumber}
              onChange={this.handleInputChange}/>
          </label>
          {this.props.validator.message('phone number', this.state.searchEntry.phoneNumber, 'required|phone', { className: 'text-danger' })}
          <br />
          <label>
            Number of guests:
            <input
              name="partySize"
              type="number"
              value={this.state.searchEntry.partySize}
              onChange={this.handleInputChange}/>
          </label>
          {this.props.validator.message('number of guests', this.state.searchEntry.partySize, 'between:1,12,num', { className: 'text-danger' })}
          <br />
          <label>
            Will any guest be smoking?:
            <input
              name="hasSmoker"
              type="checkbox"
              checked={this.state.searchEntry.hasSmoker}
              onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Will there be any children?:
            <input
              name="hasChildren"
              type="checkbox"
              checked={this.state.searchEntry.hasChildren}
              onChange={this.handleInputChange}/>
          </label>
          <br />
          <label>
            Is it a birthday celebration?:
            <input
              name="hasBirthday"
              type="checkbox"
              checked={this.state.searchEntry.hasBirthday}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          {(this.state.searchEntry.hasBirthday && 
          <label>
            Name of birthday guest:
            <input
              name="birthdayName"
              type="string"
              value={this.state.searchEntry.birthdayName}
              onChange={this.handleInputChange}/>
          </label>
          )}
          <br/>
          <input type="submit" value="SEARCH" />
        </form>
      </div>

    );
  }
}

export default GuestInfo;