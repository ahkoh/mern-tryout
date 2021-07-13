var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from 'react';
// import ReactDOM from 'react-dom';

var Login = function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.onSignUpClicked = function (event) {
			_this.container.current.classList.add("right-panel-active");
		};

		_this.onSignInClicked = function (event) {
			_this.container.current.classList.remove("right-panel-active");
		};

		_this.onSubmitSignIn = function (event) {
			event.preventDefault();
			var formData = new FormData(event.target);
			var formProps = Object.fromEntries(formData);
			postData('/login', formProps).then(function (data) {
				console.log(data);
			});
			console.log(event.target.elements, formData, formProps);
		};

		_this.onSubmitSignUp = function (event) {
			event.preventDefault();
			var formData = new FormData(event.target);
			var formProps = Object.fromEntries(formData);
			console.log(event.target.elements, formData, formProps);
		};

		_this.container = React.createRef();
		return _this;
	}

	_createClass(Login, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ ref: this.container, className: "container" },
					React.createElement(
						"div",
						{ className: "form-container sign-up-container" },
						React.createElement(
							"form",
							{ onSubmit: this.onSubmitSignUp },
							React.createElement(
								"h1",
								null,
								"Create Account"
							),
							React.createElement("input", { name: "firstName", type: "text", placeholder: "First Name", required: true, pattern: "[ A-Za-z]+", title: "letters only" }),
							React.createElement("input", { name: "lastName", type: "text", placeholder: "Last Name", required: true, pattern: "[ A-Za-z]+", title: "letters only" }),
							React.createElement("input", { name: "email", type: "email", placeholder: "Email", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$", title: "eg account@domain.com" }),
							React.createElement("input", { name: "password", type: "password", placeholder: "Password", required: true, minLength: "8", maxLength: "20", pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", title: "at least one number, one uppercase & lowercase letter, and 8 to 20 characters" }),
							React.createElement(
								"button",
								null,
								"Sign Up"
							)
						)
					),
					React.createElement(
						"div",
						{ className: "form-container sign-in-container" },
						React.createElement(
							"form",
							{ onSubmit: this.onSubmitSignIn },
							React.createElement(
								"h1",
								null,
								"Sign in"
							),
							React.createElement("input", { name: "email", type: "email", placeholder: "Email", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$", title: "eg account@domain.com" }),
							React.createElement("input", { name: "password", type: "password", placeholder: "Password", required: true, minLength: "8", maxLength: "20", pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", title: "at least one number, one uppercase & lowercase letter, and 8 to 20 characters" }),
							React.createElement(
								"button",
								null,
								"Sign In"
							)
						)
					),
					React.createElement(
						"div",
						{ className: "overlay-container" },
						React.createElement(
							"div",
							{ className: "overlay" },
							React.createElement(
								"div",
								{ className: "overlay-panel overlay-left" },
								React.createElement(
									"h1",
									null,
									"Welcome Back!"
								),
								React.createElement(
									"p",
									null,
									"To keep connected with us please login with your personal info"
								),
								React.createElement(
									"button",
									{ className: "ghost", onClick: this.onSignInClicked },
									"Sign In"
								)
							),
							React.createElement(
								"div",
								{ className: "overlay-panel overlay-right" },
								React.createElement(
									"h1",
									null,
									"Hello, Friend!"
								),
								React.createElement(
									"p",
									null,
									"Enter your personal details and start journey with us"
								),
								React.createElement(
									"button",
									{ className: "ghost", onClick: this.onSignUpClicked },
									"Sign Up"
								)
							)
						)
					)
				),
				React.createElement(
					"footer",
					null,
					React.createElement(
						"p",
						null,
						"Created by Florin Pop"
					)
				)
			);
		}
	}]);

	return Login;
}(React.Component);

ReactDOM.render(React.createElement(
	React.StrictMode,
	null,
	React.createElement(Login, null)
), document.getElementById('login'));