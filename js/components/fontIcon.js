"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FontIcon = ({ name, className, style, variant }) => {
    let sVariant = '';
    if (variant)
        sVariant = variant === 'lg' ? 'icon-lg' : 'icon-xl';
    return (react_1.default.createElement("svg", { className: `icon ${className || ''} ${sVariant}`, style: style },
        react_1.default.createElement("use", { xlinkHref: `#${name}` })));
};
exports.default = FontIcon;
