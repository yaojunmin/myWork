import React, { Component } from 'react';
import { render } from 'react-dom';
import BankBalanceStore from './page6/BankBalanceStore';
import BankActions from './page6/BankActions';
// import $ from 'jquery';


class App6 extends Component{
    constructor(){
        super(...arguments);
        BankActions.createAccount();
        this.state = {
          balance: BankBalanceStore.getState()
        };
    }

    componentDidMount(){
        this.storeSubscription = BankBalanceStore.addListener(data => this.handleStoreChange(data));
    }

    componentWillUnmount(){
        this.storeSubscription.remove();
    }

    handleStoreChange(){
        this.setState({
            balance:BankBalanceStore.getState()
        });
    }

    deposit(){
        BankActions.depositIntoAccount(Number(this.refs.ammount.value));
        this.refs.ammount.value = '';
    }

    widthdraw(){
        BankActions.widthdrawFromAccount(Number(this.refs.ammount.value));
        this.refs.ammount.value = '';
    }

    render(){
        return (
            <div>
                <header>银行系统</header>
                <h1>你的账号余额为 {(this.state.balance).toFixed(2)}元</h1>
                <div className="atm">
                    <input type="text" placeholder="输入金额" ref="ammount" />
                    <br/>
                    <button onClick={this.widthdraw.bind(this)} >取出</button>
                    <button onClick={this.deposit.bind(this)} >存入</button>
                </div>
            </div>
        )
    }
}

render(<App6/>, document.getElementById('root'))