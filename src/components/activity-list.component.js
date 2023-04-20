import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Activity(props) {
    return(
        <tr>
            <td>{props.activity.name}</td>
            <td>{props.activity.location}</td>
            <td>{props.activity.description}</td>
            <td>{props.activity.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + props.activity._id}>Edit</Link> | <a href="#" onClick={() => props.deleteActivity(props.activity._id)}>Delete</a>
            </td>
        </tr>
    );
}

export default class ActivitiesList extends Component {
    constructor(pros) {
        super(pros);

        this.activityList = this.activityList.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
        
        this.state = {
            activities: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/activities/')
            .then(response => {
                this.setState({
                    activities: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteActivity(id) {
        axios.delete('http://localhost:5000/activities/' + id)
            .then(res => console.log(res.data));
        
        this.setState({
            activities: this.state.activities.filter(el => el._id !== id)
        })
    }

    activityList() {
        return this.state.activities.map(currentActivity => {
            return <Activity activity={currentActivity} deleteActivity={this.deleteActivity} key={currentActivity._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Activities</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Name</th>
                            <th>location</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.activityList()}
                    </tbody>
                </table>
            </div>
        );
    }
}