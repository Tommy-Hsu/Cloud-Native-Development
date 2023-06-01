import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateActivity extends Component {
    constructor(props) {
        super(props);

        this.onChangeActivityType = this.onChangeActivityType.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeMinMember = this.onChangeMinMember.bind(this);
        this.onChangeCurrentMember = this.onChangeCurrentMember.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            activityType: 'Product',
            name: '',
            description: '',
            price: 0,
            minMember: 0,
            currentMember: 0,
            date: new Date(),
            image: '',
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

    onChangeCurrentMember(event) {
        this.setState({
            currentMember: event.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    
    onChangeImage(event) {
        this.setState({
            image: event.target.value
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
            currentMember: this.state.currentMember,
            date: this.state.date,
            image: this.state.image
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
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
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
                    <div>
                        <label>商品名稱: </label>
                        <input
                            type="text"
                            className="form-control"
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
                    <div className='form-group'>
                        <input 
                            type="file" 
                            name="item_image"
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="建立活動" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}