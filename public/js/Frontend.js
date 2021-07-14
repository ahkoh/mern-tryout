var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

toastr.options = {
	"closeButton": false,
	"debug": false,
	"newestOnTop": false,
	"progressBar": true,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "300",
	"timeOut": "3000",
	"extendedTimeOut": "0",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};

var _wc = axios.create({
	baseURL:'/',
	timeout: 10000,
	withCredentials: true,
	headers: { 'X-Custom-Header': 'MERN' }
});

_wc.interceptors.response.use(function (response) {
	if (response.data && response.data.OK && response.data.OK !== 1) {
		toastr["success"](response.data.OK);
	}
	return response;
}, function (error) {
	if (error.response && error.response.data && error.response.data.Error) {
		toastr["error"](error.response.data.Error);

		//} else if (error.request) {
		//	alert(error.request)
	} else if (error.message) {
		alert(error.message);
	}
	// console.log('axios-error', error)
	// console.log('axios-error.response', error.response)
	return Promise.reject(error);
});

function App() {
	var _React$useState = React.useState(''),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    login = _React$useState2[0],
	    setLogin = _React$useState2[1];

	if (login) return React.createElement(Todos, { setLogin: setLogin });else return React.createElement(Login, { setLogin: setLogin });
}

ReactDOM.render(React.createElement(
	React.StrictMode,
	null,
	React.createElement(App, null)
), document.getElementById('root'));
