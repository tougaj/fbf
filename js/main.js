"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const moment = require("moment");
const app_1 = __importDefault(require("./components/app"));
moment.locale('uk');
react_dom_1.default.render(react_1.default.createElement(app_1.default, null), document.getElementById('app'));
