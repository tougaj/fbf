/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/fbf.js":
/*!*******************!*\
  !*** ./js/fbf.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jquery_1 = __importDefault(__webpack_require__(/*! jquery */ \"jquery\"));\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar React = __importStar(__webpack_require__(/*! react */ \"react\"));\nvar ReactDOM = __importStar(__webpack_require__(/*! react-dom */ \"react-dom\"));\nvar FriendList_1 = __webpack_require__(/*! ./сomponents/FriendList */ \"./js/сomponents/FriendList.js\");\nvar Fbf = (function () {\n    function Fbf() {\n    }\n    Fbf.setDataTypeValues = function (ASMID, ARelationType) {\n        Fbf.nSMID = ASMID;\n        Fbf.nRelationType = ARelationType;\n        jquery_1.default('#smID,#fake_smID').val(Fbf.nSMID.toString());\n        jquery_1.default('#relationType,#fake_relationType').val(Fbf.nRelationType.toString());\n        return 0;\n    };\n    Fbf.prototype.changeRelationType = function (nNewRelationType) {\n        Fbf.setDataTypeValues(Fbf.nSMID, nNewRelationType);\n        this.getFriends(false);\n    };\n    Fbf.defineDataType = function (sHTML) {\n        if (/id=\"friends_user_row\\d+\"/i.test(sHTML))\n            return Fbf.setDataTypeValues(2, 0);\n        if (/i\\.mycdn\\.me/i.test(sHTML)) {\n            if (/friendSubscribers/i.test(sHTML))\n                return Fbf.setDataTypeValues(3, 2);\n            else\n                return Fbf.setDataTypeValues(3, 1);\n        }\n        if (/friend_list_item/i.test(sHTML))\n            return Fbf.setDataTypeValues(1, 1);\n        if (/fbProfileBrowserListItem/i.test(sHTML))\n            return Fbf.setDataTypeValues(1, 2);\n        return Fbf.setDataTypeValues(0, 0);\n    };\n    Fbf.prototype.getFriends = function (fNeedDefineType) {\n        if (fNeedDefineType === void 0) { fNeedDefineType = true; }\n        var sElementHTML = jquery_1.default('#ta').val();\n        if (fNeedDefineType)\n            Fbf.defineDataType(sElementHTML);\n        exports.fbf.fillFriendTable(sElementHTML);\n    };\n    Fbf.prototype.fillFriendTable = function (sElementHTML) {\n        var arTemp = [];\n        var div = jquery_1.default(sElementHTML);\n        Fbf.arFriends = [];\n        if (Fbf.nRelationType !== 0) {\n            if (Fbf.nRelationType === 1) {\n                switch (Fbf.nSMID) {\n                    case 1:\n                        jquery_1.default('li>[data-testid=\"friend_list_item\"]', div).each(function () {\n                            var item = this;\n                            var a = jquery_1.default('a[data-hovercard]', item).eq(0);\n                            var sID = a.data('hovercard');\n                            var m = sID.match(/hovercard\\/user.php\\?id=(\\d+)/);\n                            if (m && m[1]) {\n                                var nID = m[1];\n                                var sName = jquery_1.default('img[role=\"img\"]', item).attr('aria-label');\n                                var sFace = jquery_1.default('img[role=\"img\"]', item).attr('src');\n                                arTemp.push({\n                                    fbID: nID,\n                                    title: sName,\n                                    face: lodash_1.default.unescape(sFace),\n                                });\n                            }\n                        });\n                        break;\n                    case 2:\n                        jquery_1.default('.friends_user_row', div).each(function () {\n                            var item = this;\n                            var sID = jquery_1.default(item).attr('id');\n                            var m = sID.match(/friends_user_row(\\d+)/);\n                            if (m && m[1]) {\n                                var nID = m[1];\n                                var sName = jquery_1.default('.friends_field_title a', item).html().replace(/<br>/ig, ' ');\n                                var sFace = jquery_1.default('img.friends_photo_img', item).attr('src');\n                                arTemp.push({\n                                    fbID: nID,\n                                    title: sName,\n                                    face: lodash_1.default.unescape(sFace),\n                                });\n                            }\n                        });\n                        break;\n                    case 3:\n                        jquery_1.default('.ugrid_i', div).each(function () {\n                            var item = this;\n                            var nID = jquery_1.default('.entity-item', item).data('entity-id');\n                            var sName = jquery_1.default('.ucard-w_t a', item).html().replace(/<br>/ig, ' ');\n                            var sFace = 'https:' + jquery_1.default('img.photo_img', item).attr('src');\n                            arTemp.push({\n                                fbID: nID,\n                                title: sName,\n                                face: lodash_1.default.unescape(sFace),\n                            });\n                        });\n                        break;\n                }\n            }\n            else {\n                switch (Fbf.nSMID) {\n                    case 1:\n                        jquery_1.default('li.fbProfileBrowserListItem', div).each(function () {\n                            var item = this;\n                            var a = jquery_1.default('a[data-hovercard]', item).eq(0);\n                            var sID = a.data('hovercard');\n                            var m = sID.match(/hovercard\\/user.php\\?id=(\\d+)/);\n                            if (m && m[1]) {\n                                var nID = m[1];\n                                var sName = jquery_1.default('img[role=\"img\"]', item).attr('aria-label');\n                                var sFace = jquery_1.default('img[role=\"img\"]', item).attr('src');\n                                arTemp.push({\n                                    fbID: nID,\n                                    title: sName,\n                                    face: lodash_1.default.unescape(sFace),\n                                });\n                            }\n                        });\n                        break;\n                    case 2:\n                        jquery_1.default('.friends_user_row', div).each(function () {\n                            var item = this;\n                            var sID = jquery_1.default(item).attr('id');\n                            var m = sID.match(/friends_user_row(\\d+)/);\n                            if (m && m[1]) {\n                                var nID = m[1];\n                                var sName = jquery_1.default('.friends_field_title a', item).html().replace(/<br>/ig, ' ');\n                                var sFace = jquery_1.default('img.friends_photo_img', item).attr('src');\n                                arTemp.push({\n                                    fbID: nID,\n                                    title: sName,\n                                    face: lodash_1.default.unescape(sFace),\n                                });\n                            }\n                        });\n                        break;\n                    case 3:\n                        jquery_1.default('.ugrid_i', div).each(function () {\n                            var item = this;\n                            var nID = jquery_1.default('.__l', item).data('id');\n                            var sName = jquery_1.default('.caption .ellip a', item).html().replace(/<br>/ig, ' ');\n                            var sFace = 'https:' + jquery_1.default('img.photo_img', item).attr('src');\n                            arTemp.push({\n                                fbID: nID,\n                                title: sName,\n                                face: lodash_1.default.unescape(sFace),\n                            });\n                        });\n                        break;\n                }\n            }\n            Fbf.arFriends = arTemp.map(function (friend) {\n                friend.smID = Fbf.nSMID;\n                friend.relationType = Fbf.nRelationType;\n                return friend;\n            });\n        }\n        Fbf.drawUsers();\n        jquery_1.default('input[name=withfaces]', jquery_1.default('#fmGetFriends')).prop('checked', Fbf.arFriends.length <= Fbf.WITH_FACES_MAX_COUNT);\n    };\n    Fbf.drawUsers = function () {\n        if (Fbf.nSMID === 0 || Fbf.nRelationType === 0) {\n            jquery_1.default('#relationType').focus().closest('.form-group').addClass('has-error');\n            ;\n            alert('Не можливо визначити тип відношень для даної соціальної мережі. Оберіть, будь ласка, тип відношень');\n            return;\n        }\n        jquery_1.default('span', jquery_1.default('#btnFriends')).text('(' + Fbf.arFriends.length + ')');\n        ReactDOM.render((React.createElement(FriendList_1.FriendList, { friends: Fbf.arFriends, SMID: Fbf.nSMID, relationType: Fbf.nRelationType })), document.getElementById(\"divFriends\"));\n    };\n    Fbf.prototype.loadFriends = function () {\n        if (Fbf.arFriends.length === 0) {\n            alert('Список друзів пустий. Можливо, Ви забули натиснути на кнопку показу друзів.');\n            return false;\n        }\n        if (jquery_1.default.trim(jquery_1.default('#filename').val()) === '') {\n            alert('Введіть, будь ласка, назву вихідного файлу');\n            jquery_1.default('#filename').focus();\n            return false;\n        }\n        var s = encodeURIComponent(JSON.stringify(Fbf.arFriends));\n        if (Fbf.WITH_FACES_MAX_COUNT < Fbf.arFriends.length) {\n            jquery_1.default('input[name=withfaces]', jquery_1.default('#fmGetFriends')).prop('checked', false);\n        }\n        jquery_1.default('input[name=data]', jquery_1.default('#fmGetFriends')).val(s);\n        setTimeout(function () {\n            jquery_1.default('#ta,#filename').val('');\n            jquery_1.default('#divFriends').empty();\n            jquery_1.default('span', jquery_1.default('#btnFriends')).text('');\n            Fbf.setDataTypeValues(0, 0);\n            Fbf.arFriends = [];\n        }, 1000);\n        return true;\n    };\n    Fbf.prototype.onChangeRelationType = function () {\n        if (Fbf.nSMID == 2) {\n            jquery_1.default(this).closest('.form-group').removeClass('has-error');\n            exports.fbf.changeRelationType(parseInt(jquery_1.default(this).val()));\n        }\n        else {\n            jquery_1.default(this).val(Fbf.nRelationType.toString());\n            alert('Не можливо змінити тип відношень для даної соціальної мережі!');\n        }\n    };\n    Fbf.WITH_FACES_MAX_COUNT = 200;\n    Fbf.arFriends = [];\n    Fbf.nSMID = 0;\n    Fbf.nRelationType = 0;\n    return Fbf;\n}());\nexports.Fbf = Fbf;\n;\nexports.fbf = new Fbf();\n\n\n//# sourceURL=webpack:///./js/fbf.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar fbf_1 = __webpack_require__(/*! ./fbf */ \"./js/fbf.js\");\n$(document).ready(function () {\n    $('#btnFriends').click(function () { return fbf_1.fbf.getFriends(); });\n    $('#fmGetFriends').submit(fbf_1.fbf.loadFriends);\n    $('#relationType').change(fbf_1.fbf.onChangeRelationType);\n});\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/сomponents/Friend.js":
