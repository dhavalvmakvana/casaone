import React from 'react';
import './App.css';
import uuid from 'uuid';
import * as data from './data.json';
import AddressForm from './components/AddressForm';
import IndividualProduct from './components/IndividualProduct';

class App extends React.Component {

  state = {
    productList: [],
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      productList: data.products
    });
  }

  changeParentProductList = (newProduct) => {
    // e.preventDefault();
    const { productList } = this.state;
    const filterProductList = []
    
    productList.map((product) => {
      if (product.productId === newProduct.productId) {
        filterProductList.push(newProduct);
      } else {
        filterProductList.push(product);
      }
    });

    this.setState((prevState) => {
      return {
        ...prevState,
        productList: filterProductList
      }
    });
  }

  handleAddProduct = (e) => {
    e.preventDefault();

    let newEmptyProduct = {
      productId: uuid.v4(),
      productName: "",
      quantity: 0,
      price: 0,
      notes: ""
    };

    this.setState({
      ...this.state,
      productList: [...this.state.productList, newEmptyProduct]
    });
  }

  handleDeleteProduct = (id) => (e) => {
    e.preventDefault();
    const { productList } = this.state;
    const filterProductList = productList.filter((product) => {
      if (product.productId !== id) {
        return product;
      }
    });

    this.setState({
      ...this.state,
      productList: filterProductList
    })
  }

  handleSaveProducts = (e) => {
    e.preventDefault();
    const { productList } = this.state;
    console.log("Product List", productList);
  }

  render() {

    const { productList } =  this.state;

    return (
      <div className="App">
        Casa One
  
        <div className="card row">
          <AddressForm
            formName="Billing Address"
            dateName="Order Date"
            data={data.billingAddress}
          />
  
          <AddressForm
            formName="Shipping Address"
            dateName="Expected Delivery"
            data={data.shippingAddress}
          />
        </div>
  
        <div className="card">

          <div className="individual-product text-left">
            <div className="address-form-input flex-1-7 heading">Product ID</div>
            <div className="address-form-input flex-1-7 heading">Product Name</div>
            <div className="address-form-input flex-1-7 heading">Quantity</div>
            <div className="address-form-input flex-1-7 heading">Unit Price</div>
            <div className="address-form-input flex-1-7 heading">Total Price</div>
            <div className="address-form-input flex-1-7 heading">Notes</div>
            <div className="address-form-input flex-1-7 heading">Delete</div>
          </div>

          <hr/>

          {productList.map((p) => {
            return (
              <IndividualProduct
                handleDelete={this.handleDeleteProduct}
                data={p}
                key={p.productId}
                changeParentProductList={this.changeParentProductList}
              />
            )
          })}

          <div className="position-relative">
            <button onClick={this.handleAddProduct} className="button left">Add Product</button>
          </div>

          <div className="position-relative">
            <button className="button right" onClick={this.handleSaveProducts}>Save</button>
          </div>

        </div>
  
      </div>
    );
  }
}

export default App;
