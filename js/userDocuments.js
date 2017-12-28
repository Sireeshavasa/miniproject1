


/* Global variable declarations */

var DocumentlistName="SPDocuments"; /*library name*/
var SPDiscussionlist="SPDiscussionBoard"; /*Discussion list*/
var siteURL=_spPageContextInfo.siteAbsoluteUrl; /*current site url*/
var SPdropdownglbl=false;



/* Function for sorting the table each columns */

var f_project = 1;

function Projectsort(){
debugger;

    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=0;
    sortTable(f_project,n);
}
function Statussort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=1;
    sortTable(f_project,n);
}
function CreatedDatesort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=3;
    sortTable(f_project,n);
}
function AuthorSort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=4;
    sortTable(f_project,n);
}
function ModifiedSort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=5;
    sortTable(f_project,n);
}
function SPCompliancesort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=6;
    sortTable(f_project,n);
}
function SPLegalsort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=7;
    sortTable(f_project,n);
}
function SPBrandsort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=8;
    sortTable(f_project,n);
}
function AXPBrandsort(){
debugger;
    f_project *= -1;
    //var n = $("#projectsort").prevAll().length;
    var n=9;
    sortTable(f_project,n);
}




/* on page load */  
$(document).ready(function(){

$("#SPtableid thead td #proj-filter").click(function(){
debugger;
     showFilterOption(this);
    });

/* #Region - Function to get all users email and populate autocomplete */
 Getalluseremails(Getalluseremailssuccess,Getalluseremailsfailure);
	 $("#frmaddressid").autocomplete({
			//minLength: 0,
			source: userEmailList			
		});
		$("#frmaddressidEdit").autocomplete({
			//minLength: 0,
			source: userEmailList			
		});
		$("#Rplyaddressid").autocomplete({
			//minLength: 0,
			source: userEmailList			
		});
		$("#RplyaddressidEdit").autocomplete({
			//minLength: 0,
			source: userEmailList			
		});
		$("#audiencesizeid")
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete("instance").menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 1,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            userEmailList, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
      
      $( "#audiencesizeidEdit" ).on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
          }
      })
      .autocomplete({
        minLength: 1,
        source: function( request, response ) {
          response( $.ui.autocomplete.filter(
            userEmailList, extractLast( request.term ) ) );
        },
        focus: function() {
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          terms.pop();
          terms.push( ui.item.value );
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });



/* #Endregion - Function to get all users email and populate autocomplete */



/* #region - checking email communication required or not */

$('input[type="radio"]').click(function(){
debugger;
    if ($(this).is(':checked')==true)
    {
		if($(this).val()=="Yes")
		{
			$("#frmaddressid").val('');
			$("#Rplyaddressid").val('');
			$("#subjectlineid").val('');
			$("#audiencesizeid").val('');
			$('#Emailmarktngid').prop('selectedIndex',0);

			$("#frmaddressid").removeClass("error");
			$("#Rplyaddressid").removeClass("error");
			$("#subjectlineid").removeClass("error");
			$("#audiencesizeid").removeClass("error");
			$('#Emailmarktngid').removeClass("error");
						
			
			$("#frmaddressidEdit").val('');
			$("#RplyaddressidEdit").val('');
			$('#audiencesizeidEdit').val('');
			$('#EmailmarktngidEdit').prop('selectedIndex',0);
			$('#subjectlineidEdit').val('');
			
			$("#emailcommnctnYES").show();
			$("#checkemaicomm").show();
		}
		else
		{
			$("#emailcommnctnYES").hide();
			$("#checkemaicomm").hide();
			
		}
    }
  });

/* #Endregion - checking email communication required or not */	
	

});  

/* #Region - Function to get all items from document library*/

function GetDocumentItems(success,failure) 
{
debugger;
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('" + DocumentlistName+ "')/items?$select=ProjectName,SPCompliance,SPLegal,SPBrand,AXPBrand,TargetMarket,IntendedAudience,ReviewType,DocumentDescription,IsThisAnEmailCommunication,SPAlerts,FileLeafRef,CountryOfOrigin,Status,Created,Modified,id,EncodedAbsUrl,loginuserread,reviewerread&$top=5000&$orderby=Created desc",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
           success(data.d.results);
                
        },
         
        error: function (data) {
        debugger;
            failure(data);
            
        }
        
    });
}

