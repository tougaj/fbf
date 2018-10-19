"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
var lodash_1 = __importDefault(require("lodash"));
var Fbf = (function () {
    function Fbf() {
    }
    Fbf.setDataTypeValues = function (ASMID, ARelationType) {
        Fbf.nSMID = ASMID;
        Fbf.nRelationType = ARelationType;
        jquery_1.default('#smID,#fake_smID').val(Fbf.nSMID.toString());
        jquery_1.default('#relationType,#fake_relationType').val(Fbf.nRelationType.toString());
        return 0;
    };
    Fbf.prototype.changeRelationType = function (nNewRelationType) {
        Fbf.setDataTypeValues(Fbf.nSMID, nNewRelationType);
        this.getFriends(false);
    };
    Fbf.defineDataType = function (sHTML) {
        if (/id="friends_user_row\d+"/i.test(sHTML))
            return Fbf.setDataTypeValues(2, 0);
        if (/i\.mycdn\.me/i.test(sHTML)) {
            if (/friendSubscribers/i.test(sHTML))
                return Fbf.setDataTypeValues(3, 2);
            else
                return Fbf.setDataTypeValues(3, 1);
        }
        if (/friend_list_item/i.test(sHTML))
            return Fbf.setDataTypeValues(1, 1);
        if (/fbProfileBrowserListItem/i.test(sHTML))
            return Fbf.setDataTypeValues(1, 2);
        return Fbf.setDataTypeValues(0, 0);
    };
    Fbf.prototype.getFriends = function (fNeedDefineType) {
        if (fNeedDefineType === void 0) { fNeedDefineType = true; }
        var sElementHTML = jquery_1.default('#ta').val();
        if (fNeedDefineType)
            Fbf.defineDataType(sElementHTML);
        exports.fbf.fillFriendTable(sElementHTML);
    };
    Fbf.prototype.fillFriendTable = function (sElementHTML) {
        var arTemp = [];
        var div = jquery_1.default(sElementHTML);
        Fbf.arFriends = [];
        if (Fbf.nRelationType !== 0) {
            if (Fbf.nRelationType === 1) {
                switch (Fbf.nSMID) {
                    case 1:
                        jquery_1.default('li>[data-testid="friend_list_item"]', div).each(function () {
                            var item = this;
                            var a = jquery_1.default('a[data-hovercard]', item).eq(0);
                            var sID = a.data('hovercard');
                            var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('img[role="img"]', item).attr('aria-label');
                                var sFace = jquery_1.default('img[role="img"]', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 2:
                        jquery_1.default('.friends_user_row', div).each(function () {
                            var item = this;
                            var sID = jquery_1.default(item).attr('id');
                            var m = sID.match(/friends_user_row(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('.friends_field_title a', item).html().replace(/<br>/ig, ' ');
                                var sFace = jquery_1.default('img.friends_photo_img', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 3:
                        jquery_1.default('.ugrid_i', div).each(function () {
                            var item = this;
                            var nID = jquery_1.default('.entity-item', item).data('entity-id');
                            var sName = jquery_1.default('.ucard-w_t a', item).html().replace(/<br>/ig, ' ');
                            var sFace = 'https:' + jquery_1.default('img.photo_img', item).attr('src');
                            arTemp.push({
                                fbID: nID,
                                title: sName,
                                face: lodash_1.default.unescape(sFace),
                            });
                        });
                        break;
                }
            }
            else {
                switch (Fbf.nSMID) {
                    case 1:
                        jquery_1.default('li.fbProfileBrowserListItem', div).each(function () {
                            var item = this;
                            var a = jquery_1.default('a[data-hovercard]', item).eq(0);
                            var sID = a.data('hovercard');
                            var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('img[role="img"]', item).attr('aria-label');
                                var sFace = jquery_1.default('img[role="img"]', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 2:
                        jquery_1.default('.friends_user_row', div).each(function () {
                            var item = this;
                            var sID = jquery_1.default(item).attr('id');
                            var m = sID.match(/friends_user_row(\d+)/);
                            if (m && m[1]) {
                                var nID = m[1];
                                var sName = jquery_1.default('.friends_field_title a', item).html().replace(/<br>/ig, ' ');
                                var sFace = jquery_1.default('img.friends_photo_img', item).attr('src');
                                arTemp.push({
                                    fbID: nID,
                                    title: sName,
                                    face: lodash_1.default.unescape(sFace),
                                });
                            }
                        });
                        break;
                    case 3:
                        jquery_1.default('.ugrid_i', div).each(function () {
                            var item = this;
                            var nID = jquery_1.default('.__l', item).data('id');
                            var sName = jquery_1.default('.caption .ellip a', item).html().replace(/<br>/ig, ' ');
                            var sFace = 'https:' + jquery_1.default('img.photo_img', item).attr('src');
                            arTemp.push({
                                fbID: nID,
                                title: sName,
                                face: lodash_1.default.unescape(sFace),
                            });
                        });
                        break;
                }
            }
            Fbf.arFriends = arTemp.map(function (friend) {
                friend.smID = Fbf.nSMID;
                friend.relationType = Fbf.nRelationType;
                return friend;
            });
        }
        Fbf.drawUsers();
        jquery_1.default('input[name=withfaces]', jquery_1.default('#fmGetFriends')).prop('checked', Fbf.arFriends.length <= Fbf.WITH_FACES_MAX_COUNT);
    };
    Fbf.drawUsers = function () {
        var div = jquery_1.default('#divFriends').empty();
        if (Fbf.nSMID === 0 || Fbf.nRelationType === 0) {
            jquery_1.default('#relationType').focus().closest('.form-group').addClass('has-error');
            ;
            alert('Не можливо визначити тип відношень для даної соціальної мережі. Оберіть, будь ласка, тип відношень');
            return;
        }
        jquery_1.default('span', jquery_1.default('#btnFriends')).text('(' + Fbf.arFriends.length + ')');
        var userTemplate = lodash_1.default.template(jquery_1.default('#tmplUserAccount').html());
        var nIndex = Fbf.nSMID;
        Fbf.arFriends.forEach(function (v) {
            var sUser = userTemplate({
                id: v.fbID,
                title: v.title,
                link: Fbf.arSM[nIndex].site + Fbf.arSM[nIndex].idPrefix + v.fbID,
                img: Fbf.nSMID === 1 ? v.face : 'img/man.jpg',
                icon: Fbf.nRelationType === 1 ? 'handshake-o' : 'rss'
            });
            jquery_1.default(sUser).appendTo(div);
        });
    };
    Fbf.prototype.loadFriends = function () {
        if (Fbf.arFriends.length === 0) {
            alert('Список друзів пустий. Можливо, Ви забули натиснути на кнопку показу друзів.');
            return false;
        }
        if (jquery_1.default.trim(jquery_1.default('#filename').val()) === '') {
            alert('Введіть, будь ласка, назву вихідного файлу');
            jquery_1.default('#filename').focus();
            return false;
        }
        var s = encodeURIComponent(JSON.stringify(Fbf.arFriends));
        if (Fbf.WITH_FACES_MAX_COUNT < Fbf.arFriends.length) {
            jquery_1.default('input[name=withfaces]', jquery_1.default('#fmGetFriends')).prop('checked', false);
        }
        jquery_1.default('input[name=data]', jquery_1.default('#fmGetFriends')).val(s);
        setTimeout(function () {
            jquery_1.default('#ta,#filename').val('');
            jquery_1.default('#divFriends').empty();
            jquery_1.default('span', jquery_1.default('#btnFriends')).text('');
            Fbf.setDataTypeValues(0, 0);
            Fbf.arFriends = [];
        }, 1000);
        return true;
    };
    Fbf.prototype.onChangeRelationType = function () {
        if (Fbf.nSMID == 2) {
            jquery_1.default(this).closest('.form-group').removeClass('has-error');
            exports.fbf.changeRelationType(parseInt(jquery_1.default(this).val()));
        }
        else {
            jquery_1.default(this).val(Fbf.nRelationType.toString());
            alert('Не можливо змінити тип відношень для даної соціальної мережі!');
        }
    };
    Fbf.WITH_FACES_MAX_COUNT = 200;
    Fbf.arFriends = [];
    Fbf.arSM = {
        1: {
            site: 'https://www.facebook.com/',
            idPrefix: '',
        },
        2: {
            site: 'https://vk.com/',
            idPrefix: 'id',
        },
        3: {
            site: 'https://ok.ru/',
            idPrefix: 'profile/',
        },
    };
    Fbf.nSMID = 0;
    Fbf.nRelationType = 0;
    return Fbf;
}());
exports.Fbf = Fbf;
;
exports.fbf = new Fbf();
