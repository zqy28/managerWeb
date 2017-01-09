import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-rewardpool").on("rewardpoolEvent", function () {

    $(".data-loading").stop(true, true).fadeIn(100);
    loadPoolData();


    $(".pool-request-btn").on("click", function (data) {
        $(data.target).hide();
        $("#pool-inject-value input").val("").focus();
        $(`#pool-inject-value`).show();
        $(`.pool-submit-btn`).show();
    })

    $(".pool-submit-btn").on("click", function (data) {
        if (isNaN($("#pool-inject-value input").val())) {
            $(".alert-danger").html("请输入有效数字!").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            return;
        }
        if ($("#pool-inject-value input").val() < 0) {
            $(".alert-danger").html("请输入大于0的数字!").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            return;
        }
        if ($("#pool-inject-value input").val() == 0) {
            $(`.pool-submit-btn`).hide();
            $(`#pool-inject-value`).hide();
            $(`.pool-request-btn`).show();
            return;
        }
        $.ajax({
            type: 'POST',
            url: 'injectPoolAction',
            data: { money: $("#pool-inject-value input").val() },
            dataType: 'json',
            cache: false,
            success: (data) => {
                $(".data-loading").delay(300).fadeOut(100);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                loadPoolData();
                $(`.pool-submit-btn`).hide();
                $(`#pool-inject-value`).hide();
                $(`.pool-request-btn`).show();
            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            }
        });
    })


    function loadPoolData() {
        $.ajax({
            type: 'POST',
            url: 'findPoolAction',
            data: {},
            dataType: 'json',
            cache: false,
            success: (data) => {
                $(".data-loading").delay(300).fadeOut(100);
                if (data.resultCode !== "1") {
                    $(".alert-danger").html(data.resultMessage).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
                    return;
                }
                //$(".alert-success").html("成功获取游戏列表").stop(true, true).fadeIn(200).delay(2000).fadeOut(200);

                for (let i = 1; i < data.bonusPools.length + 1; i++) {

                    for (let j = 0; j < data.bonusPools.length; j++) {
                        if (data.bonusPools[j].type === `${i}`) {
                            $(`#reward-pool-tbody span[type=${i}]`).html(data.bonusPools[j].money);
                        }
                    }
                }

            },
            error: (xhr, status, err) => {
                console.error(xhr.status, xhr.responseText, status, err.toString());
                $(".data-loading").fadeOut(100);
                $(".alert-danger").html(xhr.responseText).stop(true, true).fadeIn(200).delay(2000).fadeOut(200);
            }
        });
    }
})