/* Function to get all items from document library on Success */
function GetDocumentItemssuccess(arrayname)
{
debugger;
	var htmltable="";
	if(arrayname.length>null)
    {    	   	
    	$().SPServices({
			operation: "GetGroupCollectionFromUser", 
			userLoginName: $().SPServices.SPGetCurrentUser(), 
			async: false, 
			completefunc: function (xData, Status) { 						
			for(var i=0;i<arrayname.length;i++)
				{
					var createddate=new Date(arrayname[i].Created);
					createddate=(createddate.getMonth() + 1) + '/' + createddate.getDate() + '/' +  createddate.getFullYear();				
					var modifieddate=new Date(arrayname[i].Modified);
					modifieddate=(modifieddate.getMonth() + 1) + '/' + modifieddate.getDate() + '/' +  modifieddate.getFullYear();
					//var test=arrayname[i].EncodedAbsUrl;
					var loginuserread=arrayname[i].loginuserread;
					var loginreviewerread=arrayname[i].reviewerread;
					if(arrayname[i].SPCompliance=="Select")
					{
						arrayname[i].SPCompliance='';
					}
					if(arrayname[i].SPLegal=="Select")
					{
						arrayname[i].SPLegal='';
					}
					if(arrayname[i].SPBrand=="Select")
					{
						arrayname[i].SPBrand='';
					}
					if(arrayname[i].AXPBrand=="Select")
					{
						arrayname[i].AXPBrand='';
					}
					if(arrayname[i].SPAlerts==null)
					{
						arrayname[i].SPAlerts="";
					}
					if(arrayname[i].Status!=null)
			    	   {			    	   		
			    	   		var status=arrayname[i].Status.replace(/\s/g, '')
			    	   		//var status=arrayname[i].Status;
			    	   }
			    	   else
			    	   {
			    	   	var status="";
			    	   }
			    	   if(arrayname[i].DocumentDescription!=null)
			    	   {			    	   		
			    	   		var desrciption=arrayname[i].DocumentDescription;
			    	   }
			    	   else
			    	   {
			    	   	var desrciption="";
			    	   }
			    	  if(arrayname[i].IsThisAnEmailCommunication==true)
			    	   {			    	   		
			    	   		var emailcommunication='Yes';
			    	   }
			    	   else
			    	   {
			    	   var emailcommunication='No';
			    	   }

					htmltable+= '<tr trid='+arrayname[i].Id+'>' ;
					//htmltable+= '<td>'+arrayname[i].FileLeafRef+'</td>';
						htmltable+= '<td>'+arrayname[i].ProjectName+'</td>';				
			    	 if(arrayname[i].Status=="Approved")
			    	    {
			    	    	htmltable+='<td style="text-align:center;color:#008000;"><strong>'+arrayname[i].Status+'</strong></td>';
			    	    }
			    	   else if(arrayname[i].Status=="Awaiting Resubmittal")
			    	    {
			    	    	htmltable+='<td style="text-align:center;color:#006892;"><strong>'+arrayname[i].Status+'</strong></td>';
			    	    }
			    	    else if(arrayname[i].Status=="Resubmitted")
			    	    {
			    	    	htmltable+='<td style="text-align:center;color:#7b1f73;"><strong>'+arrayname[i].Status+'</strong></td>';
			    	    }
			    	    else
			    	    {
			    	    	htmltable+='<td style="text-align:center"><strong>'+arrayname[i].Status+'</strong></td>';

			    	    }

			    	   
			    	   if ($(xData.responseXML).find("Group[Name='Document Owner']").length == 1)
						{
	   						if(loginuserread==0 || loginuserread==null)
	    	    			{
	    	    				htmltable+='<td style="text-align:center" class="msg-notify"><button type="button" class="btn details" onclick=SPGetLibraryItems('+arrayname[i].Id+',"'+ status +'")>Details</button>'+
	    	    			'<button type="button" class="btn message" onclick="SPOpenmessages('+arrayname[i].Id+')">Messages</button></td>';
	    	    			}
	    	    			else
	    	    			{
	    	    				htmltable+='<td style="text-align:center" class="msg-notify"><button type="button" class="btn details" onclick=SPGetLibraryItems('+arrayname[i].Id+',"'+ status +'")>Details</button>'+
	    	    			'<button type="button" class="btn message" onclick="SPOpenmessages('+arrayname[i].Id+')">Messages</button><span id="usernotification" class="SPshap">'+loginuserread+'</span></td>';
	    	    			}									    	    						 		    	   						    	   							
						} 
						else if($(xData.responseXML).find("Group[Name='SP Process Manager']").length == 1 || $(xData.responseXML).find("Group[Name='SP Legal Team']").length == 1 || $(xData.responseXML).find("Group[Name='SP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='AXP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='SP Compliance Team']").length == 1)
						{	
    						if(loginreviewerread==0 || loginreviewerread==null)
	    	    			{
	    	    				htmltable+='<td style="text-align:center" class="msg-notify"><button type="button" class="btn details" onclick=SPGetLibraryItems('+arrayname[i].Id+',"'+ status +'")>Details</button>'+
	    	    			'<button type="button" class="btn message" onclick="SPOpenmessages('+arrayname[i].Id+')">Messages</button></td>';
	    	    			}
	    	    			else
	    	    			{
	    	    				htmltable+='<td style="text-align:center"  class="msg-notify"><button type="button" class="btn details" onclick=SPGetLibraryItems('+arrayname[i].Id+',"'+ status +'")>Details</button>'+
	    	    			'<button type="button" class="btn message" onclick="SPOpenmessages('+arrayname[i].Id+')">Messages</button><span id="reviewernotification" class="SPshap">'+loginreviewerread+'</span></td>';
	    	    			}
						}
						htmltable+='<td>'+createddate+'</td>'+
							'<td>'+modifieddate+'</td>'+							
							'<td>'+arrayname[i].SPCompliance+'</td>'+
	    	    			'<td>'+arrayname[i].SPLegal+'</td>'+
	    	    			'<td>'+arrayname[i].SPBrand+'</td>'+
	    	    			'<td>'+arrayname[i].AXPBrand+'</td>'+
	    	    			'<td class="td-color" style="text-align:center">'+arrayname[i].SPAlerts+'</td>'+
	    	    			'<td style="display:none">'+arrayname[i].TargetMarket+'</td>'+
	    	    			'<td style="display:none">'+arrayname[i].IntendedAudience+'</td>'+
	    	    			'<td style="display:none">'+arrayname[i].ReviewType+'</td>'+
	    	    			'<td style="display:none">'+desrciption+'</td>'+
	    	    			'<td style="display:none">'+emailcommunication+'</td>'+ 
							'</tr>' ; 
				}												
		}					
	});
	
    	   $("#testtable").empty().append(htmltable);
    	   pager.init(); 
        pager.showPageNav('pager', 'pageNavPosition'); 
        pager.showPage(1);
        
    }
    $.hideLoading();         	
}
/* Function to get all items document library on failure */
function GetDocumentItemsfailure()
{
debugger;
 $.hideLoading();	
}
/* #Endregion - Function to get all list items from  document library*/


/*Opening submit document popup*/
function SPsubmitdocument()
{
debugger;

	$("#SPmyModalUploadDoc").modal({backdrop: 'static', keyboard: false});
	$("#emailcommnctnYES").hide();
	$("#projectnameid").val('');
	$("input:radio").attr("checked", false);
	
	
	$('#projectnameid').removeClass("error")
	$('#Countryid').removeClass("error");
	$('#marketid').removeClass("error");
	$('#audienceid').removeClass("error");
	$('#Reviewid').removeClass("error");	
	SPdropdownglbl=false;
	SPGetDocumentItemsForDropDown(DropDownvaluessuccess,DropDownvaluesfailure);	
}

 
/* Function to getting all dropdown items from library*/
 function SPGetDocumentItemsForDropDown(success,failure)
 {
 	 $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('" + DocumentlistName+ "')/fields?$filter=EntityPropertyName eq 'CountryOfOrigin' or EntityPropertyName eq 'TargetMarket' or EntityPropertyName eq 'IntendedAudience' or EntityPropertyName eq 'ReviewType' or EntityPropertyName eq 'AudienceSize' or EntityPropertyName eq 'EmailMarketing'",

        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
           //success(data.d.results);
            success(data.d.results);    
        },
         
        error: function (data) {
        debugger;
            failure(data);
            
        }
        });

 }
 
/* Function to getting all dropdown items from library success*/
function DropDownvaluessuccess(Dropdownarray)
{
	debugger;
	 
	 if(Dropdownarray.length>0)
	 {
	 	var countryoforigindropdown='';
	 	var targetmarketingdropdown='';
	 	var Intendedaudiencedropdown='';
	 	var ReviewTypedropdown='';
	 	//var Audiencesizedropdown='';
	 	var Emailmarketingdropdown='';
	 	
	 		var countryoforigin=Dropdownarray[0].Choices.results;
	 		var targetmarketing=Dropdownarray[1].Choices.results;
	 		var Intendedaudience=Dropdownarray[2].Choices.results;
	 		var ReviewType=Dropdownarray[3].Choices.results;
	 		//var Audiencesize=Dropdownarray[4].Choices.results;
	 		var Emailmarketing=Dropdownarray[5].Choices.results;
	 		
	 		for(var i=0;i<countryoforigin.length;i++)
	 		{
	 			if(countryoforigin[i]==SPpreviewdropdownvalues.CountryOfOrigin)
	 			{
	 				countryoforigindropdown+='<option value='+i+' Selected >'+countryoforigin[i]+'</option>';
	 			}
	 			else
	 			{
	 				countryoforigindropdown+='<option value='+i+'>'+countryoforigin[i]+'</option>';
	 			}
	 		}
	 		for(var i=0;i<targetmarketing.length;i++)
	 		{
	 			if(targetmarketing[i]==SPpreviewdropdownvalues.TargetMarket)
	 			{
	 				targetmarketingdropdown+='<option value='+i+' Selected >'+targetmarketing[i]+'</option>';
	 			}
	 			else
	 			{
	 				targetmarketingdropdown+='<option value='+i+'>'+targetmarketing[i]+'</option>';
	 			}
	 		}
	 		for(var i=0;i<Intendedaudience.length;i++)
	 		{
	 			if(Intendedaudience[i]==SPpreviewdropdownvalues.IntendedAudience)
	 			{
	 				Intendedaudiencedropdown+='<option value='+i+' Selected >'+Intendedaudience[i]+'</option>';
	 			}
	 			else
	 			{
	 				Intendedaudiencedropdown+='<option value='+i+'>'+Intendedaudience[i]+'</option>';
	 			}
	 		}
	 		for(var i=0;i<ReviewType.length;i++)
	 		{
	 			if(ReviewType[i]==SPpreviewdropdownvalues.ReviewType)
	 			{
	 				ReviewTypedropdown+='<option value='+i+' Selected >'+ReviewType[i]+'</option>';
	 			}
	 			else
	 			{
	 				ReviewTypedropdown+='<option value='+i+'>'+ReviewType[i]+'</option>';
	 			}
	 		}
	 		/*for(var i=0;i<Audiencesize.length;i++)
	 		{
	 			Audiencesizedropdown+='<option value="">'+Audiencesize[i]+'</option>';
	 		}*/
	 		for(var i=0;i<Emailmarketing.length;i++)
	 		{
	 			if(Emailmarketing[i]==SPpreviewdropdownvalues.EmailMarketing)
	 			{
	 				Emailmarketingdropdown+='<option value='+i+' Selected >'+Emailmarketing[i]+'</option>';
	 			}
	 			else
	 			{
	 				Emailmarketingdropdown+='<option value='+i+'>'+Emailmarketing[i]+'</option>';
	 			}
	 		}

		if(SPdropdownglbl==true)
		{
			$("#CountryidEdit").empty().append(countryoforigindropdown);
		 	$("#marketidEdit").empty().append(targetmarketingdropdown);
		 	$("#audienceidEdit").empty().append(Intendedaudiencedropdown);
		 	$("#ReviewidEdit").empty().append(ReviewTypedropdown);
		 	//$("#audiencesizeidEdit").empty().append(Audiencesizedropdown);
		 	$("#EmailmarktngidEdit").empty().append(Emailmarketingdropdown);
		}
		else
		{
		 	$("#Countryid").empty().append(countryoforigindropdown);
		 	$("#marketid").empty().append(targetmarketingdropdown);
		 	$("#audienceid").empty().append(Intendedaudiencedropdown);
		 	$("#Reviewid").empty().append(ReviewTypedropdown);
		 	//$("#audiencesizeid").empty().append(Audiencesizedropdown);
		 	$("#Emailmarktngid").empty().append(Emailmarketingdropdown);
		 }
	 }	 	 
}

