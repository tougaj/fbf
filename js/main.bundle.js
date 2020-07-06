/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./js/main.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/components/actionForm.js":
/*!*************************************!*\
  !*** ./js/components/actionForm.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const init_1 = __webpack_require__(/*! ../init */ "./js/init.js");
const fontIcon_1 = __importDefault(__webpack_require__(/*! ./fontIcon */ "./js/components/fontIcon.js"));
const ActionForm = ({ socialMediaId, friends, onFriendsLoaded, }) => {
    const withFaces = init_1.useBooleanField(false);
    const onSubmit = () => onFriendsLoaded();
    return (react_1.default.createElement("form", { action: "getFriends.php", method: "post", className: "form-inline justify-content-center mt-3", target: "_blank", onSubmit: onSubmit },
        react_1.default.createElement("input", { type: "hidden", name: "smID", value: socialMediaId || '0' }),
        react_1.default.createElement("input", { type: "hidden", name: "relationType", value: "1" }),
        react_1.default.createElement("input", { type: "hidden", name: "data", value: encodeURIComponent(JSON.stringify(friends)) }),
        react_1.default.createElement("div", { className: "form-group" },
            react_1.default.createElement("label", { className: "control-label", htmlFor: "fake_smID" }, "\u0421\u043E\u0446\u0456\u0430\u043B\u044C\u043D\u0430 \u043C\u0435\u0440\u0435\u0436\u0430"),
            react_1.default.createElement("select", { id: "fake_smID", className: "form-control ml-1", autoComplete: "off", disabled: true, value: socialMediaId || '0' },
                react_1.default.createElement("option", { disabled: true, value: "0" }, "\u041D\u0435 \u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E"),
                init_1.SOCIAL_MEDIA.map(({ id, title }) => (react_1.default.createElement("option", { key: id, value: id }, title))))),
        react_1.default.createElement("div", { className: "form-group ml-3" },
            react_1.default.createElement("label", { className: "control-label", htmlFor: "filename" }, "\u0406\u043C'\u044F \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0443"),
            react_1.default.createElement("input", { type: "text", className: "form-control ml-1", name: "filename", id: "filename", placeholder: "\u0406\u043C'\u044F \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0443", autoComplete: "off" })),
        react_1.default.createElement("div", { className: "form-check ml-3", title: "\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0443 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u043E\u0431\u043B\u0456\u043A\u043E\u0432\u043E\u043A" },
            react_1.default.createElement("input", Object.assign({ id: "withfaces", name: "withfaces", type: "checkbox" }, withFaces, { autoComplete: "off", className: "form-check-input" })),
            react_1.default.createElement("label", { htmlFor: "withfaces", className: "form-check-label ml-1" }, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F")),
        react_1.default.createElement("button", { type: "submit", className: "btn btn-primary ml-3", disabled: !socialMediaId || (friends === null || friends === void 0 ? void 0 : friends.length) === 0 },
            react_1.default.createElement(fontIcon_1.default, { name: "icon-download", variant: "lg" }),
            " \u041E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0444\u0430\u0439\u043B")));
};
exports.default = ActionForm;


/***/ }),

/***/ "./js/components/app.js":
/*!******************************!*\
  !*** ./js/components/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const actionForm_1 = __importDefault(__webpack_require__(/*! ./actionForm */ "./js/components/actionForm.js"));
