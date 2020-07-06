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
exports.Friend = void 0;
const React = __importStar(require("react"));
exports.Friend = (props) => {
    const { friend, SMID, icon, link } = props;
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
