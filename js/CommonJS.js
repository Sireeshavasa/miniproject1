

/* Global variable declarations */

var userEmailList=new Array();

var UserID= _spPageContextInfo.userId;


/* #Region - Function to get currently logged on user */

function GetCurrentloginUser() 
{
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + UserID+ ")";
	var requestHeaders = { "accept" : "application/json;odata=verbose" };	
	$.ajax({
	  url : requestUri,
	  contentType : "application/json;odata=verbose",
	  headers : requestHeaders,
	  success : onSuccess,
	  error : onError
	});
}

/* Function to get currently logged on user name for On Success */

function onSuccess(data, request){
debugger;
  var name = data.d.LoginName.split('|')[2];
  loginusername=name.split('@')[0] 
  
}

/* Function to alert an error message on Error */

function onError(error) {
  alert(error);
}

/* #Endregion - Function to get currently logged on user */



/* #Region - Function to get all users email and populate autocomplete */


function Getalluseremails()
{
debugger;
	$.ajax({
	    url : _spPageContextInfo.webAbsoluteUrl + "/_api/Web/SiteUsers",
	    type : "GET",
	    headers:{ "Accept": "application/json; odata=verbose" },
	    success:function (data) {
	    Getalluseremailssuccess(data.d.results)},
	    error:function(jqxr,errorCode,errorThrown){
	        alert(jqxr.responseText);
	    }

});
}

/* Function to get all user email id's on Success */

function Getalluseremailssuccess(emailarray)
{
debugger;

	if(emailarray.length>0)
	{
		for(var i=0;i<emailarray.length;i++)
		{
			userEmailList.push(emailarray[i].Email);   		   		
		}
	}	
}

/* Function to get all user email id's on Failure */

function Getalluseremailsfailure()
{
	// Do Nothing
}


/* #Endregion - Function to get all users email and populate autocomplete */

/*Individual columns filter */
var arrayMap = {};
var ArrayDuplicate=new Array();
var SelectedValues=new Array();
function showFilterOption(tdObject){
debugger;
  var filterGrid = $(tdObject).find(".filter");
  ArrayDuplicate.length=0;
  if (filterGrid.is(":visible")){
    filterGrid.hide();
    return;
  }
  
  $(".filter").hide();
  
  var index = 0;
  filterGrid.empty();
  var allSelected = true;
  filterGrid.append('<div><input id="all" type="checkbox" checked class="excelhidespan">Select All</div>');
  
  var $rows = $(tdObject).parents("table").find("tbody tr");
  
  
  $rows.each(function(ind, ele){
  debugger;
    var currentTd = $(ele).children()[$(tdObject).attr("index")];
    var div = document.createElement("div");
    div.classList.add("grid-item")
    var str = $(ele).is(":visible") ? 'checked' : '';
    if ($(ele).is(":hidden")){
      allSelected = false;
    }
    
    var currentTdValue=currentTd.innerHTML;
    var dummyArray = $.grep(ArrayDuplicate, function(dt) {
    return dt== currentTdValue;
    });
    if(dummyArray.length==0)
    {
     div.innerHTML = '<input type="checkbox" '+str+' class="excelhidespan" >'+currentTd.innerHTML;
     filterGrid.append(div);
     ArrayDuplicate.push(currentTd.innerHTML);
    }
    else
    {
      div.innerHTML = '<input type="checkbox" class="excelhidespan">'+currentTd.innerHTML;
      div.style.display = 'none';
      filterGrid.append(div);
    }
    arrayMap[index] = ele;
    index++;
  });
  
  if (!allSelected){
    filterGrid.find("#all").removeAttr("checked");
  }
  
  filterGrid.append('<div><input id="close" type="button" value="Close"/><input id="ok" type="button" value="Ok"/></div>');
  filterGrid.show();
  
  var $closeBtn = filterGrid.find("#close");
  var $okBtn = filterGrid.find("#ok");
  var $checkElems = filterGrid.find("input[type='checkbox']");
  var $gridItems = filterGrid.find(".grid-item");
  var $all = filterGrid.find("#all");
  
  $closeBtn.click(function(){
  debugger;
    filterGrid.hide();
    return false;
  });
  
  $okBtn.click(function(){
  debugger;
    SelectedValues.length=0;
    filterGrid.find(".grid-item").each(function(ind,ele){
      if ($(ele).find("input").is(":checked")){
        SelectedValues.push($(ele)[0].innerText.trim());
      }
    });
    filterGrid.find(".grid-item").each(function(ind,ele){
    debugger;
      var dummyArray1 = $.grep(SelectedValues, function(dt) {
      return dt== $(ele)[0].innerText.trim();
      });
      if(dummyArray1.length>0)
      {
        $(arrayMap[ind]).show();
      }
      else{
        $(arrayMap[ind]).hide();
      }
    });
    filterGrid.hide();
    return false;
  });
  
  $checkElems.click(function(event){
  debugger;
    event.stopPropagation();
    //return false;
  });
  
  $gridItems.click(function(event){
  debugger;
    var chk = $(this).find("input[type='checkbox']");
    $(chk).prop("checked",!$(chk).is(":checked"));
  });
  
  $all.change(function(){
  debugger;
    var chked = $(this).is(":checked");
    filterGrid.find(".grid-item [type='checkbox']").prop("checked",chked);
  })
  
  filterGrid.click(function(event){
  debugger;
    event.stopPropagation();
    //return false;
  });
  
  return filterGrid;
}

/* Function to get Date and Time format*/
function DateTimeFormate(discussionbydate)
{	
	var hours = discussionbydate.getHours();
	var minutes = discussionbydate.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	//discussionbydate = discussionbydate .getMonth()+1 + "/" + discussionbydate .getDate() + "/" + discussionbydate .getFullYear() + " " + strTime;
	return strTime;
}

  