/* Function to getting all dropdown items from library on failure*/ 
function DropDownvaluesfailure()
{
	debugger; 
}



/*On page load first running Js */
SP.SOD.executeFunc('sp.js', 'SP.ClientContext');


/* #Region - Function to Creating an item in library */
  function uploadFile(){
 $.showLoading({
  			name: 'circle-turn'
  		});
    if (document.getElementById("inputFile").files.length === 0) {
        alert('No file was selected');
        $.hideLoading();         
        return;       
    }
    var parts = document.getElementById("inputFile").value.split("\\");
    var filename = parts[parts.length - 1];
    var file = document.getElementById("inputFile").files[0];
    uploadFileSync(siteURL, DocumentlistName, filename, file,uploadFilesuccess,uploadFilefailure);
}

/*Upload file synchronously*/
function uploadFileSync(spWebUrl , DocumentlistName, filename, file,success,failure) 
{
debugger;    
    var reader = new FileReader();
    reader.onloadend = function(evt) 
    {
      if (evt.target.readyState == FileReader.DONE) 
      {
         var buffer = evt.target.result;
         var completeUrl = spWebUrl
           + "/_api/web/lists/getByTitle('"+ DocumentlistName+ "')"
           + "/RootFolder/Files/add(url='"+ filename +"',overwrite='true')?"
           + "@TargetLibrary='"+DocumentlistName+"'&@TargetFileName='"+ filename +"'";
                      
            $.ajax({
                url: completeUrl,
                type: "POST",
                data: buffer,
                async: true,
                processData: false,
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    //s"content-length": buffer.byteLength
                },
                complete: function (data) {
                debugger;
                    success(data);
                },
                error: function (err) {
                debugger;
                      failure(data);
                }
        });
      }
    };
    reader.readAsArrayBuffer(file);
}
/*Upload file synchronously success*/
function uploadFilesuccess(data)
{
	debugger;
	GetListItems(getListItemssuccess,getListItemsfailure);
}
/*Upload file synchronously failure*/
function uploadFilefailure()
{
	 $.hideLoading();
}
/*#Region - Function to get uploaded document ID */

 function GetListItems(success,failure) {
debugger;
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('" + DocumentlistName+ "')/items",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            ;
            if(data!=null)
            {
            	for(var i=0;i<data.d.results.length;i++)
            	{
            		if(data.d.results.length==i+1)
            		{
            			success(data.d.results[i].ID);
            			//alert(data.d.results[i].ID);
            		}            		            		
            	}
            }                 
        },
        error: function (data) {
        debugger;
            failure(data);           
        }
    });
}
var SPrecentDocId="";
/*Getting  uploaded document ID success*/
function getListItemssuccess(obj)
{
debugger;
	SPrecentDocId=obj;
	if(resubmitstatus==true)
	{
		UpdateEditedListItem(obj);
	}
	else
	{
		UpdateListItem(obj);
	}
}
/*Getting  uploaded document ID failure*/

function getListItemsfailure()
{
	 $.hideLoading();
}
/*#ENDRegion - Function to get uploaded document ID */

/*Updating list item based on item ID */
function UpdateListItem(id) {
debugger;
	var projectname=$("#projectnameid").val();
	var Countryname=$('#Countryid :selected').text();
	var markettname=$('#marketid :selected').text();
	var audiencename=$('#audienceid :selected').text();
	var Reviewname=$('#Reviewid :selected').text();
	var fromaddress=$("#frmaddressid").val();
	var replyaddess=$("#Rplyaddressid").val();
	var subjectDescription=$("#subjectlineid").val();
	var audienceSize=$('#audiencesizeid').val();
	var emailmarketing=$('#Emailmarktngid :selected').text();		
	var Description=$("#decriptnid").val();		
	var AddNewNotes=$("#addnewnotesid").val();
	var status="Submitted";
	var communicationid=$('#radioid').is(':checked');
	if(Countryname=="Select")
	{		
		$('#Countryid').addClass("error");									 
	}
	else
	{
		$('#Countryid').removeClass("error");
	}
	if(markettname=="Select")
	{
		$('#marketid').addClass("error");
	}
	else
	{
		$('#marketid').removeClass("error");
	}
	if(audiencename=="Select")
	{
		$('#audienceid').addClass("error");
	}
	else
	{
		$('#audienceid').removeClass("error");
	}
	if(Reviewname=="Select")
	{
		$('#Reviewid').addClass("error");
	}
	else
	{
		$('#Reviewid').removeClass("error");
	}
	if(projectname=="")
	{
		$("#projectnameid").addClass("error");
	}
	else
	{
		$("#projectnameid").removeClass("error");
	}
		

	if(communicationid==true)
	{
		//communicationid="Yes";
		if(audienceSize=="")
		{						
			$('#audiencesizeid').addClass("error");												
		}
		else
		{
			$('#audiencesizeid').removeClass("error");	
		}
		if(emailmarketing=="Select")
		{
			$('#Emailmarktngid').addClass("error");
		}
		else
		{
			$('#Emailmarktngid').removeClass("error");	
		}
		if(fromaddress=="")
		{
			$("#frmaddressid").addClass("error");
		}
		else
		{
			$("#frmaddressid").removeClass("error");	
		}
		if(replyaddess=="")
		{
			$("#Rplyaddressid").addClass("error");
		}
		else
		{
			$("#Rplyaddressid").removeClass("error");	
		}
		if(subjectDescription=="")
		{
			$("#subjectlineid").addClass("error");
		}
		else
		{
			$("#subjectlineid").removeClass("error");	
		}
		if(audienceSize=="" || emailmarketing=="Select" || fromaddress=="" || replyaddess=="" || subjectDescription=="" || Countryname=="Select" ||markettname=="Select" ||audiencename=="Select" || Reviewname=="Select" || projectname=="")
			{
				
					SPDeleteListitem();					
				$.hideLoading();
				alert("Please Fill All Mandatory Values");
				return false;
			}			
	}
	if(Countryname=="Select" ||markettname=="Select" ||audiencename=="Select" || Reviewname=="Select" || projectname=="")
		{
			SPDeleteListitem();
			$.hideLoading();
			alert("Please Fill All Mandatory Values");
			return false;
		}
	
	var clientContext = new SP.ClientContext(siteURL);
    var oList = clientContext.get_web().get_lists().getByTitle(DocumentlistName);

    this.oListItem = oList.getItemById(id);
    oListItem.set_item('Status', status);
	oListItem.set_item('ProjectName', projectname);
	oListItem.set_item('CountryOfOrigin', Countryname);
	oListItem.set_item('TargetMarket', markettname);
	oListItem.set_item('IntendedAudience', audiencename);
	oListItem.set_item('ReviewType', Reviewname);
	oListItem.set_item('FromAddress', fromaddress);
	oListItem.set_item('RplyToAddress', replyaddess);
	oListItem.set_item('IsThisAnEmailCommunication', communicationid);
	oListItem.set_item('CompleteSubjectLine', subjectDescription);
	oListItem.set_item('AudienceSize', audienceSize);
	oListItem.set_item('EmailMarketing', emailmarketing );
	oListItem.set_item('AddNewNotes', AddNewNotes);
	oListItem.set_item('DocumentDescription', Description);
	
    oListItem.update();

    clientContext.executeQueryAsync(Function.createDelegate(this, this.SPonQuerySucceeded), Function.createDelegate(this, this.SPonQueryFailed));
}
/*Updating list item based on item ID success*/
function SPonQuerySucceeded() {
debugger;
   
    var projectname=$("#inputFile").val("");
    var projectname=$("#inputFile1").val("");

    var projectname=$("#projectnameid").val("");
    var countryname=$("#Countryid").prop('selectedIndex',0);
	var markettname=$("#marketid").prop('selectedIndex',0);
	var audiencename=$('#audienceid').prop('selectedIndex',0);
	var Reviewname=$('#Reviewid').prop('selectedIndex',0);
	var fromaddress=$("#frmaddressid").val("");
	var replyaddess=$("#Rplyaddressid").val("");
	//var audienceSize=$('#audiencesizeid').prop('selectedIndex',0);
	var audienceSize=$('#audiencesizeid').val("");
	var communicationid=$("#radioid").removeAttr('checked');
	var Description=$("#decriptnid").val("");
	var Description=$("#subjectlineid").val("");
	var emailmarketing=$('#Emailmarktngid').prop('selectedIndex',0);
	$("#addnewnotesid").val("");
	GetDocumentItems(GetDocumentItemssuccess,GetDocumentItemsfailure);
	$("#SPmyModalUploadDoc").modal('hide');
	$('#conformtionpopup').modal({backdrop: 'static', keyboard: false });
	 $.hideLoading();
	
}
/*Updating list item based on item ID failure*/

