import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-ranking").on("rankingEvent", function () {
    //读取第一页游戏信息
    $(".data-loading").stop(true, true).fadeIn(100);
    $.ajax({
        type: 'POST',
        url: 'getGameAction',
        data: { index: 1, pageSize: 3 },
        dataType: 'json',
        cache: false,
        success: (data) => {
            $(".data-loading").delay(300).fadeOut(100);
            if (data.resultCode !== "1") {
                $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                return;
            }
            //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            for (let i = 0; i < data.apprules.length; i++) {
                $(".btn-group").append(`<button type='button' class='btn btn-info select-game-btn' appid='${data.apprules[i].appId}'>${data.apprules[i].appId} ${data.apprules[i].appName}</button>`);

            }
            for (let i = 0; i < data.pageNum; i++) {
                $("#game-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
            }
            $(`.game-list-nav li[index="1"]`).addClass("active-navipage");
            $(`.game-list-nav`).attr("pageSum", data.pageNum);
        },
        error: (xhr, status, err) => {
            console.error(xhr.status, xhr.responseText, status, err.toString());
            $(".data-loading").stop(true, true).fadeOut(100);
            $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
        }
    });

    //读取某一页游戏信息
    $(".game-list-nav .pagination").click(function (data) {

        let pageNow = parseInt($(`.game-list-nav .active-navipage`).attr("index"));

        if (!isNaN($(data.target).html())) {
            pageNow = parseInt($(data.target).closest('li').attr("index"));
        } else if ($(data.target).html() === "«" && pageNow > 1) {
            pageNow--;
        } else if ($(data.target).html() === "»" && pageNow < parseInt($(`.game-list-nav`).attr("pageSum"))) {
            pageNow++;
        }

        $.ajax({
            type: 'POST',
            url: 'getGameAction',
            data: { index: pageNow, pageSize: 3 },
            dataType: 'json',
            cache: false,
            success: (data) => {
                $(".data-loading").delay(300).fadeOut(100);
                if (pageNow > data.pageNum) {
                    $(`.game-list-nav .active-navipage`).removeClass("active-navipage");
                    $(`.game-list-nav li[index=${pageNow - 1}]`).addClass("active-navipage");
                    $(".active-navipage a").trigger("click");
                    return;
                }
                //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                $(".btn-group").html(`<button type='button' class='btn btn-info select-game-btn' appid='${data.apprules[0].appId}'>${data.apprules[0].appId} ${data.apprules[0].appName}</button>`);
                for (let i = 1; i < data.apprules.length; i++) {
                    $(".btn-group").append(`<button type='button' class='btn btn-info select-game-btn' appid='${data.apprules[i].appId}'>${data.apprules[i].appId} ${data.apprules[i].appName}</button>`);
                }
                $(".game-list-nav .pagination").html(`<li><a>&laquo;</a></li><li id="game-nav-next"><a>&raquo;</a></li>`);
                for (let i = 0; i < data.pageNum; i++) {
                    $("#game-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                }
                $(`.game-list-nav li[index=${pageNow}]`).addClass("active-navipage");
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").stop(true, true).fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            }
        });
    });

    //查看某个游戏的排名
    $(".btn-group").click(function (data) {
        $(".data-loading").stop(true, true).fadeIn(100);
        if ($(data.target).hasClass("select-game-btn")) {
            let targetId = $(data.target).attr("appid");
            $.ajax({
                type: 'POST',
                url: 'getGameRankingAction',
                data: { appid: targetId },
                dataType: 'json',
                cache: false,
                success: (data) => {
                    $(".data-loading").delay(300).fadeOut(100);

                    if (data.resultCode !== "1") {
                        $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                        return;
                    }
                   
                    if (data.appRanks.length > 0) {
                        $("#game-ranking-tbody").html(
                            `<tr>
                                <td>1</td>
                                <td>${data.appRanks[0].userId}</td>
                                <td>${data.appRanks[0].point}</td>
                                <td>${data.appRanks[0].addTime}</td>
                            </tr>`
                        );
                        for (let i=1;i<data.appRanks.length;i++){
                            $("#game-ranking-tbody").append(
                                `<tr>
                                <td>${i+1}</td>
                                <td>${data.appRanks[i].userId}</td>
                                <td>${data.appRanks[i].point}</td>
                                <td>${data.appRanks[i].addTime}</td>
                            </tr>`
                            );
                        }
                    }
                    else{
                        $("#game-ranking-tbody").empty();
                        $(".alert-danger").html("暂无排名").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    }
                },
                error: (xhr, status, err) => {
                    console.error(xhr.status, xhr.responseText, status, err.toString());
                    $(".data-loading").stop(true, true).fadeOut(100);
                    $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                }
            });
            $(".game-ranking").hide();
            $(".game-ranking").slideDown();
        }
    })

})