"use strict";
var Fbf = (function () {
    function Fbf() {
    }
    Fbf.setDataTypeValues = function (ASMID, ARelationType) {
        Fbf.nSMID = ASMID;
        Fbf.nRelationType = ARelationType;
        $('#smID,#fake_smID').val(Fbf.nSMID.toString());
        $('#relationType,#fake_relationType').val(Fbf.nRelationType.toString());
        return 0;
    };
    Fbf.defineDataType = function (sHTML) {
        if (/\.userapi\.com/i.test(sHTML))
            return Fbf.setDataTypeValues(2, 1);
        if (/i\.mycdn\.me/i.test(sHTML))
            return Fbf.setDataTypeValues(3, 1);
        if (/friend_list_item/i.test(sHTML))
            return Fbf.setDataTypeValues(1, 1);
        if (/fbProfileBrowserListItem/i.test(sHTML))
            return Fbf.setDataTypeValues(1, 2);
        return Fbf.setDataTypeValues(0, 0);
    };
    Fbf.prototype.getFriends = function () {
        var sElementHTML = $('#ta').val();
        Fbf.defineDataType(sElementHTML);
        var arTemp = [];
        var f = $(sElementHTML);
        if (Fbf.nRelationType === 1) {
            switch (Fbf.nSMID) {
                case 1:
                    $('li>[data-testid="friend_list_item"]', f).each(function () {
                        var item = this;
                        var a = $('a[data-hovercard]', item).eq(0);
                        var sID = a.data('hovercard');
                        var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
                        if (m && m[1]) {
                            var nID = m[1];
                            var sName = $('img[role="img"]', item).attr('aria-label');
                            var sFace = $('img[role="img"]', item).attr('src');
                            arTemp.push({
                                fbID: nID,
                                title: sName,
                                face: _.unescape(sFace),
                            });
                        }
                    });
                    break;
                case 2:
                    $('.friends_user_row', f).each(function () {
                        var item = this;
                        var sID = $(item).attr('id');
                        var m = sID.match(/friends_user_row(\d+)/);
                        if (m && m[1]) {
                            var nID = m[1];
                            var sName = $('.friends_field_title a', item).html().replace(/<br>/ig, ' ');
                            var sFace = $('img.friends_photo_img', item).attr('src');
                            arTemp.push({
                                fbID: nID,
                                title: sName,
                                face: _.unescape(sFace),
                            });
                        }
                    });
                    break;
                case 3:
                    $('.ugrid_i', f).each(function () {
                        var item = this;
                        var nID = $('.entity-item', item).data('entity-id');
                        var sName = $('.ucard-w_t a', item).html().replace(/<br>/ig, ' ');
                        var sFace = 'https:' + $('img.photo_img', item).attr('src');
                        arTemp.push({
                            fbID: nID,
                            title: sName,
                            face: _.unescape(sFace),
                        });
                    });
                    break;
            }
        }
        else {
            switch (Fbf.nSMID) {
                case 1:
                    $('li.fbProfileBrowserListItem', f).each(function () {
                        var item = this;
                        var a = $('a[data-hovercard]', item).eq(0);
                        var sID = a.data('hovercard');
                        var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
                        if (m && m[1]) {
                            var nID = m[1];
                            var sName = $('img[role="img"]', item).attr('aria-label');
                            var sFace = $('img[role="img"]', item).attr('src');
                            arTemp.push({
                                fbID: nID,
                                title: sName,
                                face: _.unescape(sFace),
                            });
                        }
                    });
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }
        Fbf.arFriends = arTemp.map(function (friend) {
            friend.smID = Fbf.nSMID;
            friend.relationType = Fbf.nRelationType;
            return friend;
        });
        Fbf.drawUsers();
        $('input[name=withfaces]', '#fmGetFriends').prop('checked', Fbf.arFriends.length <= Fbf.WITH_FACES_MAX_COUNT);
    };
    Fbf.drawUsers = function () {
        var div = $('#divFriends').empty();
        $('span', '#btnFriends').text('(' + Fbf.arFriends.length + ')');
        var userTemplate = _.template($('#tmplUserAccount').html());
        var nIndex = Fbf.nSMID;
        Fbf.arFriends.forEach(function (v) {
            var sUser = userTemplate({
                id: v.fbID,
                title: v.title,
                link: Fbf.arSM[nIndex].site + Fbf.arSM[nIndex].idPrefix + v.fbID,
                img: Fbf.nSMID === 1 ? v.face : 'man.jpg',
                icon: Fbf.nRelationType === 1 ? 'handshake-o' : 'rss'
            });
            $(sUser).appendTo(div);
        });
    };
    Fbf.prototype.loadFriends = function () {
        if (Fbf.arFriends.length === 0) {
            alert('Список друзів пустий. Можливо, Ви забули натиснути на кнопку показу друзів.');
            return false;
        }
        if ($.trim($('#filename').val()) === '') {
            alert('Введіть, будь ласка, назву вихідного файлу');
            $('#filename').focus();
            return false;
        }
        var s = encodeURIComponent(JSON.stringify(Fbf.arFriends));
        if (Fbf.WITH_FACES_MAX_COUNT < Fbf.arFriends.length) {
            $('input[name=withfaces]', '#fmGetFriends').prop('checked', false);
        }
        $('input[name=data]', '#fmGetFriends').val(s);
        setTimeout(function () {
            $('#ta,#filename').val('');
            $('#divFriends').empty();
            $('span', '#btnFriends').text('');
            Fbf.setDataTypeValues(0, 0);
            Fbf.arFriends = [];
        }, 1000);
        return true;
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
;
var fbf = new Fbf();
$(document).ready(function () {
    $('#btnFriends').click(fbf.getFriends);
    $('#fmGetFriends').submit(fbf.loadFriends);
});
