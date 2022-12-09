import React from 'react';
import './Joke.css';

class Joke extends React.Component {
	constructor(props) {
		super(props);
		this.upvote = this.upvote.bind(this);
		this.downvote = this.downvote.bind(this);
	}

	upvote() {
		this.props.vote(this.props.id, +1);
	}
	downvote() {
		this.props.vote(this.props.id, -1);
	}

	render() {
		return (
			<div className="Joke">
				<div className="Joke-votearea">
					<button onClick={this.upvote}>
						<i className="fas fa-thumbs-up" />
					</button>

					<button onClick={this.downvote}>
						<i className="fas fa-thumbs-down" />
					</button>

					{this.props.votes}
				</div>

				<div className="Joke-text">{this.props.text}</div>
			</div>
		);
	}
}

export default Joke;
