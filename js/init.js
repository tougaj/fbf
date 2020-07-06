"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBooleanField = exports.useFormField = exports.SOCIAL_MEDIA = exports.ESocialMedia = void 0;
const react_1 = require("react");
var ESocialMedia;
(function (ESocialMedia) {
    ESocialMedia["fb"] = "1";
    ESocialMedia["vk"] = "2";
    ESocialMedia["ok"] = "3";
})(ESocialMedia = exports.ESocialMedia || (exports.ESocialMedia = {}));
exports.SOCIAL_MEDIA = [
    {
        id: ESocialMedia.fb,
        site: 'https://www.facebook.com/',
        idPrefix: '',
        title: 'Facebook',
    },
    {
        id: ESocialMedia.vk,
        site: 'https://vk.com/',
        idPrefix: 'id',
        title: 'Вконтакте',
    },
    {
        id: ESocialMedia.ok,
        site: 'https://ok.ru/',
        idPrefix: 'profile/',
        title: 'Одноклассники',
    },
];
exports.useFormField = (initialValue) => {
    const [value, setValue] = react_1.useState(initialValue);
    react_1.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    const onChange = react_1.useCallback((event) => {
        setValue(event.target.value);
    }, []);
    return { value, onChange };
};
exports.useBooleanField = (initialChecked) => {
    const [checked, setChecked] = react_1.useState(initialChecked);
    react_1.useEffect(() => {
        setChecked(initialChecked);
    }, [initialChecked]);
    const onChange = react_1.useCallback((event) => {
        setChecked(event.target.checked);
    }, []);
    return { checked, onChange };
};
