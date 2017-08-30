import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';

//本地服务器
const API_URL = 'http://localhost:8080';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'//这不是必要条件
};

let a = {
    1: 'q',
    2: 'w',
    3: {
        a: 'qwe123'
    }
};
console.log(a);
let cache = JSON.stringify(a);
let b = JSON.parse(cache);
b[1] = 'qqqqq';
console.log(b);

class KanbanBoardContainer extends Component{
    constructor(){
        super(...arguments);//一个问题，这里的传参是什么鬼？
        this.state = {
            cards:[]
        };
    }

    componentDidMount(){
        fetch(API_URL+'/cards.json', {header: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('error fetching and parsing data', error);
            });
    }

    addTask(cardId, taskName){
        var newTask = {
            id: Date.now(),
            name: taskName,
            done: false
        };
        this.state.cards.forEach(function(card, index){
            if(card.id === cardId){
                card.tasks.push(newTask);
            }
        });
        console.log(this.state.cards);
        this.setState({
            cards: this.state.cards
        });
    }

    deleteTask(cardId, taskId, taskIndex){
        this.state.cards.forEach(function(card, index){
            if(card.id === cardId){
                card.tasks.splice(taskIndex, 1);
            }
        });
       console.log(this.state.cards);
       this.setState({
           cards: this.state.cards
       });
    }

    toggleTask(cardId, taskId, taskIndex){
        this.state.cards.forEach(function(card, index){
            if(card.id === cardId){
                card.tasks[taskIndex].done = !card.tasks[taskIndex].done;
            }
        });
        console.log(this.state.cards);
        this.setState({
            cards: this.state.cards
        });
    }

    render(){
        return(
            <KanbanBoard cards={this.state.cards} taskCallbacks={{
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)
            }} />
        );
    }
}

export default KanbanBoardContainer;