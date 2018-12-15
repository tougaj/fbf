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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "jquery"));
var lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
var React = __importStar(__webpack_require__(/*! react */ "react"));
var ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "react-dom"));
var FriendList_1 = __webpack_require__(/*! ./сomponents/FriendList */ "./js/сomponents/FriendList.js");
var Fbf = (function () {
    function Fbf() {
    }
    Fbf.setDataTypeValues = function (ASMID, ARelationType) {
        Fbf.nSMID = ASMID;
        Fbf.nRelationType = ARelationType;
        jquery_1.default('#smID,#fake_smID').val(Fbf.nSMID.toString());
        jquery_1.default('#relationType,#fake_relationType').val(Fbf.nRelationType.toString());
        return 0;
    };
    Fbf.prototype.changeRelationType = function (nNewRelationType) {
        Fbf.setDataTypeValues(Fbf.nSMID, nNewRelationType);
        this.getFriends(false);
    };
    Fbf.defineDataType = function (sHTML) {
        if (/id="friends_user_row\d+"/i.test(sHTML))
            return Fbf.setDataTypeValues(2, 0);
        if (/i\.mycdn\.me/i.test(sHTML)) {
            if (/friendSubscribers/i.test(sHTML))
                return Fbf.setDataTypeValues(3, 2);
            else
                return Fbf.setDataTypeValues(3, 1);
        }
        if (/friend_list_item/i.test(sHTML))
            return Fbf.setDataTypeValues(1, 1);
        if (/fbProfileBrowserListItem/i.test(sHTML))
            return Fbf.setDataTypeValues(1, 2);
        return Fbf.setDataTypeValues(0, 0);
    };
    Fbf.prototype.getFriends = function (fNeedDefineType) {
        if (fNeedDefineType === void 0) { fNeedDefineType = true; }
        var sElementHTML = jquery_1.default('#ta').val();
        if (fNeedDefineType)
            Fbf.defineDataType(sElementHTML);
        exports.fbf.fillFriendTable(sElementHTML);
    };
    Fbf.prototype.fillFriendTable = function (sElementHTML) {
        var arTemp = [];
        var div = jquery_1.default(sElementHTML);
        Fbf.arFriends = [];
        if (Fbf.nRelationType !== 0) {
            if (Fbf.nRelationType === 1) {
                switch (Fbf.nSMID) {
                    case 1:
                        jquery_1.default('li>[data-testid="friend_list_item"]', div).each(function () {
                            var item = this;
                            var a = jquery_1.default('a[data-hovercard]', item).eq(0);
                            var sID = a.data('hovercard');
                            var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('img[role="img"]', item).attr('aria-label');
                                var sFace = jquery_1.default('img[role="img"]', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 2:
                        jquery_1.default('.friends_user_row', div).each(function () {
                            var item = this;
                            var sID = jquery_1.default(item).attr('id');
                            var m = sID.match(/friends_user_row(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('.friends_field_title a', item).html().replace(/<br>/ig, ' ');
                                var sFace = jquery_1.default('img.friends_photo_img', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 3:
                        jquery_1.default('.ugrid_i', div).each(function () {
                            var item = this;
                            var nID = jquery_1.default('.entity-item', item).data('entity-id');
                            var sName = jquery_1.default('.ucard-w_t a', item).html().replace(/<br>/ig, ' ');
                            var sFace = 'https:' + jquery_1.default('img.photo_img', item).attr('src');
                            arTemp.push({
                                fbID: nID,
                                title: sName,
                                face: lodash_1.default.unescape(sFace),
                            });
                        });
                        break;
                }
            }
            else {
                switch (Fbf.nSMID) {
                    case 1:
                        jquery_1.default('li.fbProfileBrowserListItem', div).each(function () {
                            var item = this;
                            var a = jquery_1.default('a[data-hovercard]', item).eq(0);
                            var sID = a.data('hovercard');
                            var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('img[role="img"]', item).attr('aria-label');
                                var sFace = jquery_1.default('img[role="img"]', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 2:
                        jquery_1.default('.friends_user_row', div).each(function () {
                            var item = this;
                            var sID = jquery_1.default(item).attr('id');
                            var m = sID.match(/friends_user_row(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('.friends_field_title a', item).html().replace(/<br>/ig, ' ');
                                var sFace = jquery_1.default('img.friends_photo_img', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 3:
                        jquery_1.default('.ugrid_i', div).each(function () {
                            var item = this;
                            var nID = jquery_1.default('.__l', item).data('id');
                            var sName = jquery_1.default('.caption .ellip a', item).html().replace(/<br>/ig, ' ');
                            var sFace = 'https:' + jquery_1.default('img.photo_img', item).attr('src');
                            arTemp.push({
                                fbID: nID,
                                title: sName,
                                face: lodash_1.default.unescape(sFace),
                            });
                        });
                        break;
                }
            }
            Fbf.arFriends = arTemp.map(function (friend) {
                friend.smID = Fbf.nSMID;
                friend.relationType = Fbf.nRelationType;
                return friend;
            });
        }
        Fbf.drawUsers();
        jquery_1.default('input[name=withfaces]', jquery_1.default('#fmGetFriends')).prop('checked', Fbf.arFriends.length <= Fbf.WITH_FACES_MAX_COUNT);
    };
    Fbf.drawUsers = function () {
        if (Fbf.nSMID === 0 || Fbf.nRelationType === 0) {
            jquery_1.default('#relationType').focus().closest('.form-group').addClass('has-error');
            ;
            alert('Не можливо визначити тип відношень для даної соціальної мережі. Оберіть, будь ласка, тип відношень');
            return;
        }
        jquery_1.default('span', jquery_1.default('#btnFriends')).text('(' + Fbf.arFriends.length + ')');
        ReactDOM.render((React.createElement(FriendList_1.FriendList, { friends: Fbf.arFriends, SMID: Fbf.nSMID, relationType: Fbf.nRelationType })), document.getElementById("divFriends"));
    };
    Fbf.prototype.loadFriends = function () {
        if (Fbf.arFriends.length === 0) {
            alert('Список друзів пустий. Можливо, Ви забули натиснути на кнопку показу друзів.');
            return false;
        }
        if (jquery_1.default.trim(jquery_1.default('#filename').val()) === '') {
            alert('Введіть, будь ласка, назву вихідного файлу');
            jquery_1.default('#filename').focus();
            return false;
        }
        var s = encodeURIComponent(JSON.stringify(Fbf.arFriends));
        if (Fbf.WITH_FACES_MAX_COUNT < Fbf.arFriends.length) {
            jquery_1.default('input[name=withfaces]', jquery_1.default('#fmGetFriends')).prop('checked', false);
        }
        jquery_1.default('input[name=data]', jquery_1.default('#fmGetFriends')).val(s);
        setTimeout(function () {
            jquery_1.default('#ta,#filename').val('');
            jquery_1.default('#divFriends').empty();
            jquery_1.default('span', jquery_1.default('#btnFriends')).text('');
            Fbf.setDataTypeValues(0, 0);
            Fbf.arFriends = [];
        }, 1000);
        return true;
    };
    Fbf.prototype.onChangeRelationType = function () {
        if (Fbf.nSMID == 2) {
            jquery_1.default(this).closest('.form-group').removeClass('has-error');
            exports.fbf.changeRelationType(parseInt(jquery_1.default(this).val()));
        }
        else {
            jquery_1.default(this).val(Fbf.nRelationType.toString());
            alert('Не можливо змінити тип відношень для даної соціальної мережі!');
        }
    };
    Fbf.WITH_FACES_MAX_COUNT = 200;
    Fbf.arFriends = [];
    Fbf.nSMID = 0;
    Fbf.nRelationType = 0;
    return Fbf;
}());
exports.Fbf = Fbf;
;
exports.fbf = new Fbf();


/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fbf_1 = __webpack_require__(/*! ./fbf */ "./js/fbf.js");
$(document).ready(function () {
    $('#btnFriends').click(function () { return fbf_1.fbf.getFriends(); });
    $('#fmGetFriends').submit(fbf_1.fbf.loadFriends);
    $('#relationType').change(fbf_1.fbf.onChangeRelationType);
});


/***/ }),

/***/ "./js/сomponents/Friend.js":
/*!*********************************!*\
  !*** ./js/сomponents/Friend.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(__webpack_require__(/*! react */ "react"));
exports.Friend = function (props) {
    var friend = props.friend, SMID = props.SMID, icon = props.icon, link = props.link;
    return (React.createElement("div", { className: "col-md-4" },
        React.createElement("a", { target: "_blank", href: link },
            React.createElement("div", { className: "media", "data-id": "{friend.fbID}" },
                React.createElement("div", { className: "media-left" },
                    React.createElement("img", { className: "media-object img-thumbnail imf-rounded", src: SMID === 1 ? friend.face : 'img/man.jpg' })),
                React.createElement("div", { className: "media-body media-middle" },
                    React.createElement("h4", null, friend.title),
                    React.createElement("small", null,
                        "(ID: ",
                        friend.fbID,
                        ")"),
                    React.createElement("i", { className: icon }))))));
};


/***/ }),

/***/ "./js/сomponents/FriendList.js":
/*!*************************************!*\
  !*** ./js/сomponents/FriendList.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(__webpack_require__(/*! react */ "react"));
var Friend_1 = __webpack_require__(/*! ./Friend */ "./js/сomponents/Friend.js");
exports.FriendList = function (props) {
    var arSM = {
        1: {
            site: 'https://www.facebook.com/',
            idPrefix: '',
        },
        2: {
            site: 'https://vk.com/',
            idPrefix: 'id',
        },
        3: {
            site: 'https://ok.ru/',
            idPrefix: 'profile/',
        },
    };
    var friends = props.friends, SMID = props.SMID, relationType = props.relationType;
    var icon = 'fa fa-lg fa-fw fa-' + (relationType === 1 ? 'handshake-o' : 'rss');
    return (React.createElement("div", null, friends.map(function (friend) {
        return (React.createElement(Friend_1.Friend, { key: friend.fbID, friend: friend, SMID: SMID, icon: icon, link: arSM[SMID].site + arSM[SMID].idPrefix + friend.fbID }));
    })));
};


/***/ }),

/***/ "jquery":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map