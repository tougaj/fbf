"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const init_1 = require("../init");
const fontIcon_1 = __importDefault(require("./fontIcon"));
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