function SPonQueryFailed(sender, args) {

    debugger; 
    if(SPrecentDocId!=0)
    {
    	 SPDeleteListitem();
    }
    $.hideLoading();
}
/* #ENDregion - Function to Creating an item in library */


/* Deleting partially created item starts*/
function SPDeleteListitem()
{
debugger;
	 $.ajax({
   	url:siteURL+ "/_api/web/lists/GetByTitle('" + DocumentlistName+ "')/items('"+SPrecentDocId+"')",
    type: "POST",
    headers: {
               "Accept": "application/json;odata=verbose",
               "content-type": "application/json; odata=verbose",
               "X-RequestDigest": $("#__REQUESTDIGEST").val(),
               "X-HTTP-Method": "DELETE",
               "If-Match": "*"
              } ,
    success: function(data){
        //alert("Item deleted successfully!");
      },
    error: function(err){
      //alert("Error while deleting item: " + JSON.stringify(err));
    }      
});
}
/* deleting partially created item ends */

/*Submiting another document*/
function submitanother()
{
debugger;	
	$('#conformtionpopup').remove();
	$('#SPmyModalUploadDoc').modal();
}

/*Function to Show all chat messages from discussion list*/

function SPOpenmessages(idofdoc)
{
	debugger;
	$.showLoading({
  			name: 'circle-turn'
  		});	
	$('#myModalmessages').modal({backdrop: 'static', keyboard: false});
	$("#msgesconent").empty();
	$("#descriptionid").val("");
	$('#SPcloseid').attr("data-dismiss","modal");
	$('#SPcloseid').text("Close");	
	documentId=idofdoc;	
	Getdiscussions(documentId,SPDiscussionlist, siteURL,Getdiscussionssuccess,Getdiscussionsfailure);
	$("#lookupdocid").text(idofdoc);
	SPgetpermissionsOnclickOpenMsg(documentId);
	//setInterval(function(){Getdiscussions(documentId,SPDiscussionlist, siteURL,Getdiscussionssuccess,Getdiscussionsfailure); }, 1000);				
}
/*For notification checking login user permissions  */
function SPgetpermissionsOnclickOpenMsg(documentId)
{
debugger;
$().SPServices({
	operation: "GetGroupCollectionFromUser", 
	userLoginName: $().SPServices.SPGetCurrentUser(), 
	async: false, 
	completefunc: function (xData, Status) { 
				var testcolumn=0;
		if ($(xData.responseXML).find("Group[Name='Document Owner']").length == 1)
		{ 
			$("#usernotification").text("");
			$("#usernotification").removeClass("SPshap");
			var ColumnName="loginuserread";
			updateSPDocumentList(ColumnName,documentId,testcolumn); 
		} 
	 else if($(xData.responseXML).find("Group[Name='SP Process Manager']").length == 1 || $(xData.responseXML).find("Group[Name='SP Legal Team']").length == 1 || $(xData.responseXML).find("Group[Name='SP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='AXP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='SP Compliance Team']").length == 1)
		//else
		{ 
			$("#reviewernotification").text("");
			$("#reviewernotification").removeClass("SPshap");
			var ColumnName="reviewerread";
			updateSPDocumentList(ColumnName,documentId,testcolumn);
		}
	}
 }); 
}

/*Getting all messages from discussion board */
function Getdiscussions(documentId,SPDiscussionlist, siteURL,success,failure) {
debugger;
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('" + SPDiscussionlist+ "')/items?$select=Author/Name,Body,id,Created&$expand=Author&$filter=Documentlookup eq'"+documentId+"'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
        debugger;
           success(data.d.results);     
        },
        error: function (data) {
        debugger;
            failure(data);
            
        }
    });
}
/*Getting all messages from discussion board success */
function Getdiscussionssuccess(results)
{
	debugger;	
	var messagearray=new Array();
	messagearray=results;
	var messageshtml=""
	var SPmessagesowner=""
	if(messagearray.length>0)
	{
		
		for(var i=0;i<messagearray.length;i++)
		{				
			if(messagearray[i].Author.Name!=null)
			{
				var discussionby=messagearray[i].Author.Name.split('|')[2];
				var resultdiscussionby=discussionby.split('@')[0];
			}
			else
			{
				var discussionby="";
			}
			if(messagearray[i].Body!=null)
			{
				var discusinbody=messagearray[i].Body.split('>')[1];
				var resultdiscusinbody=discusinbody.split('<')[0];
			}
			else
			{
				var resultdiscusinbody="";
			}
			if(messagearray[i].Created!=null)
			{
				//var discussionbydate=messagearray[i].Created.split('T')[0];
				var discussionbydate=new Date(messagearray[i].Created);
					discussionbydate=(discussionbydate.getMonth() + 1) + '/' + discussionbydate.getDate() + '/' +  discussionbydate.getFullYear();
			}
			else
			{
				var discussionbydate="";
			}												
				if((i%2)!= 0)
				{
					messageshtml+=	'<div class="Bodymargin">'+																		
									'<p>'+resultdiscussionby+'</p>'+
									'<p>'+resultdiscusinbody+'</p>'+
									'<p>'+discussionbydate+'</p>'+
								'</div>';
				}
				else
				{
					messageshtml+=	'<div class="Bodymargin">'+																												
									'<div class="text-bg-color">'+
									'<p>'+resultdiscussionby+'</p>'+
									'<p>'+resultdiscusinbody+'</p>'+
									'</div>'+
									'<div class="authorcls">'+								
									'<p>'+discussionbydate+'</p>'+
									'</div>'+
								'</div>';
				}
				
		}
		
		$("#msgesconent").empty().append(messageshtml);
		
	}
		SPmessagesowner+='<div class="pro-img-popup"> <img src="/Style Library/SP/css/Img.png"> </div>'+
				                    '<div class="tab-name">'+
				                      '<h5>'+loginusername+'</h5>'+
				                      //'<h6>Compliance Manager</h6>'+
				                      '</div>';
		                      
		$(".left-list-poup").empty().append(SPmessagesowner);
		// $.hideLoading();
}
/*Getting all messages from discussion board failure */
function Getdiscussionsfailure()
{
	debugger;
	 //$.hideLoading();
}


