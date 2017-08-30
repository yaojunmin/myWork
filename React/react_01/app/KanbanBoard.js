import React, { Component } from 'react';
import List from './List';
import PropTypes from 'prop-types';/*书上的方法已经过时了；react v15.5版本改用这个方式了；*/

class KanbanBoard extends Component {
	render(){
		return (
			<div className='app'>
				<List id='todo' title='to do' taskCallbacks={this.props.taskCallbacks} cards={this.props.cards.filter((card) => card.status === 'todo')} />
				<List id='in-progress' title='to progress' taskCallbacks={this.props.taskCallbacks} cards={this.props.cards.filter((card) => card.status === 'in-progress')} />
				<List id='done' title='done' taskCallbacks={this.props.taskCallbacks} cards={this.props.cards.filter((card) => card.status === 'done')} />
			</div>
		);
	}
}
KanbanBoard.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object),
	taskCallback: PropTypes.object
};

export default KanbanBoard;