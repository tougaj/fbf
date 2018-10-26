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
