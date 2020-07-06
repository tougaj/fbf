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
const react_1 = __importStar(require("react"));
const actionForm_1 = __importDefault(require("./actionForm"));
const fbf_1 = require("../fbf");
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
