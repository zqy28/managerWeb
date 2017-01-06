import $ from 'jquery';
window.$ = $;
window.jQuery = $;
$("#navi-drawlog").on("drawlogEvent",function() {
	var time = new Date();
	var month = parseInt(time.getMonth()) + 1;
	var currentTime = time.getFullYear()+"-"+month+"-"+time.getDate();
	var prizeId;
	var name;
	var detail;
	var pageSize = 8;
	var index = 1;
	var pageNum = 1;
	
	$.ajax({
		url:"getRecordsAction",
		type:"POST",
	 		dataType:"json",
			data:{
				index: index,
				pageSize: pageSize,
				queryTime: currentTime,			
		},
		success:function(data){
			pageNum = data.pageNum;
			showRecords(data);
			$('#changepage #jumppage').val(index);
			changePage();
		}
	});

	
	$('#changepage #startjump').click(function() {
		index = $('#changepage #jumppage').val();
		if (index >= 1 && index <= pageNum) {
			$.ajax({
				url:"getRecordsAction",
				type:"POST",
			 		dataType:"json",
					data:{
						index: index,
						pageSize: pageSize,
						queryTime: currentTime,			
				},
				success:function(data){
					pageNum = data.pageNum;
					showRecords(data);
					$('#changepage #jumppage').val(index);
					changePage();
				}
			});
		} else {
			showTip("跳转无效",1500);
		}
	});

	function showTip(str,time) {
		$('#tip').text(str).css('display','block');
		var setclock = setInterval(function() {
			$('#tip').css('display','none');
			clearInterval(setclock);
		},time);
	}

	function showRecords(data) {
		// console.log(index);
		$('#changepage .num').remove();
		$('.info-table #infolist tr').remove();
		pageNum = data.pageNum;
		if (pageNum <= 9) {
			for (var i = 1; i <= data.pageNum; i++) {
				if (index == i) {
					var $li = $("<li class=num><a class=active>" + i + "</a></li>");
					$('#changepage #next').before($li);
				} else {
					var $li = $("<li class=num><a>" + i + "</a></li>");
					$('#changepage #next').before($li);
				}
			}
		} else {
			if (index <= 2)  {		//1,2
				for (var i = 1; i <= 3; i++) {
					if (index == i) {
						var $li = $("<li class=num><a class=active>" + i + "</a></li>");
						$('#changepage #next').before($li);
					} else {
						var $li = $("<li class=num><a>" + i + "</a></li>");
						$('#changepage #next').before($li);
					}
				}
				var $li = $("<li class=num>&nbsp...&nbsp</li> <li class=num><a>" + pageNum + "</a></li>");
				$('#changepage #next').before($li);
			} else if (pageNum - index <= 1) {		//last1,2
				var $li = $("<li class=num><a>" + 1 + "</a></li> <li class=num>&nbsp...&nbsp</li>");
				$('#changepage #next').before($li);
				for (var i = pageNum - 2; i <= pageNum; i++) {
					if (index == i) {
						var $li = $("<li class=num><a class=active>" + i + "</a></li>");
						$('#changepage #next').before($li);
					} else {
						var $li = $("<li class=num><a>" + i + "</a></li>");
						$('#changepage #next').before($li);
					}
				}
			} else if (index == 3) {
				for (var i = 1; i <= 4; i++) {
					if (index == i) {
						var $li = $("<li class=num><a class=active>" + i + "</a></li>");
						$('#changepage #next').before($li);
					} else {
						var $li = $("<li class=num><a>" + i + "</a></li>");
						$('#changepage #next').before($li);
					}
				}
				var $li = $("<li class=num>&nbsp...&nbsp</li> <li class=num><a>" + pageNum + "</a></li>");
				$('#changepage #next').before($li);
			} else if (index == pageNum - 2) {
				var $li = $("<li class=num><a>" + 1 + "</a></li> <li class=num>&nbsp...&nbsp</li>");
				$('#changepage #next').before($li);
				for (var i = index - 1; i <= pageNum; i++) {
					if (index == i) {
						var $li = $("<li class=num><a class=active>" + i + "</a></li>");
						$('#changepage #next').before($li);
					} else {
						var $li = $("<li class=num><a>" + i + "</a></li>");
						$('#changepage #next').before($li);
					}
				}
			} else {
				var $li = $("<li class=num><a>" + 1 + "</a></li> <li class=num>&nbsp...&nbsp</li>");
				$('#changepage #next').before($li);
				for (var i = index - 1; i <= parseInt(index) + 1; i++) {
					if (index == i) {
						var $li = $("<li class=num><a class=active>" + i + "</a></li>");
						$('#changepage #next').before($li);
					} else {
						var $li = $("<li class=num><a>" + i + "</a></li>");
						$('#changepage #next').before($li);
					}
				}
				var $li = $("<li class=num>&nbsp...&nbsp</li><li class=num><a>" + pageNum + "</a></li>");
				$('#changepage #next').before($li);
			}
		}

		if (data.records.length < pageSize) {
			for (var i = 0; i < data.records.length; i++) {
				var $tr = $("<tr>"
							+"<th>"+data.records[i].recordId+"</th>"	
							+"<td>"+data.records[i].name+"</td>"
							+"<td>"+data.records[i].addTime+"</td>"
							+"<td>"+data.records[i].prizeId+"</td>"
							+"<td>"+data.records[i].phone+"</td>"
							+"<td>"+data.records[i].address+"</td>"
							+"<td>"+data.records[i].status+"</td>"
						+"</tr>");
				$('.info-table #infolist').append($tr);
			}
		} else {
			for (var i = 0; i < pageSize; i++) {
				var $tr = $("<tr>"
  								+"<th>"+data.records[i].recordId+"</th>"	
  								+"<td>"+data.records[i].name+"</td>"
  								+"<td>"+data.records[i].addTime+"</td>"
  								+"<td>"+data.records[i].prizeId+"</td>"
  								+"<td>"+data.records[i].phone+"</td>"
  								+"<td>"+data.records[i].address+"</td>"
  								+"<td>"+data.records[i].status+"</td>"
							+"</tr>");
				$('.info-table #infolist').append($tr);
			}
		}
	}
	function changePage() {
		$('#changepage .num').click(function() {
			if (index != $(this).text()) {
				index = $(this).text();
				$.ajax({
					url:"getRecordsAction",
					type:"POST",
		  	 		dataType:"json",
		  			data:{
		  				index: index,
		  				pageSize: pageSize,
		  				queryTime: currentTime,			
					},
		  			success:function(data){
		  				pageNum = data.pageNum;
		  				showRecords(data);
		  				$('#changepage #jumppage').val(index);
		 				changePage();
		  			}
				});
			}	
		});		
	}
	$('#changepage #forward').click(function() {
		index = $('#changepage .active').text();
		if (index != 1) {
			index--;
			$.ajax({
				url:"getRecordsAction",
				type:"POST",
	  	 		dataType:"json",
	  			data:{
	  				index: index,
	  				pageSize: pageSize,
	  				queryTime: currentTime,			
				},
	  			success:function(data){
	  				pageNum = data.pageNum;
	 				showRecords(data);
	 				$('#changepage #jumppage').val(index);
	 				changePage();
	  			}
			});
		}
	});
	$('#changepage #next').click(function() {
		index = $('#changepage .active').text();
		if (index != pageNum) {
			index++;
			$.ajax({
				url:"getRecordsAction",
				type:"POST",
	  	 		dataType:"json",
	  			data:{
	  				index: index,
	  				pageSize: pageSize,
	  				queryTime: currentTime,			
				},
	  			success:function(data){
	  				pageNum = data.pageNum;
	 				showRecords(data);
	 				$('#changepage #jumppage').val(index);
	 				changePage();
	  			}
			});
		}			
	});
});