const fbf_1 = __webpack_require__(/*! ../fbf */ "./js/fbf.js");
const App = ({}) => {
    const [rawText, setRawText] = react_1.useState('');
    const [socialMediaId, setSocialMediaId] = react_1.useState();
    const [friends, setFriends] = react_1.useState();
    react_1.useEffect(() => {
        fetch('test_data/fbf.txt')
            .then((response) => response.text())
            .then(setRawText);
    }, []);
    react_1.useEffect(() => {
        const [smId, f] = fbf_1.convertHTML2Friends(rawText);
        setSocialMediaId(smId);
        setFriends(f);
    }, [rawText]);
    const onRawChange = (event) => setRawText(event.target.value.trim());
    const onFriendsLoaded = () => {
        setRawText('');
        return true;
    };
    return (react_1.default.createElement("div", { className: "container" },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "col" },
                react_1.default.createElement("h3", { className: "text-center" }, "\u0414\u043E\u0434\u0430\u0439\u0442\u0435 html-\u043A\u043E\u0434 \u0432 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0443 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0442\u0430 \u043E\u0431\u0435\u0440\u0456\u0442\u044C \u0434\u0456\u044E"),
                react_1.default.createElement("textarea", { className: "form-control", rows: 10, placeholder: "html-\u043A\u043E\u0434 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0443, \u0449\u043E \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438 \u043F\u0440\u043E \u0434\u0440\u0443\u0437\u0456\u0432", autoComplete: "off", value: rawText, onChange: onRawChange }),
                react_1.default.createElement(actionForm_1.default, { socialMediaId: socialMediaId, friends: friends, onFriendsLoaded: onFriendsLoaded })))));
};
exports.default = App;


/***/ }),

/***/ "./js/components/fontIcon.js":
/*!***********************************!*\
  !*** ./js/components/fontIcon.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const FontIcon = ({ name, className, style, variant }) => {
    let sVariant = '';
    if (variant)
        sVariant = variant === 'lg' ? 'icon-lg' : 'icon-xl';
    return (react_1.default.createElement("svg", { className: `icon ${className || ''} ${sVariant}`, style: style },
        react_1.default.createElement("use", { xlinkHref: `#${name}` })));
};
exports.default = FontIcon;


/***/ }),

/***/ "./js/fbf.js":
/*!*******************!*\
  !*** ./js/fbf.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHTML2Friends = void 0;
const init_1 = __webpack_require__(/*! ./init */ "./js/init.js");
exports.convertHTML2Friends = (raw) => {
    const sm = defineSocialMedia(raw);
    return [sm, []];
};
const defineSocialMedia = (raw) => {
    if (/facebook\.com/i.test(raw))
        return init_1.ESocialMedia.fb;
    return undefined;
};


/***/ }),

/***/ "./js/init.js":
/*!********************!*\
  !*** ./js/init.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useBooleanField = exports.useFormField = exports.SOCIAL_MEDIA = exports.ESocialMedia = void 0;
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var ESocialMedia;
(function (ESocialMedia) {
    ESocialMedia["fb"] = "1";
    ESocialMedia["vk"] = "2";
    ESocialMedia["ok"] = "3";
})(ESocialMedia = exports.ESocialMedia || (exports.ESocialMedia = {}));
exports.SOCIAL_MEDIA = [
    {
        id: ESocialMedia.fb,
        site: 'https://www.facebook.com/',
        idPrefix: '',
        title: 'Facebook',
    },
    {
        id: ESocialMedia.vk,
        site: 'https://vk.com/',
        idPrefix: 'id',
        title: 'Вконтакте',
    },
    {
        id: ESocialMedia.ok,
        site: 'https://ok.ru/',
        idPrefix: 'profile/',
        title: 'Одноклассники',
    },
];
exports.useFormField = (initialValue) => {
    const [value, setValue] = react_1.useState(initialValue);
    react_1.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    const onChange = react_1.useCallback((event) => {
        setValue(event.target.value);
    }, []);
    return { value, onChange };
};
exports.useBooleanField = (initialChecked) => {
    const [checked, setChecked] = react_1.useState(initialChecked);
    react_1.useEffect(() => {
        setChecked(initialChecked);
    }, [initialChecked]);
    const onChange = react_1.useCallback((event) => {
        setChecked(event.target.checked);
    }, []);
    return { checked, onChange };
};


/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
const app_1 = __importDefault(__webpack_require__(/*! ./components/app */ "./js/components/app.js"));
moment.locale('uk');
react_dom_1.default.render(react_1.default.createElement(app_1.default, null), document.getElementById('app'));


/***/ }),

/***/ "./node_modules/moment/locale sync recursive [\\/\\\\](uk(\\.js)?)$":
/*!************************************************************!*\
  !*** ./node_modules/moment/locale sync [\/\\](uk(\.js)?)$ ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive [\\/\\\\](uk(\\.js)?)$";

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map