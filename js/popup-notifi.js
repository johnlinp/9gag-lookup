function genNotifiMsg(notifi) {
    var big = $('<div/>').addClass('lookup-notifi-line lookup-notifi-big-line');
    var small = $('<div/>').addClass('lookup-notifi-line lookup-notifi-small-line');
    if(notifi.type == 'you-agree-keyword') {
        big.html('你賺到了 $' + notifi.coin_delta + ' 枚硬幣!!!');
        small.html('因為您和別人撞到了<br/>同一個關鍵字 "' + notifi.word + '"');
    } else if(notifi.type == 'someone-agree-keyword') {
        big.html('你賺到了 $' + notifi.coin_delta + ' 枚硬幣!!!');
        small.html('因為別人和您撞到了<br/>同一個關鍵字 "' + notifi.word + '"');
    }

    var msg = $('<div/>').append(big)
                         .append(small);
    return msg;
}

function genNotifiTail(notifi) {
    var tail = $('<div/>').addClass('lookup-notifi-tail');
    var goGag = $('<a/>').addClass('lookup-notifi-go-gag')
                         .addClass('btnn')
                         .attr('href', 'javascript: void(0);');
    if(notifi.gag_id != null) {
        var gagId = notifi.gag_id;
        goGag.attr('href', 'http://9gag.com/gag/' + gagId)
             .attr('target', '_blank');
        tail.append(goGag);
    }

    return tail;
}

function genNotifiBlock(notifi) {
    var block = $('<div/>').addClass('lookup-notifi-block');

    var background = notifi.received ? 'lookup-notifi-received' : 'lookup-notifi-fresh';
    var icon = (notifi.coin_delta > 0) ? 'lookup-notifi-coin-icon' : 'lookup-notifi-brick-icon';
    var msg = genNotifiMsg(notifi);
    var tail = genNotifiTail(notifi);

    block.attr('data-notifi-id', notifi.id)
         .addClass(background)
         .addClass(icon)
         .append(msg)
         .append(tail);

    block.click(function(evt) {
        var target = $(evt.target);
        if(target.is('a') || block.hasClass('lookup-notifi-received'))
            return;
        console.log('enable');
        block.removeClass('lookup-notifi-fresh')
             .addClass('lookup-notifi-received');
        reliableGet(makeExtraUrl('notifi', 'enable', {notifi_id: notifi.id}), function(res) { });
    });

    return block;
}

function putAllNotifis(notifis) {
    var allNotifis = $('#lookup-all-notifis');
    allNotifis.hide();
    $.each(notifis, function(i, notifi) {
        var block = genNotifiBlock(notifi);
        allNotifis.append(block);
    });
    allNotifis.fadeIn();
}

function putNoNotifi() {
    var noNotifi = $('#lookup-no-notifi');

    var explainBtn = $('<a/>').html('這個')
                              .attr('href', 'javascript: void(0);');

    explainBtn.click(function() {
        noNotifi.fadeOut(function() {
            var explain = $('#lookup-notifi-explain');
            explain.fadeIn();
        });
    });

    var line1 = $('<p/>').append('目前還沒有任何通知喔 : (');
    var line2 = $('<p/>').append('請看')
                         .append(explainBtn)
                         .append('，可以了解更多喔。');

    noNotifi.append(line1)
            .append(line2);
}

function prepareNotifiExplain() {
    var explain = $('#lookup-notifi-explain');
    explain.empty()
           .hide();

    var line1 = $('<p/>').append('雖然，這是一本讓您幾乎不用打字');
    var line2 = $('<p/>').append('就可以查的字典');
    var line3 = $('<p/>').append('但是，目前也還沒那麼完美，');
    var line4 = $('<p/>').append('有時候也可以手動輸入英文單字，');
    var line5 = $('<p/>').append('等到您輸入的單字，和別人重覆到，');
    var line6 = $('<p/>').append('或是您提供的解釋被別人誇獎，');
    var line7 = $('<p/>').append('就會給您幾塊金幣!!!');
    var line8 = $('<p/>').append('這本字典將會越來越好，');
    var line9 = $('<p/>').append('大家加油!!!!');

    explain.append(line1)
           .append(line2)
           .append(line3)
           .append(line4)
           .append(line5)
           .append(line6)
           .append(line7)
           .append(line8)
           .append(line9);
}

function putNotifis() {
    reliableGet(makeExtraUrl('notifi', 'get', {}), function(res) {
        if(res.status != 'OKAY')
            return;

        var notifis = res.respond.notifis;

        if(notifis.length == 0)
            putNoNotifi();
        else
            putAllNotifis(notifis);
    });
}
