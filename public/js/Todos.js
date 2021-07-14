var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var TodoItem = function TodoItem(_ref) {
	var text = _ref.text,
	    removeItem = _ref.removeItem;

	var handleRemove = function handleRemove() {
		_wc.delete('messages', { data: { "message": text } }).then(function (response) {
			removeItem(text);
		});
	};
	return React.createElement(
		"li",
		{ className: "list-item" },
		React.createElement(
			"p",
			null,
			text
		),
		React.createElement(
			"button",
			{ className: "close-btn", onClick: handleRemove },
			"X"
		)
	);
};

var Todos = function Todos(_ref2) {
	var setLogin = _ref2.setLogin;

	var _React$useState = React.useState(function () {
		return [];
	}),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    todos = _React$useState2[0],
	    setTodos = _React$useState2[1];

	var _React$useState3 = React.useState(''),
	    _React$useState4 = _slicedToArray(_React$useState3, 2),
	    _inputDisabled = _React$useState4[0],
	    setInputDisabled = _React$useState4[1];

	var _input = React.createRef();

	var removeItem = function removeItem(text) {
		setTodos(todos.filter(function (item) {
			return item !== text;
		}));
		_input.current && _input.current.setCustomValidity("");
	};

	React.useEffect(function () {
		_wc.get('messages').then(function (response) {
			if (response.data && response.data.messages) {
				var add = todos;
				response.data.messages.forEach(function (value, index, array) {
					add = add.concat(value);
				});
				setTodos(add);
			}
		});
	}, []);

	React.useEffect(function () {
		_input.current.focus();
	}, [todos]);

	var onSubmitAdd = function onSubmitAdd(event) {
		event.preventDefault();
		var el = event.target.elements[0];
		if (todos.includes(el.value)) {
			el.setCustomValidity("Item already exists");
			el.reportValidity();
			return;
		}
		setInputDisabled(true);
		_wc.post('messages', { "message": el.value }).then(function (response) {
			setTodos(todos.concat(el.value));
			el.value = '';
		}).finally(function () {
			setInputDisabled('');
			document.getElementsByTagName('ul')[0].scrollTop = document.getElementsByTagName('ul')[0].scrollHeight;
			el.focus();
		});
	};
	var handleInputChanged = function handleInputChanged(event) {
		event.target.setCustomValidity("");
	};
	var handleLogout = function handleLogout(event) {
		_wc.get('logout').then(function (response) {
			setLogin(null);
		});
	};

	return React.createElement(
		"div",
		null,
		React.createElement("link", { rel: "preconnect", href: "https://fonts.gstatic.com" }),
		React.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap", rel: "stylesheet" }),
		React.createElement(
			"div",
			{ className: "container" },
			React.createElement(
				"div",
				{ className: "to-do" },
				React.createElement(
					"div",
					{ className: "input" },
					React.createElement(
						"form",
						{ onSubmit: onSubmitAdd },
						React.createElement("input", { disabled: _inputDisabled, ref: _input, type: "text", autoComplete: "off", placeholder: "Enter new message here", title: "Maximum 280 character", maxLength: "280", required: true, onChange: handleInputChanged }),
						React.createElement(
							"button",
							{ disabled: _inputDisabled },
							"Add"
						),
						React.createElement(
							"button",
							{ type: "button", className: "logout", onClick: handleLogout },
							"Logout"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "task" },
					React.createElement(
						"ul",
						null,
						todos.map(function (item) {
							return React.createElement(TodoItem, { key: item, text: item, removeItem: removeItem });
						})
					)
				)
			)
		)
	);
};