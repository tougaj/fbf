"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Friend_1 = require("./Friend");
exports.FriendList = function (_a) {
    var friends = _a.friends, SMID = _a.SMID, relationType = _a.relationType;
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
    var icon = 'fa fa-lg fa-fw fa-' + (relationType === 1 ? 'handshake-o' : 'rss');
    return (React.createElement("div", null, friends.map(function (friend) {
        return (React.createElement(Friend_1.Friend, { key: friend.fbID, friend: friend, SMID: SMID, icon: icon, link: arSM[SMID].site + arSM[SMID].idPrefix + friend.fbID }));
    })));
};
