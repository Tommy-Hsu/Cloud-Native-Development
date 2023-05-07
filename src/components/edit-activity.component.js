import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditActivities extends Component {
    constructor(props) {
        super(props);

        this.onChangeActivityType = this.onChangeActivityType.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeMinMember = this.onChangeMinMember.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            activityType: '',
            name: '',
            description: '',
            price: 0,
            minMember: 0,
            currentMember: 0,
            date: new Date(),
        }
    }

    componentDidMount() {
        const arr = window.location.href.split("/");
        axios.get('http://localhost:5000/activities/' + arr[arr.length-1])
            .then(response => {
                this.setState({
                    activityType: response.data.activityType,
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                    minMember: response.data.minMember,
                    currentMember: response.data.currentMember,
                    date: new Date(response.data.date)
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeActivityType(event) {
        this.setState({
            activityType: event.target.value
        });
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangePrice(event) {
        this.setState({
            price: event.target.value
        });
    }

    onChangeMinMember(event) {
        this.setState({
            minMember: event.target.value
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
            activityType: this.state.activityType,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            minMember: this.state.minMember,
            date: this.state.date,
        }

        console.log(activity);

        const arr = window.location.href.split("/");
        axios.post('http://localhost:5000/activities/update/' + arr[arr.length-1], activity)
            .then(res => console.log(res.data));

        window.location = "/";
    }

    render() {
        return (
            <div>
                <h3>編輯活動</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>活動類型: </label>
                        <select ref="userInput"
                            required
                            className='form-control'
                            value={this.state.activityType}
                            onChange={this.onChangeActivityType}>
                                <option value="Product">商品</option>
                                <option value="Activity">活動</option>
                        </select>
                    </div>
                    <br />
                    <div className="form-group">
                        <label>商品名稱: </label>
                        <input 
                            type="text"
                            className='form-control'
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>商品概述: </label>
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
                        <label>商品價格: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>最低成團人數: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.minMember}
                            onChange={this.onChangeMinMember}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>結單日期: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="儲存活動" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}