/* Creating new message in discussion board*/
function Submitmessage() {
	debugger;
	
	var message=$("#descriptionid").val().trim();
	if(message=="")
	{
		alert("Please enter message");
		return false;
	}
	var doclookupid=$("#lookupdocid").text();
    var clientContext = new SP.ClientContext(siteURL);
    var oList = clientContext.get_web().get_lists().getByTitle(SPDiscussionlist);        
    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);
     var lookupVar = new SP.FieldLookupValue();
	lookupVar.set_lookupId(doclookupid);	
    oListItem.set_item('Title', 'My disscussion!');
    oListItem.set_item('Body', message);
   // oListItem.set_item('Name', _spPageContextInfo.userId);
    oListItem.set_item('Documentlookup', lookupVar);       
    oListItem.update();
    clientContext.load(oListItem);        
    clientContext.executeQueryAsync(Function.createDelegate(this, this.SPonQuerySucceededmessg), Function.createDelegate(this, this.SPonQueryFailedmessg));
}
/* Creating new message in discussion board success*/
function SPonQuerySucceededmessg() {
debugger;
    $("#descriptionid").val("");
    $('#SPcloseid').text("Close");
    Getdiscussions(documentId,SPDiscussionlist, siteURL,Getdiscussionssuccess,Getdiscussionsfailure)
   // getListItemswithid(documentId,DocumentlistName, siteURL,getItemssuccesswithId,getListItemsfailurewithId);
   SPgetpermissionsOnclickSubmitMsg(documentId);    
}
/* Creating new message in discussion board failure*/
function SPonQueryFailedmessg(sender, args) {

   debugger; 
}
/*Getting login user permissions */
function SPgetpermissionsOnclickSubmitMsg(documentId)
{
	debugger;
	SPgetListItemswithid(documentId,DocumentlistName, siteURL,SPgetItemssuccesswithId,SPgetListItemsfailurewithId);	 
}


var documentid=""
/*Getting list items based item ID*/
function SPGetLibraryItems(docid,status)
{
	debugger;
	$.showLoading({
	  name: 'circle-turn'
	});
	/*if(status=="AwaitingResubmittal")
	{
		$('li#resubmitcls').show();
	}
	else
	{
		$('li#resubmitcls').hide();
	}*/

	documentid=docid
	$('#myModalDetails').modal({backdrop: 'static', keyboard: false});
	$("#informationid").empty()	;
	$("#emailid").empty();
	$("#departmntid").empty();
	//$("#modal-footer").hide();
	Getdetails();
	//GetALLlibraryItems(docid,DocumentlistName, siteURL,GetALLlibraryItemsSuccess,GetALLlibraryItemsFailure);
}
/* #Region - Function to get list data based on id*/

