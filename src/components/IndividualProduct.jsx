import React from 'react';
import './IndividualProduct.css';

class IndividualProduct extends React.Component {

    state = {
        productId: '',
        productName: '',
        quantity: 0,
        price: 0,
        totalPrice: '',
        notes: '',
        errors: {
            quantity: '',
            price: ''
        }
    }

    componentDidMount() {
        const { data } = this.props;
        this.setState({
            productId: data.productId,
            productName: data.productName,
            quantity: data.quantity,
            price: data.price,
            totalPrice: data.price * data.quantity,
            notes: data.notes
        });
    }

    handleProductInput = (e) => {
        e.preventDefault();

        let name = e.target.name;
        let value = e.target.value;
        let currentProduct = this.state;

        if (name === "quantity") {
            if (value >= 0) {
                currentProduct = this.calculateTotalPrice("q", value);
            } else {
                this.setState({
                    ...this.state,
                    errors: {
                        quantity: "Should be greater than 0"
                    }
                });
                return;
            }
            
        }

        if (name === "price") {
            if (value >= 0) {
                currentProduct = this.calculateTotalPrice("p", value);
            } else {
                this.setState({
                    ...this.state,
                    errors: {
                        price: "Should be price than 0"
                    }
                });
                return;
            }
        }

        this.setState((prevState) => {
            return {
                ...prevState,
                [name]: value,
                totalPrice: currentProduct.totalPrice,
                errors: {
                    quantity: '',
                    price: ''
                }
            }
        });

        this.props.changeParentProductList({
            ...this.state,
                [name]: value,
                totalPrice: currentProduct.totalPrice,
                errors: {
                    quantity: '',
                    price: ''
                }
        });

    }

    calculateTotalPrice = (type, value) => {
        let { quantity, price } = this.state;

        if (type === "q") {
            quantity = value;
        } else {
            price = value;
        }

        let totalPrice = quantity * price;

        // this.setState((prevState) => {
        //     return {
        //         ...prevState,
        //         totalPrice: totalPrice
        //     }
        // });

        return {
            ...this.state,
            totalPrice: totalPrice
        }
    }

    render() {
        const { productId, productName, quantity, price, totalPrice, notes, errors } = this.state;
        const { handleDelete } = this.props;
        return (
            <React.Fragment>
            <div className="individual-product">

                <input
                    name="productId"
                    value={productId}
                    placeholder="Product Id"
                    onChange={this.handleProductInput}
                    type="text"
                    className="address-form-input flex-1-7"
                />

                <input
                    name="productName"
                    value={productName}
                    placeholder="Product Name"
                    onChange={this.handleProductInput}
                    type="text"
                    className="address-form-input flex-1-7"
                />

                <input
                    name="quantity"
                    value={quantity}
                    placeholder="Quantity"
                    onChange={this.handleProductInput}
                    type="number"
                    className="address-form-input flex-1-7"
                />

                <input
                    name="price"
                    value={price}
                    placeholder="Price"
                    onChange={this.handleProductInput}
                    type="number"
                    className="address-form-input flex-1-7"
                />

                <span className="address-form-input flex-1-7">
                    {totalPrice}
                </span>

                <input
                    name="notes"
                    value={notes}
                    placeholder="Note ..."
                    onChange={this.handleProductInput}
                    className="address-form-input flex-1-7"
                    type="text"
                />

                <button onClick={handleDelete(productId)} className="button flex-1-7">
                    Delete
                </button>

            </div>
            <div>
                <div>{errors.quantity}</div>
                <div>{errors.price}</div>
            </div>
            </React.Fragment>
        )
    }
}

export default IndividualProduct;