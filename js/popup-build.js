function buildDict(dst) {
    var dict = $('<div/>').attr('id', 'lookup-dict');
    dst.append(dict);

    var preRecomms = $('<span/>').attr('id', 'lookup-pre-recomms')
                                 .addClass('lookup-heading-left lookup-has-recomms');
    var recommsContain = $('<p/>').attr('id', 'lookup-recomms-contain');

    var preQuery = $('<span/>').attr('id', 'lookup-pre-query')
                               .addClass('lookup-heading-left lookup-more-input');
    var queryContain = $('<div/>').attr('id', 'lookup-query-contain');

    var explPrevContain = $('<div/>').attr('id', 'lookup-expl-prev-contain')
                                     .addClass('lookup-expl-nav-button')
    var explNextContain = $('<div/>').attr('id', 'lookup-expl-next-contain')
                                     .addClass('lookup-expl-nav-button')
    var explContent = $('<span/>').attr('id', 'lookup-expl-content');
    var explContentRow = $('<div/>').attr('id', 'lookup-expl-content-row')
                                    .append(explPrevContain)
                                    .append(explContent)
                                    .append(explNextContain);

    var explLikeContain = $('<span/>').attr('id', 'lookup-expl-like-contain');
    var explHateContain = $('<span/>').attr('id', 'lookup-expl-hate-contain');
    var explMoodRow = $('<div/>').attr('id', 'lookup-expl-mood-row')
                                 .addClass('lookup-expl-button-row')
                                 .append(explLikeContain)
                                 .append(' ')
                                 .append(explHateContain);

    var explProvideContain = $('<div/>').attr('id', 'lookup-expl-provide-contain');
    var explProvideRow = $('<div/>').addClass('lookup-expl-button-row')
                                    .append(explProvideContain);

    var explNewInputRow = $('<div/>').attr('id', 'lookup-expl-new-input-contain');

    var explNewSubmitContain = $('<div/>').attr('id', 'lookup-expl-new-submit-contain');
    var explNewSubmitRow = $('<div/>').addClass('lookup-expl-button-row')
                                      .append(explNewSubmitContain);

    dict.append(preRecomms)
        .append(recommsContain)
        .append(preQuery)
        .append(queryContain)
        .append(explContentRow)
        .append(explMoodRow)
        .append(explProvideRow)
        .append(explNewInputRow)
        .append(explNewSubmitRow);

    putAllRecomms();
    putQueryInput();
}

function buildNotify(dst) {
    var notify = $('<div/>');
    dst.append(notify);

    notify.append($('<span/>').addClass('lookup-heading-left').html('通知通知'));
    return notify;
}

function buildPersonal(dst) {
    var personal = $('<div/>');
    dst.append(personal);

    var avatarFname = 'images/mario-big-man.png';
    var avatar = $('<div/>').attr('id', 'lookup-avatar')
                            .css('background-image', 'url(' + chrome.extension.getURL(avatarFname) + ')');
    personal.append(avatar);
    personal.append($('<span/>').addClass('lookup-heading-center').html('林蔭寶'));
    return personal;
}

function buildNavBtn(dst, name, chosen, builder) {
    var nav = $('<a/>').attr('href', 'javascript: void(0);')
                       .addClass('lookup-nav-btn')
                       .html(name)
                       .click(function() {
                           $('.lookup-nav-chosen').removeClass('lookup-nav-chosen');
                           $(this).addClass('lookup-nav-chosen');
                           var content = $('#lookup-content');
                           content.fadeOut(200);
                           setTimeout(function() {
                               content.empty();
                               builder(content);
                               content.fadeIn(200);
                            }, 200);
                       });
    if(chosen)
        nav.addClass('lookup-nav-chosen');
    dst.append(nav);
}

function buildCloseBtn(dst) {
    var close = $('<a/>').attr('href', 'javascript: void(0);')
                       .addClass('lookup-close-btn fui-cross');
    dst.append(close);
    setShrinkSmall(close);
}

function buildNavBar(dst) {
    var navs = $('<div>').attr('id', 'lookup-nav-bar');
    dst.append(navs);

    buildNavBtn(navs, '字典', true, buildDict);
    navs.append(' ');
    buildNavBtn(navs, '通知', false, buildNotify);
    navs.append(' ');
    buildNavBtn(navs, '個人', false, buildPersonal);
    navs.append(' ');
    buildCloseBtn(navs);
}

function buildHeader(dst) {
    var header = $('<div/>').attr('id', 'lookup-header');
    dst.append(header);
    buildNavBar(header);
}

function buildContent(dst) {
    var content = $('<div/>').attr('id', 'lookup-content');
    dst.append(content);
    buildDict(content);
}

function buildLogo(dst) {
    var logo = $('<a/>').attr('id', 'lookup-logo')
                        .addClass('lookup-anchor lookup-heading-left fui-search');
    dst.append(logo);
}

function buildMain(dst, which) {
    var contain = $('<div/>').attr('id', 'lookup-contain-main');
    dst.append(contain);

    var main = $('<div/>');
    if(which == 'big') {
        main.addClass('lookup-big-main');
        buildHeader(main);
        buildContent(main);
    } else if(which == 'small') {
        main.addClass('lookup-small-main')
            .css('height', '83px');
        buildLogo(main);
        setGrowBig(main);
    }
    contain.append(main);
}

function buildTriangle(dst) {
    var contain = $('<div/>').attr('id', 'lookup-contain-triangle');
    dst.append(contain);

    var triangle = $('<div/>').attr('id', 'lookup-triangle');
    contain.append(triangle);
}