function GetALLlibraryItems(docid,listName, siteURL,success,failure) {
debugger;
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('" + listName + "')/items("+docid+")?$select=SPCompliance,SPLegal,SPBrand,AXPBrand,Created,DocumentDescription,ProjectName,Modified,FromAddress,RplyToAddress,CompleteSubjectLine,Author/Name,EmailMarketing,IsThisAnEmailCommunication,CountryOfOrigin,IntendedAudience,TargetMarket,AudienceSize,ReviewType,EncodedAbsUrl,ID&$expand=Author",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            	success(data.d);
            	//alert(url);             
        },
        error: function (data) {
        debugger;
            failure(data);            
        }
    });
}
/*Function to get list data based on id success*/
function GetALLlibraryItemsSuccess(data)
{
debugger;
	var libraryitemsarray=new Array();
	libraryitemsarray=data;
	if(libraryitemsarray.Created!=null)
	{
		//var createddate=libraryitemsarray.Created.split('T')[0];
		var createddate=new Date(libraryitemsarray.Created);
					createddate=(createddate.getMonth() + 1) + '/' + createddate.getDate() + '/' +  createddate.getFullYear();
	}
	else
	{
		var createddate="";
	}
	if(libraryitemsarray.Modified!=null)
	{
		//var modifieddate=libraryitemsarray.Modified.split('T')[0];
		var modifieddate=new Date(libraryitemsarray.Modified);
		modifieddate=(modifieddate.getMonth() + 1) + '/' + modifieddate.getDate() + '/' +  modifieddate.getFullYear();
	}
	else
	{
		var modifieddate="";
	}
	if(libraryitemsarray.Author.Name!=null && libraryitemsarray.Author.Name!="undefined")
	{
		var author=libraryitemsarray.Author.Name.split('|')[2];
		var resultauthor=author.split('@')[0];
	}
	else
	{
		var author="";
	}
	if(libraryitemsarray.EncodedAbsUrl!=null)
	{
		var folderlocation=libraryitemsarray.EncodedAbsUrl.split('/')[4];
		//var resultfolderlocation=
	}
	else
	{
		var folderlocation="";
	}
	if(libraryitemsarray.FromAddress!=null)
	{
		var FromAddress=libraryitemsarray.FromAddress;
	}
	else
	{
		var FromAddress="";
	}
	if(libraryitemsarray.RplyToAddress!=null)
	{
		var RplyToAddress=libraryitemsarray.RplyToAddress;
	}
	else
	{
		var RplyToAddress="";
	}
	if(libraryitemsarray.CompleteSubjectLine!=null)
	{
		var CompleteSubjectLine=libraryitemsarray.CompleteSubjectLine;
	}
	else
	{
		var CompleteSubjectLine="";
	}
	if(libraryitemsarray.EmailMarketing!=null && libraryitemsarray.EmailMarketing!="Select")
	{
		var EmailMarketing=libraryitemsarray.EmailMarketing;
	}
	else
	{
		var EmailMarketing="";
	}
	if(libraryitemsarray.CountryOfOrigin!=null)
	{
		var CountryOfOrigin=libraryitemsarray.CountryOfOrigin;
	}
	else
	{
		var CountryOfOrigin="";
	}
	if(libraryitemsarray.IntendedAudience!=null)
	{
		var IntendedAudience=libraryitemsarray.IntendedAudience;
	}
	else
	{
		var IntendedAudience="";
	}
	if(libraryitemsarray.TargetMarket!=null)
	{
		var TargetMarket=libraryitemsarray.TargetMarket;
	}
	else
	{
		var TargetMarket="";
	}
	if(libraryitemsarray.AudienceSize!=null && libraryitemsarray.AudienceSize!="Select")
	{
		var AudienceSize=libraryitemsarray.AudienceSize;
	}
	else
	{
		var AudienceSize="";
	}
	if(libraryitemsarray.ReviewType!=null)
	{
		var ReviewType=libraryitemsarray.ReviewType;
	}
	else
	{
		var ReviewType="";
	}
	if(libraryitemsarray.SPCompliance!=null && libraryitemsarray.SPCompliance!="Select")
	{
		var SPCompliance=libraryitemsarray.SPCompliance;
	}
	else
	{
		var SPCompliance="";
	}
	if(libraryitemsarray.SPLegal!=null && libraryitemsarray.SPLegal!="Select")
	{
		var SPLegal=libraryitemsarray.SPLegal;
	}
	else
	{
		var SPLegal="";
	}
	if(libraryitemsarray.SPBrand!=null && libraryitemsarray.SPBrand!="Select")
	{
		var SPBrand=libraryitemsarray.SPBrand;
	}
	else
	{
		var SPBrand="";
	}
	if(libraryitemsarray.AXPBrand!=null && libraryitemsarray.AXPBrand!="Select")
	{
		var AXPBrand=libraryitemsarray.AXPBrand;
	}
	else
	{
		var AXPBrand="";
	}

 
	var Informationhtml=	'<h6>Information : </h6>'+		
	    '<span class="sapn-text" id="submiteddate"><strong>Date submitted </strong>'+createddate+'</span>'+
	     '<span class="sapn-text" id="lastactivitydate"><strong>Last activity </strong>'+modifieddate+'</span>'+ 
	     '<span class="sapn-text" id="submitdby"><strong>Submitted by </strong>'+resultauthor+'</span> '+
	     '<span class="sapn-text" ><strong>Folder location :</strong>'+folderlocation+'</span>';
	     
	var Emailhtml=     '<h6>Email :</h6>'+
	     '<span class="sapn-text" id="Emailfrom"><strong>From address </strong>'+FromAddress+'</span>'+
	     '<span class="sapn-text" id="EmailTo"><strong>Reply-to address </strong>'+RplyToAddress+'</span>'+ 
	     '<span class="sapn-text" id="subjectLine"><strong>Subject line </strong>'+CompleteSubjectLine+'</span>'+ 
	     '<span class="sapn-text" id="emailtarget"><strong>Email platform </strong>'+EmailMarketing+'</span>';
	
	var Departmenthtml=  '<h6>Department information :</h6>'+
	 '<span class="sapn-text" ><strong>SP compliance </strong>'+SPCompliance+'</span>'+
	     '<span class="sapn-text" ><strong>SP legal</strong>'+SPLegal+'</span>' +
	     '<span class="sapn-text" ><strong>SP brand</strong>'+SPBrand+'</span>' +
	     '<span class="sapn-text" ><strong>AXP brand</strong>'+AXPBrand+'</span>'+

	 '<span class="sapn-text" id="Countryid"><strong>Country of origin </strong>'+CountryOfOrigin+'</span>'+
	     '<span class="sapn-text" id="marketid"><strong>Target market </strong>'+TargetMarket+'</span>' +
	     '<span class="sapn-text" id="audienceid"><strong>Intended audience </strong>'+IntendedAudience+'</span>' +
	     '<span class="sapn-text" id="audiencesizeid"><strong>Audience size </strong>'+AudienceSize+'</span>'+
	     '<span class="sapn-text" id="reviewtypeid"><strong>Review type </strong>'+ReviewType+'</span> ';
	$("#informationid").empty().append(Informationhtml) ;
	$("#emailid").empty().append(Emailhtml);
	$("#departmntid").empty().append(Departmenthtml)
	$.hideLoading();                                       		         		            		           	 
}
/*Function to get list data based on id failure*/
function GetALLlibraryItemsFailure()
{
debugger;
	//alert("failure");
	$.hideLoading();
}
/* #Endregion - Function to get list data based on id */
/*Getting history of document */
function Gethistory()
{
	debugger;
	$("#detailscls").addClass("active");
	$("#historycls").removeClass("active");
	$("#resubmitcls").removeClass("active");
	
	$("#informationid").empty()	;
	$("#emailid").empty();
	$("#departmntid").empty();
	$("#uploadfile").hide() ;
	$("#detialsdiv").show() ;	
	$("#footerid").hide();
	Historydetails(documentid,HistorydetailsSuccess,HistorydetailsFailure);
}
/*Getting Details of document */
function Getdetails()
{
	debugger;
	$("#detailscls").removeClass("active");
	$("#historycls").addClass("active");
	$("#resubmitcls").removeClass("active");
	
	$("#informationid").empty()	;
	$("#emailid").empty();
	$("#departmntid").empty();
	$("#uploadfile").hide() ;
	$("#detialsdiv").hide() ;
	$("#footerid").hide();
		
	GetALLlibraryItems(documentid,DocumentlistName, siteURL,GetALLlibraryItemsSuccess,GetALLlibraryItemsFailure);
	}
/*Resubmit the document */
function Getresubmit()
{
	debugger;
	$("#detailscls").removeClass("active");
	$("#historycls").removeClass("active");
	$("#resubmitcls").addClass("active");
	
	$("#informationid").empty()	;
	$("#emailid").empty();
	$("#departmntid").empty();
	$("#uploadfile").show() ;
	$("#detialsdiv").hide() ;
	$(".modal-footer").show();	
}

/*Resubmit the file in list */
var resubmitstatus=false;
function Resubmitfile()
{
	//$('#myModalmessages').modal();
	resubmitstatus=true;
	debugger;	
	if (document.getElementById("inputFile1").files.length === 0) {
        alert('No file was selected');
        return;
    }
    var parts = document.getElementById("inputFile1").value.split("\\");
    var filename = parts[parts.length - 1];
    var file = document.getElementById("inputFile1").files[0];
    uploadFileSync(siteURL, DocumentlistName, filename, file,uploadFilesuccess,uploadFilefailure);
}

/*Showing list data in edit mode start */
function Editdocumentdetails()
{
debugger;
	$.showLoading({
	name: 'circle-turn'
	});
	$("#myModalDocEdit").modal();
	var hiddendocid=documentid;
	SPdropdownglbl=true;
	//SPGetDocumentItemsForDropDown(DropDownvaluessuccess,DropDownvaluesfailure);
	GetALLlibraryItems(hiddendocid,DocumentlistName, siteURL,GetItemsForEditSuccess,GetItemsForEditFailure);
}
/*Showing list data in edit mode success */
var SPpreviewdropdownvalues=new Array();
function GetItemsForEditSuccess(data)
{
	debugger;
	//var libraryItemsEdit=new Array();
	SPpreviewdropdownvalues=data;
	var filename=SPpreviewdropdownvalues.EncodedAbsUrl.split('/')[4];
	$("#editfilename").text(filename);
	//$("#inputFile").text(filename)
	$("#projectnameidEdit").val(SPpreviewdropdownvalues.ProjectName);
	$('#CountryidEdit :selected').text(SPpreviewdropdownvalues.CountryOfOrigin);
	$('#marketidEdit :selected').text(SPpreviewdropdownvalues.TargetMarket);
	$('#audienceidEdit :selected').text(SPpreviewdropdownvalues.IntendedAudience);
	$('#ReviewidEdit :selected').text(SPpreviewdropdownvalues.ReviewType);
	$("#decriptnidEdit").val(SPpreviewdropdownvalues.DocumentDescription);
	$("#frmaddressidEdit").val(SPpreviewdropdownvalues.FromAddress);
	$("#RplyaddressidEdit").val(SPpreviewdropdownvalues.RplyToAddress);
	//$('#audiencesizeidEdit :selected').text(SPpreviewdropdownvalues.AudienceSize);
	$('#audiencesizeidEdit').val(SPpreviewdropdownvalues.AudienceSize);
	$('#EmailmarktngidEdit :selected').text(SPpreviewdropdownvalues.EmailMarketing);
	if(SPpreviewdropdownvalues.IsThisAnEmailCommunication==true)
	{
		$('#radioidEdit').attr("checked", true);
		$('#checkemaicomm').show();
	}
	else if(SPpreviewdropdownvalues.IsThisAnEmailCommunication==false)
	{
		$('#radioidEditNO').attr("checked", true);
		$('#checkemaicomm').hide();
	}
	SPGetDocumentItemsForDropDown(DropDownvaluessuccess,DropDownvaluesfailure);
	$.hideLoading();		
}
function GetItemsForEditFailure()
{
	debugger;
}
/*Showing list data in edit mode failure */