/*!*********************************!*\
  !*** ./js/сomponents/Friend.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __importStar(__webpack_require__(/*! react */ \"react\"));\nexports.Friend = function (props) {\n    var friend = props.friend, SMID = props.SMID, icon = props.icon, link = props.link;\n    return (React.createElement(\"div\", { className: \"col-md-4\" },\n        React.createElement(\"a\", { target: \"_blank\", href: link },\n            React.createElement(\"div\", { className: \"media\", \"data-id\": \"{friend.fbID}\" },\n                React.createElement(\"div\", { className: \"media-left\" },\n                    React.createElement(\"img\", { className: \"media-object img-thumbnail imf-rounded\", src: SMID === 1 ? friend.face : 'img/man.jpg' })),\n                React.createElement(\"div\", { className: \"media-body media-middle\" },\n                    React.createElement(\"h4\", null, friend.title),\n                    React.createElement(\"small\", null,\n                        \"(ID: \",\n                        friend.fbID,\n                        \")\"),\n                    React.createElement(\"i\", { className: icon }))))));\n};\n\n\n//# sourceURL=webpack:///./js/%D1%81omponents/Friend.js?");

/***/ }),

/***/ "./js/сomponents/FriendList.js":
/*!*************************************!*\
  !*** ./js/сomponents/FriendList.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __importStar(__webpack_require__(/*! react */ \"react\"));\nvar Friend_1 = __webpack_require__(/*! ./Friend */ \"./js/сomponents/Friend.js\");\nexports.FriendList = function (props) {\n    var arSM = {\n        1: {\n            site: 'https://www.facebook.com/',\n            idPrefix: '',\n        },\n        2: {\n            site: 'https://vk.com/',\n            idPrefix: 'id',\n        },\n        3: {\n            site: 'https://ok.ru/',\n            idPrefix: 'profile/',\n        },\n    };\n    var friends = props.friends, SMID = props.SMID, relationType = props.relationType;\n    var icon = 'fa fa-lg fa-fw fa-' + (relationType === 1 ? 'handshake-o' : 'rss');\n    return (React.createElement(\"div\", null, friends.map(function (friend) {\n        return (React.createElement(Friend_1.Friend, { key: friend.fbID, friend: friend, SMID: SMID, icon: icon, link: arSM[SMID].site + arSM[SMID].idPrefix + friend.fbID }));\n    })));\n};\n\n\n//# sourceURL=webpack:///./js/%D1%81omponents/FriendList.js?");

/***/ }),

/***/ "jquery":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = $;\n\n//# sourceURL=webpack:///external_%22$%22?");

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = _;\n\n//# sourceURL=webpack:///external_%22_%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });