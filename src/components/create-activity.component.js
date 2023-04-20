import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateActivity extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            location: '',
            description: '',
            date: new Date(),
            users: []
        }
    }

    // a react lifecycle method, automatically be called right before anything displayed on the page
    componentDidMount() {
        // axios.get('http://localhost:5000/users')
        //     .then(response => {
        //         if (response.data.length > 0) {
        //             this.setState({
        //                 members: response.data.map(user => user.name),
        //                 name: response.data[0].name
        //             })
        //         }
        //     })
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeLocation(event) {
        this.setState({
            location: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }    

    onSubmit(event) {
        event.preventDefault();

        const activity = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            date: this.state.date
        }

        console.log(activity);

        axios.post('http://localhost:5000/activities/add', activity)
            .then(res => console.log(res.data));
        
        // take people back to the home page
        window.location = "/";
    }

    render() {
        return (
            <div>
                <h3>Create New Activity </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>團名: </label>
                        {/* <select ref="userInput"
                            required
                            className='form-control'
                            value={this.state.name}
                            onChange={this.onChangeName}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>
                                })
                            }
                        </select> */}
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Location : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.location}
                            onChange={this.onChangeLocation}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type='text'
                            required
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Create Activity" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}