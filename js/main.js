"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fbf_1 = require("./fbf");
$(document).ready(function () {
    $('#btnFriends').click(function () { return fbf_1.fbf.getFriends(); });
    $('#fmGetFriends').submit(fbf_1.fbf.loadFriends);
    $('#relationType').change(fbf_1.fbf.onChangeRelationType);
});
