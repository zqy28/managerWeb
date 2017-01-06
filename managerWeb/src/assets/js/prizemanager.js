import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-prizemanager").on("prizemanagerEvent", function () {
	var time = new Date();
	var month = parseInt(time.getMonth()) + 1;
	var currentTime = time.getFullYear()+"-"+month+"-"+time.getDate();
	var prizeId;
	var name;
	var detail;
	var text;
	var inventory;
	var olddetail;	
	var oldtext;	
	var oldinventory;
	
	showPrizes();
	$('#prizelist tr').click(function() {
		$('#chgif').css('display','block');
		$('body').addClass('scroll');
		$('#other').css('display','block');
		showInfo(this);
		olddetail = $(this).find('td').eq(1).text();
		oldtext = $(this).find('td').eq(2).text();
		oldinventory = $(this).find('td').eq(4).text();
	});
	$('#close').click(function() {
		$('#chgif').css('display','none');
		$('#other').css('display','none');
		// $('.home').removeClass('opacity');
	}); 
	$('#ok').click(function() {
		if (($('#detail').val() == "") || ($('#method').val() == "") || ($('#remain').val() == "")) {
			// alert('缺少奖品信息');
			showTip("缺少奖品信息");
			
		} else if (($('#detail').val() == olddetail) && ($('#method').val() == oldtext) && ($('#remain').val() == oldinventory)) {
			//alert('无改动');
			showTip("无改动");	
		} else {
			savePrize();
			// alert('修改成功');
			showTip("修改成功");
			$('#chgif').css('display','none');
			$('#other').css('display','none');
			$('body').removeClass('scroll');
			for (var i = 0; i < 6; i++) {
				var $th = $('#prizelist tr').eq(i).find('th');
				var $td = $('#prizelist tr').eq(i).find('td');
				if ($th.eq(0).text() == $('#prizeId').val()) {
					if ($('#method').val().indexOf("http") != -1) {
						$td.eq(1).text($('#detail').val());
						$td.eq(2).text($('#method').val()).css('display','none');
						$td.eq(4).text($('#remain').val());
						$td.eq(3).text("").css('display','table-cell')
								.qrcode({
									render: "canvas",
									width: 60,
									height: 60,
									text: $('#method').val(),
								});
					} else {
						$td.eq(1).text($('#detail').val());
						$td.eq(2).text($('#method').val()).css('display','table-cell');
						$td.eq(4).text($('#remain').val());
						$td.eq(3).css('display','none');
					}
				}
			}
		}
	});

	//显示修改提示
	function showTip(str) {
		$('#tip').text(str).css('display','block');
		var setclock = setInterval(function() {
			$('#tip').css('display','none');
			clearInterval(setclock);
		},1000);
	}
	//获取奖品
	function getPrizes(data) {
		for (var i = 0; i < data.length; i++) {
			var $th = $('#prizelist tr').eq(i).find('th');
			var $td = $('#prizelist tr').eq(i).find('td');
			$th.eq(0).text(data[i].prizeId);
			$td.eq(0).text(data[i].name);
			$td.eq(1).text(data[i].detail);
			$td.eq(2).text(data[i].text).css('display','table-cell');
			$td.eq(4).text(data[i].inventory);
			$td.eq(3).attr('display','block');
			if (data[i].text.indexOf("http") != -1) {
				$td.eq(2).css('display','none');
				$td.eq(3).text("").css('display','table-cell');
				$td.eq(3).qrcode({
					render: "canvas",
					width: 60,
					height: 60,
					text: data[i].text,
				});
			}
		}
	}
	//显示奖品
	function showPrizes(){
		$.ajax({
			url:"getPrizesAction",
			type:"POST",
	  		dataType:"json",
	  		data:{
	  			queryTime: currentTime,			
	  		},
	  		success:function(data){
	  			getPrizes(data.prizes);
	  		}
		});
	}
	//在修改表单显示奖品信息
	function showInfo(prize) {
		var $th = $(prize).find('th');
		var $td = $(prize).find('td');
		$('#prizeId').val($th.eq(0).text());
		$('#grade').val($td.eq(0).text());
		$('#detail').val($td.eq(1).text());
		$('#method').val($td.eq(2).text());
		$('#remain').val($(prize).find('.remain').text());
		// $('#methodtext').text("领奖方式：");
		// if ($td.eq(2).text().indexOf("http") != -1) {
		// 	$('#methodtext').text("二维码url: ");
		// }
		// console.log($(prize).find('.remain'));
	}
	//将修改后的奖品信息入库
	function savePrize() {
		prizeId = $('#prizeId').val();
		name = $('#grade').val();
		detail = $('#detail').val();
		text = $('#method').val();
		inventory = $('#remain').val();
		$.ajax({
			url: "updatePrizeAction",
			type:"POST",
  			dataType:"json",
	  		data:{
	  			prizeId: prizeId,	
	  			name: name,
	  			detail: detail,
	  			text: text,
	  			inventory: inventory,		
	  		},
	  		success:function(data){
	  			// window.location.reload();
	  		}
		});
	}
});