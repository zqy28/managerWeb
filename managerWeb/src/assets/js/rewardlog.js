import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-rewardlog").on("rewardlogEvent", function () {
    //读取第一页游戏信息
    $(".data-loading").stop(true, true).fadeIn();
    $.ajax({
        type: 'POST',
        url: 'getRewardLogAction',
        data: { index: 1, pageSize: 3, type: 2 },
        dataType: 'json',
        cache: false,
        success: (data) => {
            $(".data-loading").stop(true, true).fadeOut(100);
            if (data.resultCode !== "1") {
                $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
                return;
            }
            //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
            for (let i = 0; i < data.appRunLogs.length; i++) {
                $("#game-rewardlog-tbody").append(
                    `<tr>
                        <td>${data.appRunLogs[i].runLogId}</td>
                        <td>${data.appRunLogs[i].userId}</td>
                        <td>${data.appRunLogs[i].devGroupId}</td>
                        <td>${data.appRunLogs[i].gameName}</td>
                        <td>${data.appRunLogs[i].price}</td>
                        <td>${data.appRunLogs[i].reward}</td>
                        <td>${data.appRunLogs[i].addTime}</td>
                    </tr>`
                );

            }
            for (let i = 0; i < data.pageNum; i++) {
                $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
            }
            $(`.normal-list-nav li[index="1"]`).addClass("active-navipage");
            $(`.normal-list-nav`).attr("pageSum", data.pageNum);
        },
        error: (xhr, status, err) => {
            console.error(xhr.status, xhr.responseText, status, err.toString());
            $(".data-loading").stop(true, true).fadeOut(100);
            $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
        }
    });

    //读取某一页游戏信息
    $(".normal-list-nav .pagination").click(function (data) {

        let pageNow = parseInt($(`.normal-list-nav .active-navipage`).attr("index"));

        if (!isNaN($(data.target).html())) {
            pageNow = parseInt($(data.target).closest('li').attr("index"));
        } else if ($(data.target).html() === "«" && pageNow > 1) {
            pageNow--;
        } else if ($(data.target).html() === "»" && pageNow < parseInt($(`.normal-list-nav`).attr("pageSum"))) {
            pageNow++;
        }

        $.ajax({
            type: 'POST',
            url: 'getRewardLogAction',
            data: { index: pageNow, pageSize: 3, type: 2 },
            dataType: 'json',
            cache: false,
            success: (data) => {
                $(".data-loading").stop(true, true).fadeOut(100);
                if (pageNow > data.pageNum) {
                    $(`.normal-list-nav .active-navipage`).removeClass("active-navipage");
                    $(`.normal-list-nav li[index=${pageNow - 1}]`).addClass("active-navipage");
                    $(".active-navipage a").trigger("click");
                    return;
                }
                //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
                    return;
                }
                $("#game-rewardlog-tbody").html(
                    `<tr>
                        <td>${data.appRunLogs[0].runLogId}</td>
                        <td>${data.appRunLogs[0].userId}</td>
                        <td>${data.appRunLogs[0].devGroupId}</td>
                        <td>${data.appRunLogs[0].gameName}</td>
                        <td>${data.appRunLogs[0].price}</td>
                        <td>${data.appRunLogs[0].reward}</td>
                        <td>${data.appRunLogs[0].addTime}</td>
                    </tr>`
                    );
                for (let i = 1; i < data.appRunLogs.length; i++) {
                $("#game-rewardlog-tbody").append(
                    `<tr>
                        <td>${data.appRunLogs[i].runLogId}</td>
                        <td>${data.appRunLogs[i].userId}</td>
                        <td>${data.appRunLogs[i].devGroupId}</td>
                        <td>${data.appRunLogs[i].gameName}</td>
                        <td>${data.appRunLogs[i].price}</td>
                        <td>${data.appRunLogs[i].reward}</td>
                        <td>${data.appRunLogs[i].addTime}</td>
                    </tr>`
                );

            }
                $(".normal-list-nav .pagination").html(`<li><a>&laquo;</a></li><li id="log-nav-next"><a>&raquo;</a></li>`);
                for (let i = 0; i < data.pageNum; i++) {
                    $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                }
                $(`.normal-list-nav li[index=${pageNow}]`).addClass("active-navipage");
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").stop(true, true).fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
            }
        });
    });

})