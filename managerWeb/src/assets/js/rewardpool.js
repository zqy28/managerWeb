import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-rewardpool").on("rewardpoolEvent", function () {
    //读取第一页游戏信息
    $(".data-loading").stop(true, true).fadeIn();
    $.ajax({
        type: 'POST',
        url: 'findAllPoolAction',
        data: { index: 1, pageSize: 3 },
        dataType: 'json',
        cache: false,
        //async: false,
        success: (data) => {
            $(".data-loading").stop(true, true).fadeOut(100);
            if (data.resultCode !== "1") {
                $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
                return;
            }
            //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
            for (let i = 0; i < data.apprules.length; i++) {
                let poolin = 0;
                let poolout = 0;
                let poolinject = 0;
                for (let j = 0; j < data.apprules[i].bonusPool.length; j++) {
                    if (data.apprules[i].bonusPool[j].type === "1") {
                        poolin = data.apprules[i].bonusPool[j].money;
                    } else if (data.apprules[i].bonusPool[j].type === "2") {
                        poolinject = data.apprules[i].bonusPool[j].money;
                    } else if (data.apprules[i].bonusPool[j].type === "3") {
                        poolout = data.apprules[i].bonusPool[j].money;
                    }
                }
                $("#reward-pool-tbody").append(
                    `<tr>
                        <td>${data.apprules[i].appId}</td>
                        <td>${data.apprules[i].appName}</td>
                        <td>${poolin}</td>
                        <td>${poolinject}</td>
                            <td><span class="plus-tip-sig" index=${data.apprules[i].appId}>+</span>
                            <input class="pool-inject-input" index=${data.apprules[i].appId} placehoder="注入金额">
                            <button type="button" class="btn btn-warning pool-request-btn" index=${data.apprules[i].appId}>注入</button>
                            <button type="button" class="btn btn-success pool-submit-btn" index=${data.apprules[i].appId}>确定</button>
                        </td>
                        <td>${poolout}</td>
                    </tr>`
                );
                $("#reward-pool-tbody").trigger("ajaxCom");
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
            $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
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
            url: 'findAllPoolAction',
            data: { index: pageNow, pageSize: 3 },
            dataType: 'json',
            //async: false,
            cache: false,
            success: (data) => {
                $(".data-loading").stop(true, true).fadeOut(100);
                if (pageNow > data.pageNum) {
                    $(`.game-list-nav .active-navipage`).removeClass("active-navipage");
                    $(`.game-list-nav li[index=${pageNow - 1}]`).addClass("active-navipage");
                    $(".active-navipage a").trigger("click");
                    return;
                }
                //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
                    return;
                }
                $("#reward-pool-tbody").empty();
                for (let i = 0; i < data.apprules.length; i++) {
                    let poolin = 0;
                    let poolout = 0;
                    let poolinject = 0;
                    for (let j = 0; j < data.apprules[i].bonusPool.length; j++) {
                        if (data.apprules[i].bonusPool[j].type === "1") {
                            poolin = data.apprules[i].bonusPool[j].money;
                        } else if (data.apprules[i].bonusPool[j].type === "2") {
                            poolinject = data.apprules[i].bonusPool[j].money;
                        } else if (data.apprules[i].bonusPool[j].type === "3") {
                            poolout = data.apprules[i].bonusPool[j].money;
                        }
                    }
                    $("#reward-pool-tbody").append(
                        `<tr>
                        <td>${data.apprules[i].appId}</td>
                        <td>${data.apprules[i].appName}</td>
                        <td>${poolin}</td>
                        <td>${poolinject}</td>
                            <td><span class="plus-tip-sig" index=${data.apprules[i].appId}>+</span>
                            <input class="pool-inject-input" index=${data.apprules[i].appId} placehoder="注入金额">
                            <button type="button" class="btn btn-warning pool-request-btn" index=${data.apprules[i].appId}>注入</button>
                            <button type="button" class="btn btn-success pool-submit-btn" index=${data.apprules[i].appId}>确定</button>
                        </td>
                        <td>${poolout}</td>
                    </tr>`
                    );

                }
                $(".game-list-nav .pagination").html(`<li><a>&laquo;</a></li><li id="game-nav-next"><a>&raquo;</a></li>`);
                for (let i = 0; i < data.pageNum; i++) {
                    $("#game-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                }
                $(`.game-list-nav li[index=${pageNow}]`).addClass("active-navipage");
                $("#reward-pool-tbody").trigger("ajaxCom");
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").stop(true, true).fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
            }
        });
    });
    $("#reward-pool-tbody").on("ajaxCom", function () {
        $(".pool-request-btn").on("click", function (data) {
            let index = $(data.target).attr("index");
            $(data.target).hide();
            $(`.plus-tip-sig[index=${index}]`).show();
            $(`.pool-inject-input[index=${index}]`).show();
            $(`.pool-submit-btn[index=${index}]`).show();
        })

        $(".pool-submit-btn").on("click", function (data) {
            let index = $(data.target).attr("index");
            $(data.target).hide();
            $(`.plus-tip-sig[index=${index}]`).hide();
            $(`.pool-inject-input[index=${index}]`).hide();
            $(`.pool-request-btn[index=${index}]`).show();
        })
    })
})