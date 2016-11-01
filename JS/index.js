documentWidth=window.screen.availWidth;
$(function(){
		$('#dowebok').fullpage({
			navigation:true,
			navigationTooltips:["个人简介","校园景色","兴趣能力","学习Demo"],
			afterRender: function(){
		        $("#luo-img").addClass("role-icon-bar");
		        $(".page-one").addClass("showSlowy");
		    },
			afterLoad:function(anchorLink,index){
				var loadedSection = $(this);
				if(index==1){
					$("#luo-img").addClass("role-icon-bar showSlowy");
					$(".page-one").addClass("showSlowy");
				}
				if(index==3){
					$(".progress").addClass("progressAdd");
					$(".hobby-anim").addClass("slowDown");
				}
			},
			onLeave: function(index, nextIndex, direction){
				if(index==1){
					$("#luo-img").removeClass("role-icon-bar showSlowy");
					$(".page-one").removeClass("showSlowy");
				}
				if(index==3){
					$(".progress").removeClass("progressAdd");
					$(".hobby-anim").removeClass("slowDown");
				}

			
			}
		});

	/*
	$(".role-icon-bar").mouseover(function(){
		$("#role-icon-shadow").css("display","block");
	});

	$(".role-icon-bar").mouseout(function(){
		$("#role-icon-shadow").css("display","none");
	});*/
		if(documentWidth<500){
			$(".page-one").css("opacity","1");
			$(".hobby-anim").css("opacity","1");
			$(".progress").css("width","100%");
			
		}

	
			try {
				$('.section').ripples({
					resolution: 512,
					dropRadius: 10, //px
					perturbance: 0.04,
				});
			}
			catch (e) {
				$('.error').show().text(e);
			}
	
	
		
});

