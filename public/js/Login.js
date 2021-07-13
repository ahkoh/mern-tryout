var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Login = function Login(_ref) {
	var setLogin = _ref.setLogin;

	var _React$useState = React.useState(''),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    _buttondDisabled = _React$useState2[0],
	    setButtonDisabled = _React$useState2[1];

	var _container = React.createRef();
	var _inputSignIn = React.createRef();
	var _inputSignUp = React.createRef();

	React.useEffect(function () {
		_inputSignIn.current.focus();
	}, []);

	var onSignUpClicked = function onSignUpClicked(event) {
		_container.current.classList.add("right-panel-active");
		_inputSignUp.current.focus();
	};
	var onSignInClicked = function onSignInClicked(event) {
		_container.current.classList.remove("right-panel-active");
		_inputSignIn.current.focus();
	};
	var onSubmitSignIn = function onSubmitSignIn(event) {
		event.preventDefault();
		var formData = new FormData(event.target);
		var formProps = Object.fromEntries(formData);

		setButtonDisabled(true);
		_wc.post('login', formProps).then(function (response) {
			setLogin(event.target.elements[0].value);
		}).catch(function (error) {
			setButtonDisabled('');
		});
		// postData('/login', formProps).then(data => {
		// 	console.log(data);
		// });
		// console.log(event.target.elements, formData, formProps);
	};
	var handleInputChanged = function handleInputChanged(event) {
		event.target.setCustomValidity("");
	};
	var onSubmitSignUp = function onSubmitSignUp(event) {
		event.preventDefault();
		var formData = new FormData(event.target);
		var formProps = Object.fromEntries(formData);
		// console.log(event.target.elements, formData, formProps);
		if (formProps.password2 !== formProps.password) {
			var password2 = event.target.elements['password2'];
			password2.setCustomValidity("Confirm password does not match password above");
			password2.reportValidity();
			return;
		}

		_wc.post('register', formProps).then(function (response) {
			// setLogin(event.target.elements[0].value);
			onSignInClicked();
			_inputSignIn.current.value = formProps.email;
		}).catch(function (error) {
			setButtonDisabled('');
		});
	};
	return React.createElement(
		"div",
		null,
		React.createElement(
			"div",
			{ ref: _container, className: "container" },
			React.createElement(
				"div",
				{ className: "form-container sign-up-container" },
				React.createElement(
					"form",
					{ onSubmit: onSubmitSignUp },
					React.createElement(
						"h1",
						null,
						"Create Account"
					),
					React.createElement("input", { ref: _inputSignUp, name: "firstName", type: "text", placeholder: "First Name", required: true, pattern: "[ A-Za-z]+", title: "letters only" }),
					React.createElement("input", { name: "lastName", type: "text", placeholder: "Last Name", required: true, pattern: "[ A-Za-z]+", title: "letters only" }),
					React.createElement("input", { name: "email", type: "email", placeholder: "Email", autoComplete: "username", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$", title: "eg account@domain.com" }),
					React.createElement("input", { name: "password", type: "password", placeholder: "Password (6-20 characters)", autoComplete: "new-password", required: true, minLength: "6", maxLength: "20", xpattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", title: "6 to 20 characters" }),
					React.createElement("input", { name: "password2", type: "password", placeholder: "Confirm Password", autoComplete: "new-password", maxLength: "20", title: "Please repeat password above here", onChange: handleInputChanged }),
					React.createElement(
						"button",
						{ disabled: _buttondDisabled },
						"Sign Up"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "form-container sign-in-container" },
				React.createElement(
					"form",
					{ onSubmit: onSubmitSignIn },
					React.createElement(
						"h1",
						null,
						"Sign in"
					),
					React.createElement("input", { ref: _inputSignIn, name: "email", type: "email", placeholder: "Email", autoComplete: "username", required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$", title: "eg account@domain.com" }),
					React.createElement("input", { name: "password", type: "password", placeholder: "Password", autoComplete: "current-password", required: true, minLength: "6", maxLength: "20", xpattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", title: "6 to 20 characters" }),
					React.createElement(
						"button",
						{ disabled: _buttondDisabled },
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
							{ disabled: _buttondDisabled, className: "ghost", onClick: onSignInClicked },
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
							{ disabled: _buttondDisabled, className: "ghost", onClick: onSignUpClicked },
							"Sign Up"
						)
					)
				)
			)
		)
	);
};