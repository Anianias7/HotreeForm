import React, {Component, Fragment} from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header/Header";
import Form from "./containers/Form/Form";
import Fields from './data/fields'
import Success from "./components/Success/Success";

class App extends Component {

    state = {
        visible: true
    };

    validFormHandler = () => {
        this.setState({
            visible: false
        })
    };

    render() {
        return (
            <Fragment>
                {this.state.visible ? (
                    <Layout>
                        <Header/>
                        <Form fields={Fields}
                              validForm={this.validFormHandler}/>
                    </Layout>
                ) : (
                    <Layout>
                        <Header/>
                        <Success/>
                    </Layout>
                )}
            </Fragment>

        );
    }
}

export default App;
