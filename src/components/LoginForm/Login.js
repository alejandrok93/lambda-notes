import React from 'react';
import axios from 'axios';
import LoginAlert from './LoginAlert';

class Login extends React.Component {
	constructor() {
		super();
		this.state = { username: '', password: '' };
	}

	handleInput(e) {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username,
			password: this.state.password
		};
		if (!user.username || !user.password) {
			alert('Please sign in ');
		}
		const url =
			'https://lambda-notes-backend-project.herokuapp.com/api/users/login';
		axios
			.post(url, user)
			.then(response => {
				console.log(response);
				console.log(response.data);
				localStorage.setItem('jwt', response.data.token);
				window.location.reload();
			})
			.catch(err => {
				if (err.response.status === 400) {
					this.setState({ loginAlert: true });
				}
				console.log(err);
			});

		this.setState({ username: '', password: '' });
	}
	render() {
		return (
			<div className="form-container login-container">
				<h1>Please log in</h1>
				{this.state.loginAlert ? (
					<LoginAlert
						message={'There was an error with the username or password'}
					/>
				) : null}
				<form>
					<input
						type="text"
						name="username"
						value={this.state.username}
						placeholder="Username"
						onChange={e => this.handleInput(e)}
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={e => this.handleInput(e)}
						placeholder="Password"
					/>
					<button className="login-button" onClick={e => this.handleSubmit(e)}>
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
