		var url = "http://222.236.46.45/nfsdb/";		//start URL
		var cntDir = 0;								//count Dir level

		$(document).ready(function(){				
			connectionAjax();
		});
	
		
		$(document).on("click", "a", function(){						//when a tag clicked 
			event.preventDefault();									//prevent to href
			var clikedName = $(event.target).text()					//find value in the a tag
			console.log(clikedName);	
			$('tbody').empty();
			cntDir++;											//remove all element under div
			connectionAjax(clikedName);				
		});

		function connectionAjax(lastUrl){

			if(lastUrl == "[To Parent Directory]"){					//if back button clicked
				toParentDir();	
				cntDir -= 2;
			}
			else
				if(cntDir >= 6 && checkZip(lastUrl)){
					downloadZip(lastUrl);
					cntDir--;
				}

				else if(cntDir == 0){}		//start Url

				else{
					
					url += lastUrl + "/";									//append value
				}
			$.ajax({
				type:"GET",
				url:url,
				dataType:"html",
					success:function(html){
						var $list = $(html).find('a');
						for(var i = 0; i < $list.length; i++){
							console.log(cntDir);
								if(cntDir == 0 && (i == 0 || i == 2 || i == 7))
									continue;

								$('tbody').append('<tr><td class = text-left><a href="">' + $($list[i]).text() + '</a></td></tr>');

							}
					}
			})
		}

		function toParentDir(){
			var ch;
			
			url = url.substring(0, url.length - 1);		

			while(true){
				ch = url.charAt(url.length - 1);
				
				if(ch == '/')
					break;

				url = url.substring(0, url.length - 1);
			}

		}

		function checkZip(value){		//checking vlaue is the zipfile

			return value.substring(value.length-3, value.length) == "zip"? true : false;
		
		}
		function downloadZip(value){
			var downUrl = url + value;
			$(location).attr('href', downUrl);
		}