function EditeduploadFile()
{
debugger;	
	UpdateEditedListItem(documentid);
}

/*Updating the edited file start */
function UpdateEditedListItem(editeddocid)
{
	var projectname=$("#projectnameidEdit").val();
	var Countryname=$('#CountryidEdit :selected').text();
	var markettname=$('#marketidEdit :selected').text();
	var audiencename=$('#audienceidEdit :selected').text();
	var Reviewname=$('#ReviewidEdit :selected').text();
	var fromaddress=$("#frmaddressidEdit").val();
	var replyaddess=$("#RplyaddressidEdit").val();
	//var audienceSize=$('#audiencesizeidEdit :selected').text();
	var audienceSize=$('#audiencesizeidEdit').val();
	var emailmarketing=$('#EmailmarktngidEdit :selected').text();	
	var communicationid=$('#radioidEdit').is(':checked');
	var communicationidno=$('#radioidEditNO').is(':checked');
	if(communicationid==true)
	{
		communicationid=true;
		//if(audienceSize=="" || emailmarketing=="Select")
		if(audienceSize=="" || emailmarketing=="Select" || fromaddress=="" || replyaddess=="" || subjectDescription=="")
		{
			alert("Please Select All Dropdown Values");
			return false;
		}
	}
	else if(communicationidno==true)
	{
		communicationid=false;
	}
	var Description=$("#decriptnidEdit").val();
	var subjectDescription=$("#subjectlineidEdit").val();	
	var AddNewNotes=$("#addnewnotesidEdit").val();
	
	if(Countryname=="Select" ||markettname=="Select" ||audiencename=="Select" || Reviewname=="Select")
	{
		alert("Please Select All Dropdown Values");
	return false;
	}	
	var clientContext = new SP.ClientContext(siteURL);
    var oList = clientContext.get_web().get_lists().getByTitle(DocumentlistName);

    this.oListItem = oList.getItemById(editeddocid);
	oListItem.set_item('ProjectName', projectname);
	oListItem.set_item('CountryOfOrigin', Countryname);
	oListItem.set_item('TargetMarket', markettname);
	oListItem.set_item('IntendedAudience', audiencename);
	oListItem.set_item('ReviewType', Reviewname);
	oListItem.set_item('FromAddress', fromaddress);
	oListItem.set_item('RplyToAddress', replyaddess);
	oListItem.set_item('IsThisAnEmailCommunication', communicationid);
	oListItem.set_item('CompleteSubjectLine', subjectDescription);
	oListItem.set_item('AudienceSize', audienceSize);
	oListItem.set_item('EmailMarketing', emailmarketing );
	oListItem.set_item('AddNewNotes', AddNewNotes);
	oListItem.set_item('DocumentDescription', Description);
	oListItem.set_item('DocumentDescription', Description);
	oListItem.set_item('Status', "Resubmitted");
    oListItem.update();

    clientContext.executeQueryAsync(Function.createDelegate(this, this.OnQueryEditSucceeded), Function.createDelegate(this, this.OnQueryEditFailed));
}
/*Updating the edited file success */
function OnQueryEditSucceeded()
{
	debugger;
		GetDocumentItems(GetDocumentItemssuccess,GetDocumentItemsfailure);
}
/*Updating the edited file failure */
function OnQueryEditFailed()
{
	debugger;
}
/*updating the edited file end */

/*Getting list data with id*/
function SPgetListItemswithid(documentId,DocumentlistName, siteURL,success,failure)
{
	debugger;
	$.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('" +DocumentlistName+ "')/items?$select=loginuserread,reviewerread&$filter=Id eq'"+documentId+"'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
        debugger;
           success(data.d.results);     
        },
        error: function (data) {
        debugger;
            failure(data);
            
        }
    });
}
/*Getting list data with id success*/
function SPgetItemssuccesswithId(obj)
{
	debugger;
	userno=obj[0].loginuserread;
	reviewrno=obj[0].reviewerread;
	$().SPServices({
	operation: "GetGroupCollectionFromUser", 
	userLoginName: $().SPServices.SPGetCurrentUser(), 
	async: false, 
	completefunc: function (xData, Status) { 
		if ($(xData.responseXML).find("Group[Name='Document Owner']").length == 1)
		{ 
			var ColumnName="reviewerread";
			if(reviewrno==null)
			{
				reviewrno=0;
			}
			var testcolumn=reviewrno+1;
		} 
		else if($(xData.responseXML).find("Group[Name='SP Process Manager']").length == 1 || $(xData.responseXML).find("Group[Name='SP Legal Team']").length == 1 || $(xData.responseXML).find("Group[Name='SP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='AXP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='SP Compliance Team']").length == 1)
		{ 
			
			var ColumnName="loginuserread";
			if(userno==null)
			{
				userno=0;
			}
			var testcolumn=userno+1;
			
		}
		updateSPDocumentList(ColumnName,documentId,testcolumn);
	}
 });
}
/*Getting list data with id failure*/
function SPgetListItemsfailurewithId()
{
	debugger;
}

/*Updating the library for internal status for the purpose of workflow */
function updateSPDocumentList(ColumnName,id,testcolumn) 
{
debugger;
    var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle(DocumentlistName);
    this.oListItem = oList.getItemById(id);
	oListItem.set_item(ColumnName, testcolumn);
	//oListItem.set_item("InternalStatus", testcolumn);
	oListItem.set_item('InternalstatusNew', "True");
    oListItem.update();
    clientContext.executeQueryAsync(Function.createDelegate(this, this.SPNotificationonQuerySucceeded), Function.createDelegate(this, this.SPNotificationononQueryFailed));
}
/*Updating the library for internal status for the purpose of workflow success*/
function SPNotificationonQuerySucceeded() {
debugger;
$.hideLoading();
}
/*Updating the library for internal status for the purpose of workflow failure*/
function SPNotificationononQueryFailed(sender, args) { 
$.hideLoading();   
}


/* Getting question and answer from branding checklist start*/
function SPChecklist()
{
debugger;
$('#checklist').modal();
GetSPBrandingCheckList(GetSPBrandingCheckListSuccess,GetSPBrandingCheckListfailure);
}
/* #Region - Function to get question and answer from branding checklist */
function GetSPBrandingCheckList(success,failure)
{
	debugger;
	var siteURL=_spPageContextInfo.siteAbsoluteUrl;
	$.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('BrandingCheckListSP')/items?$select=Question,Answer",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
           success(data.d.results);    
        },
        error: function (data) {
        debugger;
            failure(data);
            
        }
    });
}
/*Function to get question and answer from branding checklist success */
function GetSPBrandingCheckListSuccess(results)
{
	debugger;
	var questionarray=new Array();
	questionarray=results
	var checklisthtml="";
	if(questionarray.length>0)
	{
		for(var i=0;i<questionarray.length;i++)
		{
			checklisthtml+='<p><h5><strong>'+questionarray[i].Question+'</strong> <br/>'+questionarray[i].Answer+'<em></em><h5></p>';
		}
		$('#SPbrandingchecklist').empty().append(checklisthtml);
	}
}
/*Function to get question and answer from branding checklist failure */
function GetSPBrandingCheckListfailure()
{
	debugger;
	
}

/* #ENDRegion - Function to get question and answer from branding checklist */


/*Changing the submit button to close button and vise-versa */
function SPmyFunction(){
debugger
	$('#SPcloseid').text("Submit");
	} 
