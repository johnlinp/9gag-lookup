function setGrowBig(main) {
    main.click(function() {
        main.unbind('click');
        $('#lookup-logo').fadeOut(200);
        main.css('height', '');
        main.animate({
            width: '400px',
            top: topOffset() + 'px',
            bottom: '64px',
        }, 200, function() {
            main.empty();
            main.removeClass('lookup-small-main').addClass('lookup-big-main');
            main.append(buildHeader());
            main.append(buildContent());
            $('#lookup-header').css('display', 'none');
            $('#lookup-content').css('display', 'none');
            $('#lookup-header').fadeIn(200);
            $('#lookup-content').fadeIn(200);
        });
    });
}

function setShrinkSmall(close) {
    close.click(function() {
        close.unbind('click');
        $('#lookup-header').fadeOut(200);
        $('#lookup-content').fadeOut(200);
        var main = $('.lookup-big-main');
        main.animate({
            width: '130px',
            height: '110px',
            top: pointOffset(60.0, 117.0) + 'px',
        }, 200, function() {
            main.empty();
            main.removeClass('lookup-big-main').addClass('lookup-small-main');
            main.append(buildLogo());
            $('#lookup-logo').css('display', 'none');
            $('#lookup-logo').fadeIn(200);
            setGrowBig(main);
        });
    });
}
