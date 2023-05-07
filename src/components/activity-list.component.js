import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Activity(props) {
    return(
        <tr>
            <td>{props.activity.activityType}</td>
            <td>{props.activity.name}</td>
            <td>{props.activity.description}</td>
            <td>{props.activity.price}</td>
            <td>{props.activity.currentMember}/{props.activity.minMember}</td>
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
                <h3>活動清單</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>活動類型</th>
                            <th>商品名稱</th>
                            <th>商品概述</th>
                            <th>商品價格</th>
                            <th>目前參加人數/最低成團人數</th>
                            <th>結單日期</th>
                            <th>Action</th>
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