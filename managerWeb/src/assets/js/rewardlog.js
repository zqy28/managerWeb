import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-rewardlog").on("rewardlogEvent", function () {
    //读取第一页游戏信息
    $(".data-loading").stop(true, true).fadeIn(100);
    $.ajax({
        type: 'POST',
        url: 'getRewardLogAction',
        data: { index: 1, pageSize: 3, type: 2 },
        dataType: 'json',
        cache: false,
        success: (data) => {
            $(".data-loading").delay(300).fadeOut(100);
            if (data.resultCode !== "1") {
                $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                return;
            }
            //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
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
            if (data.pageNum < 6) {
                for (let i = 0; i < data.pageNum; i++) {
                    $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                }
                $("#log-nav-next").before(`<li class="lognav-after-ellipsis" indexel="3"><a>...</a></li>`);
                $("#log-nav-next").before(`<li index=${data.pageNum}><a>${data.pageNum}</a></li>`);
            }
            $(`.normal-list-nav li[index="1"]`).addClass("active-navipage");
            $(`.normal-list-nav`).attr("pageSum", data.pageNum);
        },
        error: (xhr, status, err) => {
            console.error(xhr.status, xhr.responseText, status, err.toString());
            $(".data-loading").stop(true, true).fadeOut(100);
            $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
        }
    });

    //读取某一页游戏信息
    $(".normal-list-nav .pagination").click(function (data, jumpPage) {

        let pageNow = parseInt($(`.normal-list-nav .active-navipage`).attr("index"));
        if (!isNaN(jumpPage)) {
            pageNow = parseInt(jumpPage);
        } else {
            if ($(data.target).html() === "...") {
                return;
            }

            if (!isNaN($(data.target).html())) {
                pageNow = parseInt($(data.target).closest('li').attr("index"));
            } else if ($(data.target).html() === "«" && pageNow > 1) {
                pageNow--;
            } else if ($(data.target).html() === "»" && pageNow < parseInt($(`.normal-list-nav`).attr("pageSum"))) {
                pageNow++;
            }
        }
        
        $.ajax({
            type: 'POST',
            url: 'getRewardLogAction',
            data: { index: pageNow, pageSize: 3, type: 2 },
            dataType: 'json',
            cache: false,
            success: (data) => {
                $(".data-loading").delay(300).fadeOut(100);
                if (pageNow > data.pageNum) {
                    $(".alert-danger").html("请输入有效页数!!").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                $("#game-rewardlog-tbody").empty();
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
                let beforeIndex = parseInt($(".lognav-before-ellipsis").attr("indexel"));
                let afterIndex = parseInt($(".lognav-after-ellipsis").attr("indexel"));
                data.pageNum=parseInt(data.pageNum);
                pageNow=parseInt(pageNow);
                if (data.pageNum > 5) {
                    if (pageNow === 1) {
                        
                        $(".normal-list-nav .pagination").html(`<li><a>&laquo;</a></li><li id="log-nav-next"><a>&raquo;</a></li>`);
                        for (let i = 0; i < 3; i++) {
                            $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                        }
                        $("#log-nav-next").before(`<li class="lognav-after-ellipsis" indexel=3><a>...</a></li>`);
                        $("#log-nav-next").before(`<li index=${data.pageNum}><a>${data.pageNum}</a></li>`);

                    } else if (pageNow === data.pageNum) {
                        
                        $(".normal-list-nav .pagination").html(`<li><a>&laquo;</a></li><li id="log-nav-next"><a>&raquo;</a></li>`);
                        $("#log-nav-next").before(`<li index=1><a>1</a></li>`);
                        $("#log-nav-next").before(`<li class="lognav-before-ellipsis" indexel=${data.pageNum - 2}><a>...</a></li>`);
                        for (let i = data.pageNum - 3; i < data.pageNum; i++) {
                            $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                        }
                    } else {
                        
                        if (afterIndex <= pageNow) {
                            
                            $(".normal-list-nav .pagination").html(`<li><a>&laquo;</a></li><li id="log-nav-next"><a>&raquo;</a></li>`);
                            $("#log-nav-next").before(`<li index="1"><a>1</a></li>`);
                            if (pageNow > 3) $("#log-nav-next").before(`<li class="lognav-before-ellipsis" indexel=${pageNow - 1}><a>...</a></li>`);
                            if (data.pageNum - pageNow < 3) {
                                if (data.pageNum - pageNow === 2) {
                                    $("#log-nav-next").before(`<li index=${data.pageNum - 3}><a>${data.pageNum - 3}</a></li>`);
                                }
                                for (let i = data.pageNum - 3; i < data.pageNum; i++) {
                                    $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                                }
                            } else {
                                for (let i = pageNow - 2; i < pageNow + 1; i++) {
                                    $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                                }
                                $("#log-nav-next").before(`<li class="lognav-after-ellipsis" indexel=${pageNow + 1}><a>...</a></li>`);
                                $("#log-nav-next").before(`<li index=${data.pageNum}><a>${data.pageNum}</a></li>`);
                            }
                        }
                        else if (beforeIndex >= pageNow) {
                            
                            $(".normal-list-nav .pagination").html(`<li><a>&laquo;</a></li><li id="log-nav-next"><a>&raquo;</a></li>`);
                            if (pageNow < 4) {
                                for (let i = 0; i < 3; i++) {
                                    $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                                }

                                if (pageNow === 3) {
                                    $("#log-nav-next").before(`<li index=4><a>4</a></li>`);
                                    $("#log-nav-next").before(`<li class="lognav-after-ellipsis" indexel=4><a>...</a></li>`);
                                } else {
                                    $("#log-nav-next").before(`<li class="lognav-after-ellipsis" indexel=3><a>...</a></li>`);
                                }
                                $("#log-nav-next").before(`<li index=${data.pageNum}><a>${data.pageNum}</a></li>`);
                            } else {
                                $("#log-nav-next").before(`<li index="1"><a>1</a></li>`);
                                $("#log-nav-next").before(`<li class="lognav-before-ellipsis" indexel=${pageNow - 1}><a>...</a></li>`);
                                for (let i = pageNow - 2; i < pageNow + 1; i++) {
                                    $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                                }
                                if (data.pageNum - pageNow > 2) $("#log-nav-next").before(`<li class="lognav-after-ellipsis" indexel=${pageNow + 1}><a>...</a></li>`);
                                $("#log-nav-next").before(`<li index=${data.pageNum}><a>${data.pageNum}</a></li>`);
                            }
                        } else {
                            
                            $(`.active-navipage`).removeClass("active-navipage");
                            $(`.normal-list-nav li[index=${pageNow}]`).addClass("active-navipage");
                        }
                    }
                } else {
                    for (let i = 0; i < data.pageNum; i++) {
                        $("#log-nav-next").before(`<li index=${i + 1}><a>${i + 1}</a></li>`);
                    }
                }
                $(`.normal-list-nav li[index=${pageNow}]`).addClass("active-navipage");
                $(`.normal-list-nav`).attr("pageSum", data.pageNum)
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").stop(true, true).fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            }
        });
    });

    $("#jump-navipage-btn").click(function () {
        // console.log(`${$("#jump-navipage-input").val()}>${$(`.normal-list-nav`).attr("pageSum")}=${$("#jump-navipage-input").val() > $(`.normal-list-nav`).attr("pageSum")}`);
        if (isNaN($("#jump-navipage-input").val())||$("#jump-navipage-input").val()<1||parseInt($("#jump-navipage-input").val() )> parseInt($(`.normal-list-nav`).attr("pageSum"))) {
            $(".alert-danger").html("请输入有效页数!").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
        } else {
            $(".normal-list-nav .pagination").trigger("click", $("#jump-navipage-input").val());
        }
    })
})