function SPChangeattribute()
{
debugger;
	if($('#SPcloseid').text()=="Submit")
	{
		$('#SPcloseid').removeAttr("data-dismiss");
		//previewmessagesglbl=false;
		Submitmessage()
	}
	else if($('#SPcloseid').text()=="Close")
	{
		 $('#SPcloseid').attr("data-dismiss","modal");
	}
}

/*history*/
function Historydetails(documentid,success,failure) 
{

	$.ajax({
        url: siteURL+"/_api/web/lists/getbytitle('"+DocumentlistName+"')/items("+documentid+")?$select=Created,Modified,DocumentDescription,SPCompliance,SPLegal,SPBrand,AXPBrand,AddNewNotes",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) 
		{       
		debugger; 	
 			success(data.d);           
        },
         
        error: function (data) 
		{
		debugger;
            failure(data);           
        }        
    });

}

function HistorydetailsSuccess(data){
debugger;
var SPhistory='';
var historyarray = new Array();
	historyarray = data;
	if(historyarray.Created!=null)
	{
		var Createddatehistory=historyarray.Created.split('T')[0];
	}
	else
	{
		var Createddatehistory='';
	}
	if(historyarray.Modified!=null)
	{
		var Modifieddatehistory=historyarray.Modified.split('T')[0];
	}
	else
	{
		var Modifieddatehistory='';
	}
	if(historyarray.DocumentDescription!=null)
	{
		var DocumentDescriptionhistory=historyarray.DocumentDescription;
	}
	else
	{
		var DocumentDescriptionhistory='';
	}	
	if(historyarray.SPCompliance!=null && historyarray.SPCompliance!="Select")
	{
		var SPcomplincehistory=historyarray.SPCompliance;
	}
	else
	{
		var SPcomplincehistory='';
	}
	if(historyarray.SPLegal!=null && historyarray.SPLegal!="Select")
	{
		var SPLegalhistory=historyarray.SPLegal;
	}
	else
	{
		var SPLegalhistory='';
	}
	if(historyarray.SPBrand!=null && historyarray.SPBrand!="Select")
	{
		var SPBrandhistory=historyarray.SPBrand;
	}
	else
	{
		var SPBrandhistory='';
	}
	if(historyarray.AXPBrand!=null && historyarray.AXPBrand!="Select")
	{
		var AXPBrandhistory=historyarray.AXPBrand;
	}
	else
	{
		var AXPBrandhistory='';
	}
	if(historyarray.AddNewNotes!=null)
	{
		var AddNewNoteshistory=historyarray.AddNewNotes;
	}
	else
	{
		var AddNewNoteshistory='';
	}
	
	SPhistory+='<div class="header-history"><h6>Original upload('+Createddatehistory+')</h6>'+
	'<span>'+DocumentDescriptionhistory+'<span></div>'+
	'<div><h6>Admin response('+Modifieddatehistory+')</h6>'+
	'<span class="sapn-history" ><strong>SP compliance </strong>'+SPcomplincehistory+'</span>'+
	'<span class="sapn-history" ><strong>SP legal</strong>'+SPLegalhistory+'</span>' +
	'<span class="sapn-history" ><strong>SP brand</strong>'+SPBrandhistory+'</span>' +
	'<span class="sapn-history" ><strong>AXP brand</strong>'+AXPBrandhistory+'</span></div>'+
	'<div><h6>User notes('+Modifieddatehistory+')</h6>'+
	'<span>'+AddNewNoteshistory+'</span></div>';

	$('#detialsdiv').empty().append(SPhistory);
	 	
}

function HistorydetailsFailure()
{
	debugger;
	
}

/*history*/


/*#Region - Pagination*/
function Pager(tableName, itemsPerPage) {
debugger;
		this.tableName = tableName;
		this.itemsPerPage = itemsPerPage;
		this.currentPage = 1;
		this.pages = 0;
		this.inited = false;
		this.showRecords = function(from, to) {
		var rows = document.getElementById(tableName).rows;
		for (var i = 1; i < rows.length; i++) {
			if (i < from || i > to)
			rows[i].style.display = 'none';
			else
			rows[i].style.display = '';
		}
	}
	this.showPage = function(pageNumber) {
		if (! this.inited) {
		alert("not inited");
		return;
	}
		var oldPageAnchor = document.getElementById('pg'+this.currentPage);
		oldPageAnchor.className = 'pg-normal';
		this.currentPage = pageNumber;
		var newPageAnchor = document.getElementById('pg'+this.currentPage);
		newPageAnchor.className = 'pg-selected';
		var from = (pageNumber - 1) * itemsPerPage + 1;
		var to = from + itemsPerPage - 1;
		this.showRecords(from, to);
	}
	this.prev = function() {
		if (this.currentPage > 1)
		{
			this.showPage(this.currentPage - 1);
		}
		else
		{
			alert('No records');
		}
	}
	this.next = function() {
		if (this.currentPage<this.pages) {
		this.showPage(this.currentPage + 1);
		}
		else
		{
			alert('No records');
		}
	}
	this.init = function() {
		var rows = document.getElementById(tableName).rows;
		var records = (rows.length - 1);
		this.pages = Math.ceil(records / itemsPerPage);
		this.inited = true;
	}
	this.showPageNav = function(pagerName, positionId) {
		if (! this.inited) {
		alert("not inited");
		return;
	}
		var element = document.getElementById(positionId);
		var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> Prev </span> ';
		for (var page = 1; page <= this.pages; page++)
		pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> ';
		pagerHtml += '<span onclick="'+pagerName+'.next();" class="pg-normal"> Next </span>';
		element.innerHTML = pagerHtml;
		}
}
/*#ENDRegion - Pagination*/


/*#Region - column sorting*/

function sortTable(f,n){
	var rows = $('#SPtableid tbody  tr').get();

	rows.sort(function(a, b) {

		var A = getVal(a);
		var B = getVal(b);

		if(A < B) {
			return -1*f;
		}
		if(A > B) {
			return 1*f;
		}
		return 0;
	});

	function getVal(elm){
		var v = $(elm).children('td').eq(n).text().toUpperCase();
		if($.isNumeric(v)){
			v = parseInt(v,10);
		}
		return v;
	}

	$.each(rows, function(index, row) {
		$('#SPtableid').children('tbody').append(row);
	});
}

/* Multiple user selection in a textarea separated by ','*/
  function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
 
/*#ENDRegion - column sorting*/
    
 /*export to excel*/
function SPExcelReport()
        {
        debugger;        
                 var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
               var textRange; var j=0;
              tab = document.getElementById('SPtableid'); // id of table
             for(j = 0 ; j < tab.rows.length ; j++) 
              {     
                    tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
                    //tab_text=tab_text+"</tr>";
              }
             
              
				/*for(j = 0 ; j < tab.rows.length ; j++) 
				{ 
				    if(tab.rows[j].childNodes.length>0)
				    {
					    for(var k=0;k<tab.rows[j].childNodes.length;k++)
					      {
						      	if(tab.rows[j].childNodes[k].className=="excelbtnhide")
						        {
						        	tab.rows[j].childNodes[k].remove();
						        }
					      }
				    }
					tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
				}*/
              tab_text=tab_text+"</table>";
              //tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
              //tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
                          //tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
						
                   var ua = window.navigator.userAgent;
                  var msie = ua.indexOf("MSIE "); 

                     if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
                        {
                               txtArea1.document.open("txt/html","replace");
                               txtArea1.document.write(tab_text);
                               txtArea1.document.close();
                               txtArea1.focus(); 
                                sa=txtArea1.document.execCommand("SaveAs",true,"Table.xls");
                              }  
                      else                 //other browser not tested on IE 11
                          sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

                          return (sa);                          			                          
                                }

  