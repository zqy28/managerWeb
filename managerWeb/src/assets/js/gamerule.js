import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-gamerule").on("gameruleEvent", function () {

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
                if(pageNow>data.pageNum){
                    $(`.game-list-nav .active-navipage`).removeClass("active-navipage");
                    $(`.game-list-nav li[index=${pageNow-1}]`).addClass("active-navipage");
                    $(".active-navipage a").trigger("click");
                    return;}
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

    //添加新游戏规则
    $("#new-game-btn").click(function () {
        $(".pop-mask").css("display", "block");
        $(".new-game-form").css("display", "block");
    })
    $(".pop-close-btn").click(function () {
        $(".pop-mask").css("display", "none");
        $(".new-game-form").css("display", "none");
        $(".delete-game-form").css("display", "none");
    })
    $(".pop-mask").click(function () {
        $(".pop-mask").css("display", "none");
        $(".new-game-form").css("display", "none");
        $(".delete-game-form").css("display", "none");
    })

    $(".submit-new-gamerule").click(function () {
        $(".data-loading").stop(true, true).fadeIn(100);
        $.ajax({
            type: 'POST',
            url: 'setNewGameRuleAction',
            data: { newGameRule: `{appId: ${$("#new-game-id").val()}, price: ${$("#new-game-price").val()}, basePoint: ${$("#new-game-basicpoint").val()}, finalPoint: ${$("#new-game-finalpoint").val()}, rewardSystems: [{  upPercentage: ${$("#new-game-upPercentageOne").val()}, reward: ${$("#new-game-rewardOne").val()}},{ upPercentage: ${$("#new-game-upPercentageTwo").val()}, reward: ${$("#new-game-rewardTwo").val()}}] }` },
            dataType: 'json',
            cache: false,
            success: (data) => {
                $(".data-loading").delay(300).fadeOut(100);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                $(".alert-success").html("成功添加").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                $(".pop-mask").css("display", "none");
                $(".new-game-form").css("display", "none");
                $(".active-navipage a").trigger("click");
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").stop(true, true).fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            }
        })

    })

    //删除游戏规则
    $("#delete-game-btn").click(function () {
        $(".pop-mask").css("display", "block");
        $(".delete-game-form").css("display", "block");
    })
    $(".delete-exist-gamerule").click(function () {
        
        $.ajax({
            type: 'POST',
            url: 'deleteGameRuleAction',
            data: { appid: $("#delete-game-id").val() },
            dataType: 'json',
            cache: false,
            success: (data) => {
                
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                $(".alert-success").html("成功删除").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                $(".pop-mask").css("display", "none");
                $(".delete-game-form").css("display", "none");
                $(".active-navipage a").trigger("click");
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").stop(true, true).fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            }
        })

    })

    //查看某个游戏的规则
    $(".btn-group").click(function (data) {
        
        if ($(data.target).hasClass("select-game-btn")) {
            let targetId = $(data.target).attr("appid");
            $("#confirm-change-rule").attr("appid", targetId);
            $.ajax({
                type: 'POST',
                url: 'getGameRuleAction',
                data: { appid: targetId },
                dataType: 'json',
                cache: false,
                success: (data) => {
                   
                    if (data.resultCode !== "1") {
                        $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                        return;
                    }
                    //$(".alert-success").html("读取成功").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    $(".exist-gamerule-table #basicpay").val(data.apprule.price);
                    $(".exist-gamerule-table #basePoint").val(data.apprule.basePoint);
                    $(".exist-gamerule-table #finalPoint").val(data.apprule.finalPoint);
                    $(".exist-gamerule-table #upPercentageOne").val(data.apprule.rewardSystems[0].upPercentage).attr("rewardSystemId", data.apprule.rewardSystems[0].rewardSystemId);
                    $(".exist-gamerule-table #rewardOne").val(data.apprule.rewardSystems[0].reward);
                    $(".exist-gamerule-table #upPercentageTwo").val(data.apprule.rewardSystems[1].upPercentage).attr("rewardSystemId", data.apprule.rewardSystems[1].rewardSystemId);
                    $(".exist-gamerule-table #rewardTwo").val(data.apprule.rewardSystems[1].reward);
                },
                error: (xhr, status, err) => {
                    console.error(xhr.status, xhr.responseText, status, err.toString());
                    $(".data-loading").stop(true, true).fadeOut(100);
                    $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                }
            });
            $(".reward-rule-manager").hide();
            $(".reward-rule-manager").slideDown();
        }
    })

    //修改某个游戏的规则
    $("#change-reward-rule").click(function () {
        $("#change-reward-rule").hide();
        $("#confirm-change-rule").show();
        $("#upPercentageOne").removeAttr("disabled");
        $("#rewardOne").removeAttr("disabled");
        $("#basicpay").removeAttr("disabled");
        $("#basePoint").removeAttr("disabled");
        $("#finalPoint").removeAttr("disabled");
        $("#upPercentageTwo").removeAttr("disabled");
        $("#rewardTwo").removeAttr("disabled");
    })
    $("#confirm-change-rule").click(function () {
        $("#confirm-change-rule").hide();
        $("#change-reward-rule").show();
        $("#upPercentageOne").attr("disabled", "disabled");
        $("#rewardOne").attr("disabled", "disabled");
        $("#basicpay").attr("disabled", "disabled");
        $("#basePoint").attr("disabled", "disabled");
        $("#finalPoint").attr("disabled", "disabled");
        $("#upPercentageTwo").attr("disabled", "disabled");
        $("#rewardTwo").attr("disabled", "disabled");
        $(".data-loading").stop(true, true).fadeIn(100);
        $.ajax({
            type: 'POST',
            url: 'setGameRuleAction',
            data: { newGameRule: `{appId: ${$(this).attr("appid")}, price: ${$("#basicpay").val()}, basePoint: ${$("#basePoint").val()}, finalPoint: ${$("#finalPoint").val()},rewardSystems: [{ rewardSystemId: ${$("#upPercentageOne").attr("rewardSystemId")}, upPercentage: ${$("#upPercentageOne").val()}, reward: ${$("#rewardOne").val()}},{ rewardSystemId: ${$("#upPercentageTwo").attr("rewardSystemId")}, upPercentage: ${$("#upPercentageTwo").val()}, reward: ${$("#rewardTwo").val()}}] }` },
            dataType: 'json',
            cache: false,
            success: (data) => {
                $(".data-loading").delay(300).fadeOut(100);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                $(".alert-success").html("修改成功").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").stop(true, true).fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            }
        })

    })
})