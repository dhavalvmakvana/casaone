import React from 'react';
import './AddressForm.css';

class AddressForm extends React.Component {

    state = {
        formData: {
            firstName: '',
            secondName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            date: ''
        },
        formName: ''
    }

    componentDidMount() {
        const { data, dateName, formName } = this.props;

        let date;
        if (dateName === "Order Date") {
            date = data.orderDate;
        } else if (dateName === "Expected Delivery") {
            date = data.expectedDeliveryDate;
        } else {
            date = ""
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                formData: {
                    firstName: data.firstName,
                    secondName: data.secondName,
                    addressLine1: data.addressLine1,
                    addressLine2: data.addressLine2,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    country: data.country,
                    date: date
                },
                formName: formName
            }
        });
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { formName, dateName } = this.props;
        const { formData } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="address-form">
                <div className="heading">{formName}</div>
                
                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.firstName}
                    name="firstName"
                    placeholder="First Name"
                    className="address-form-input"
                />

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.secondName}
                    name="secondName"
                    placeholder="Second Name"
                    className="address-form-input"
                />

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.addressLine1}
                    name="addressLine1"
                    placeholder="Address Line 1"
                    className="address-form-input"
                />

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.addressLine2}
                    name="addressLine2"
                    placeholder="Address Line 2"
                    className="address-form-input"
                />

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.city}
                    name="city"
                    placeholder="City"
                    className="address-form-input"
                />

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.state}
                    name="state"
                    placeholder="State"
                    className="address-form-input"
                />

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.zipCode}
                    name="zipCode"
                    placeholder="Zip Code"
                    className="address-form-input"
                />

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.country}
                    name="country"
                    placeholder="Country"
                    className="address-form-input"
                />

                <div className="heading">{dateName}</div>

                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={formData.date}
                    name="date"
                    placeholder="DD/MM/YYYY"
                    className="address-form-input"
                />

            </form>
        )
    }
};

export default AddressForm;
