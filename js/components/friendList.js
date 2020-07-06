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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendList = void 0;
const React = __importStar(require("react"));
const Friend_1 = require("./Friend");
const init_1 = require("../init");
exports.FriendList = ({ friends, SMID, relationType = 1, }) => {
    const icon = 'fa fa-lg fa-fw fa-' + (relationType === 1 ? 'handshake-o' : 'rss');
    const { site, idPrefix } = init_1.SOCIAL_MEDIA[SMID];
    return (React.createElement("div", null, friends.map((friend) => (React.createElement(Friend_1.Friend, { key: friend.fbID, friend: friend, SMID: SMID, icon: icon, link: `${site}${idPrefix}${friend.fbID}` })))));
};
