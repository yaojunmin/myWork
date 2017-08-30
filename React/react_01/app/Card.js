import React, { Component } from 'react';
import CheckList from './CheckList';
import marked from 'marked';//用来渲染html标签的（markdown格式的数据）
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//自定义proptype校验器
let titlePropType = (props, propName, componentName) => {
	if(props[propName]){
		let value = props[propName];
		if(typeof value !== 'string' || value.length > 6){
			return new Error(
				//这种符号加${}的方式就可以变成变量了，比常规的字符串拼接来的有意思。。。//es6语法
				`${propName} in ${componentName} is longer than 80 characters`
			);
		}
	}
};

class Card extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			showDetails: false
		};
	}

	toggleDetails(){
		this.setState({
			showDetails: !this.state.showDetails
		});
	}

	render(){
		let cardDetails;
		if(this.state.showDetails){
			cardDetails = (
				<div className='card_details'>
                    {/*dangerouslySetInnerHTML用来渲染动态生成的html*/}
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
					<CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
				</div>
			);
		}

		let className = this.state.showDetails ? 'card_title--is-open' : '';

		let sideColor = {
			position: 'absolute',
			zIndex: -1,
			top: 0,
			bottom: 0,
			left: 0,
			width: 7,
			backgroundColor: this.props.color
		};

		return(
			<div className='card'>
				<div style={sideColor} />
				<div className={'card_title '+className} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
					<ReactCSSTransitionGroup transitionName="toggle"
											 	transitionEnterTimeout={250}
											 	transitionLeaveTimeout={250} >
					{cardDetails}
					</ReactCSSTransitionGroup>
			</div>
		);
	}
}
Card.propTypes = {
	id: PropTypes.number,
	title: titlePropType,
	description: PropTypes.string,
	color: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallback: PropTypes.object
};

export default Card;