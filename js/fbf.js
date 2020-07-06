"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHTML2Friends = void 0;
const init_1 = require("./init");
exports.convertHTML2Friends = (raw) => {
    const sm = defineSocialMedia(raw);
    return [sm, []];
};
const defineSocialMedia = (raw) => {
    if (/facebook\.com/i.test(raw))
        return init_1.ESocialMedia.fb;
    return undefined;
};
