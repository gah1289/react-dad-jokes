import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jokes : []
		};

		this.vote = this.vote.bind(this);
	}
	numJokesToGet = 10;

	async componentDidMount() {
		this.getJokes();
	}

	async getJokes() {
		let j = [
			...this.state.jokes
		];
		let ids = [];
		while (j.length < this.numJokesToGet) {
			let res = await axios.get('https://icanhazdadjoke.com', {
				headers : { Accept: 'application/json' }
			});
			let { status, ...jokeObj } = res.data;

			if (!ids.includes(jokeObj.id)) {
				jokeObj.votes = 0;
				ids.push(jokeObj.id);
				j.push(jokeObj);
				this.setState({
					jokes : [
						...j
					]
				});
			}
		}
	}

	vote(id, delta) {
		this.setState((state) => ({
			jokes : state.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
		}));
	}

	generateNewJokes() {
		window.location.reload();
	}

	render() {
		let sortedJokes = [
			...this.state.jokes
		].sort((a, b) => b.votes - a.votes);
		return (
			<div className="JokeList">
				<h1>Dad Jokes</h1>
				{sortedJokes.map((joke) => (
					<Joke text={joke.joke} key={joke.id} id={joke.id} votes={joke.votes} vote={this.vote} />
				))}
				<button className="JokeList-getmore" onClick={this.generateNewJokes}>
					Get New Jokes
				</button>
			</div>
		);
	}
}

export default JokeList;
