
/* Global variable declarations */

var DocumentlistName="SPDocuments"; /*library name*/
var Discussionlist="SPDiscussionBoard"; /*Discussion list*/
var siteurl=_spPageContextInfo.siteAbsoluteUrl; /*current site url*/

var temp="";

/* Function to show SP approver page */

function SPapprovergrid()
{
	debugger;
	$.showLoading({
	name: 'circle-turn'
});
	//$(".excelbtnhide").add();
	$("#JvApprvrGRID").hide();
	$("#TPNapprvergrid").hide();
	$("#SPapprvergrid").show();
		
	
	$("#TPNpageNavPosition").hide();
	$("#JVpageNavPosition").hide();
	$("#SPpageNavPosition").show();
	
	$("#btnExport").attr("onclick","SPExcelReport()");
		
	 SPgetListItemsForApprovers(DocumentlistName, siteurl, SPgetListItemsForApproverssuccess, SPgetListItemsForApproversfailure);
	// SPgetItemsForApproversPaging(topcount,skipcountnew,SPgetListItemsForApproverssuccess, SPgetListItemsForApproversfailure);
}

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





/*Function for adding Additional recipient by Complience team*/
function Compliencerecepient()
{
	debugger;
	if (this.checked)
	 {
		var complienceobj="SPcompliancerecipient"
	 	$('#additinalrecipientpopup').modal('show');
		$("#additionalrecipienttext").empty().append('<textarea class="form-control" id="SPrecipienttext" placeholder="Enter emails here, hit enter when finished..."></textarea>');
	 	$("#recipienttext").val(''); 	
		 	$('#SPrecipienttext').keypress(function (e) {
			debugger;
			 var key = e.which;
			 if(key == 13)  // the enter key code
			  {    
			   	SPupdaterecipient(complienceobj); 
	  			}
			});
	 }
    else
    {
    	$('#additinalrecipientpopup').modal('hide');
    }
}
/*Function for adding Additional recipient by Legal team*/

function legalrecepient()
{
	debugger;
	if (this.checked)
	 {
		var legalobj="SPlegalrecipient"
		$('#additinalrecipientpopup').modal('show');
		$("#additionalrecipienttext").empty().append('<textarea class="form-control" id="SPrecipienttext" placeholder="Enter emails here, hit enter when finished..."></textarea>');
	 	$("#recipienttext").val(''); 	
		 	$('#SPrecipienttext').keypress(function (e) {
			debugger;
			 var key = e.which;
			 if(key == 13)  // the enter key code
			  {    
			   	SPupdaterecipient(legalobj); 
	  			}
			});   
 	}
 	else
 	{
 		$('#additinalrecipientpopup').modal('hide');
 	}
}
/*Function for adding Additional recipient by SPBrand team*/

function SPBrandrecepient()
{
	debugger;
	if (this.checked)
	 {
		var SPBrandobj="SPbrandrecipient"
		$('#additinalrecipientpopup').modal('show');
		$("#additionalrecipienttext").empty().append('<textarea class="form-control" id="SPrecipienttext" placeholder="Enter emails here, hit enter when finished..."></textarea>');
	 	$("#recipienttext").val(''); 	
		 	$('#SPrecipienttext').keypress(function (e) {
			debugger;
			 var key = e.which;
			 if(key == 13)  // the enter key code
			  {    
			   	SPupdaterecipient(SPBrandobj); 
	  			}
			});   
 	 }
 	 else
 	 {
 	 	$('#additinalrecipientpopup').modal('hide');
 	 }
}
/*Function for adding Additional recipient by amexbrand team*/

function AmexBrandrecepient()
{
	debugger;
	if (this.checked)
	 {
		var AmexBrandobj="SPAmexBrandrecipient"
		$('#additinalrecipientpopup').modal('show');
		$("#additionalrecipienttext").empty().append('<textarea class="form-control" id="SPrecipienttext" placeholder="Enter emails here, hit enter when finished..."></textarea>');
	 	$("#recipienttext").val(''); 	
		 	$('#SPrecipienttext').keypress(function (e) {
			debugger;
			 var key = e.which;
			 if(key == 13)  // the enter key code
			  {    
			   	SPupdaterecipient(AmexBrandobj); 
	  			}
			});    
 	 }
 	 else
 	 {
 	 	$('#additinalrecipientpopup').modal('hide');
 	 }
}
/*Function for adding Additional recipient*/

$(document).ready(function(){



$("#SPapprvergrid thead td #proj-filter").click(function(){
debugger;
      showFilterOption(this);
    });

/*add recipient*/ 
$('#previewdetails-right').on('click', '[id^="Compliencecheckboxmargin"]', Compliencerecepient);
$('#previewdetails-right').on('click', '[id^="Legalcheckboxmargin"]', legalrecepient);
$('#previewdetails-right').on('click', '[id^="SPBrandcheckboxmargin"]', SPBrandrecepient);
$('#previewdetails-right').on('click', '[id^="Amexcheckboxmargin"]', AmexBrandrecepient);
});

/* #Region - Function to get All items from document library */
function SPgetListItemsForApprovers(DocumentlistName, siteurl,success,failure) {
debugger;
    $.ajax({
        url: siteurl + "/_api/web/lists/getbytitle('" + DocumentlistName+ "')/items?$select=ProjectName,SPCompliance,SPLegal,SPBrand,AXPBrand,TargetMarket,IntendedAudience,ReviewType,DocumentDescription,IsThisAnEmailCommunication,FileLeafRef,Status,Created,Modified,id,EncodedAbsUrl,Author/Title,loginuserread,reviewerread&$top=5000&$orderby=Created desc&$expand=File,Author",
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

function SPgetListItemsForApproverssuccess(arrayname)
{
debugger;
	//$("#apprvrtable").show();
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
					    	   var documentuploadby=arrayname[i].Author.Title;
					    	   var documenturl=arrayname[i].EncodedAbsUrl;
					    	   var loginuserread=arrayname[i].loginuserread;
								var loginreviewerread=arrayname[i].reviewerread;
								var previewURL=arrayname[i].File.LinkingUri;
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
					    	   if(arrayname[i].DocumentDescription!=null)
					    	   {			    	   		
					    	   		var desrciption=arrayname[i].DocumentDescription;
					    	   }
					    	   else
					    	   {
					    	   	var desrciption="";
					    	   }
					    	   if(arrayname[i].Status!=null)
					    	   {			    	   		
					    	   		var Status=arrayname[i].Status.trim();
					    	   }
					    	   else
					    	   {
					    	   	var Status="";
					    	   }

					    	    if(arrayname[i].IsThisAnEmailCommunication==true)
					    	   {			    	   		
					    	   		var emailcommunication='Yes';
					    	   }
					    	   else
					    	   {
					    	   var emailcommunication='No';
					    	   }					    	   								 
								 htmltable+= '<tr style="background-color:#fff" trid='+documenturl+'>' ;
								 			//'<td><input type="checkbox" name="eventcode" value=588031></td>';
								 			//'<td></td>';
								if(previewURL==null)
								{
									if(Status=="Submitted")
									{
										//htmltable+=	'<td><a class="pointer" onclick=SPDocumentpreview("'+arrayname[i].EncodedAbsUrl+'","'+arrayname[i].Id+'","'+Status+'")>'+arrayname[i].FileLeafRef+'</a></td>';
										htmltable+=	'<td><a class="pointer" onclick=SPDocumentpreview("'+arrayname[i].EncodedAbsUrl+'","'+arrayname[i].Id+'","'+Status+'")>'+arrayname[i].ProjectName+'</a></td>';
 									}
 									else
 									{
										htmltable+=	'<td><a class="pointer" onclick=SPDocumentpreview("'+arrayname[i].EncodedAbsUrl+'","'+arrayname[i].Id+'")>'+arrayname[i].ProjectName+'</a></td>'; 										
 									}
 								}
 								else
 								{
				    	    		if(Status=="Submitted")
									{
				    	    			htmltable+=	'<td><a class="pointer" onclick=SPDocumentpreview("'+previewURL+'","'+arrayname[i].Id+'","'+Status+'")>'+arrayname[i].ProjectName+'</a></td>';
 									}
 									else
 									{
				    	    			htmltable+=	'<td><a class="pointer" onclick=SPDocumentpreview("'+previewURL+'","'+arrayname[i].Id+'")>'+arrayname[i].ProjectName+'</a></td>';
 									}

				    	    	}				    	    	
				    	    	if(arrayname[i].Status=="Approved")
					    	    {
					    	    	htmltable+='<td style="text-align:left;color:#008000;"><strong>'+arrayname[i].Status+'</strong></td>';
					    	    }
					    	   else if(arrayname[i].Status=="Awaiting Resubmittal")
					    	    {
					    	    	htmltable+='<td style="text-align:left;color:#006892;"><strong>'+arrayname[i].Status+'</strong></td>';
					    	    }
					    	    else if(arrayname[i].Status=="Resubmitted")
					    	    {
					    	    	htmltable+='<td style="text-align:left;color:#7b1f73;"><strong>'+arrayname[i].Status+'</strong></td>';
					    	    }
					    	    else
					    	    {
					    	    	htmltable+='<td style="text-align:left"><strong>'+arrayname[i].Status+'</strong></td>';
		
					    	    }

							 if ($(xData.responseXML).find("Group[Name='Document Owner']").length == 1)
								{								 								
			    	    			
									 	htmltable+='<td style="text-align:center"><button type="button" class="btn details" onclick="SPGetLibraryItems('+arrayname[i].Id+')">Details</button>'+	
							 	'<button type="button" class="btn message" onclick="SPopenmessages('+arrayname[i].Id+')">Message</button></td>';				    	    			 	    	    									    	
				    			}
						   //else
						    if($(xData.responseXML).find("Group[Name='SP Process Manager']").length == 1 || $(xData.responseXML).find("Group[Name='SP Legal Team']").length == 1 || $(xData.responseXML).find("Group[Name='SP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='AXP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='SP Compliance Team']").length == 1)
						   //else
						    {
				    	    	if(loginreviewerread==0 || loginreviewerread==null)
							 	{
							 	htmltable+='<td style="text-align:center" class="excelhide"><button type="button" class="btn details" onclick="SPGetLibraryItems('+arrayname[i].Id+')">Details</button>'+		
				    	    	'<button type="button" class="btn message" onclick="SPopenmessages('+arrayname[i].Id+')">Message</button></td>';
				    	    	}
				    	   		 else
				    	    	{
				    	    	htmltable+='<td style="text-align:center" class="excelhide msg-notify"><button type="button" class="btn details" onclick="SPGetLibraryItems('+arrayname[i].Id+')">Details</button>'+
				    	    	'<button type="button" class="btn message" onclick="SPopenmessages('+arrayname[i].Id+')">Message</button><span class="SPappr" id="reviewernotification">'+loginreviewerread+'</span></td>';
				    	    	}					    	    	   	    				    	    			  		          	            		            		
						    }
						    htmltable+=	'<td>'+createddate+'</td>'+
					    	    			'<td>'+documentuploadby+'</td>'+
					    	    			'<td>'+modifieddate+'</td>'+
					    	    			'<td>'+arrayname[i].SPCompliance+'</td>'+
					    	    			'<td>'+arrayname[i].SPLegal+'</td>'+
					    	    			'<td>'+arrayname[i].SPBrand+'</td>'+
					    	    			'<td>'+arrayname[i].AXPBrand+'</td>'+
					    	    			'<td style="display:none">'+arrayname[i].TargetMarket+'</td>'+
					    	    			'<td style="display:none">'+arrayname[i].IntendedAudience+'</td>'+
					    	    			'<td style="display:none">'+arrayname[i].ReviewType+'</td>'+
					    	    			'<td style="display:none">'+desrciption+'</td>'+
					    	    			'<td style="display:none">'+emailcommunication+'</td>'+ 					    	    				    			
					    	    			'</tr>' ; 
				    
			 }	
			 }				
		});	
			    	
		    	$("#Approvertable1").empty().append(htmltable);		    	
		        pager.init(); 
		        pager.showPageNav('pager', 'SPpageNavPosition'); 
		        pager.showPage(1);
		       
    } 
     $.hideLoading();           	
}
function SPgetListItemsForApproversfailure()
{
debugger;
	 $.hideLoading();
}
/* #Endregion  - Function to get All items from document library */

var previewmessagesglbl=false;

/* #region  - Function to get Preview of each document */

function SPDocumentpreview(url,docid,Status)
{
debugger;

$.showLoading({
	name: 'circle-turn'
});
if(Status=="Submitted")
{
	changeStatus(docid);
}
	previewmessagesglbl=true;
	var SPdownloadcopy="";	
	var previewpropertiesActionsHTML=""
       $('#SPpreviewModal').modal();
       $('.tab-name-comm').empty();
       $("#SPpreviewmsgs").val("");
       document.getElementById("SPpreviewframe").setAttribute("src", "");
       document.getElementById("SPpreviewframe").setAttribute("src", url);
	documentId=docid;
	
	previewpropertiesActionsHTML+='<li class="active" id="SPactions"><a href="#letters" onclick="SPActioninpreview()"> Actions</a></li>'+
                                        '<li id="SPProperties"><a href="#emails" onclick="SPpropertiesinpreview()"> Properties</a></li>';
      $("#previewpropertiesActions").empty().append(previewpropertiesActionsHTML)                                  		
	SPgetdiscussions(documentId,Discussionlist, siteurl,SPgetdiscussionssuccess,SPgetdiscussionsfailure);

	

	SPdownloadcopy+='<a href="'+siteurl+'/_layouts/download.aspx?SourceUrl='+url+'">' +
                            	'<i class="fa fa-download fa-2x"></i>'+
                                	'<div class="icon-span">Download a copy</div>'+
                                '</a>';
	$(".icon-width").empty().append(SPdownloadcopy);	
		
 
$("#SPdetails").empty();
$("#SPemailid").empty();
$("#ALLcomments").empty();
$("#SPworkflowdetails").show();
SPPreviewDetailsSection();
SPMessagesSection(docid);
SPgetListItemswithid(docid,DocumentlistName, siteurl,SPpreviewdropdownSuccess,SPpreviewdropdownfailure);
//setInterval(function(){SPgetdiscussions(documentId,Discussionlist, siteurl,SPgetdiscussionssuccess,SPgetdiscussionsfailure); }, 1000);
}
/* #ENDregion  - Function to get Preview of each document */


function SPMessagesSection(docid)
{
	debugger;
	var SPpreviewmessagesection='';
		SPpreviewmessagesection+='<div class="content-scroll" id="PreviewIMGandMSGs">'+
									/*<div class="pro-com-img">
										<img src="/Style Library/SP/css/Img.png">
									</div>
									<div class="tab-name-comm">								
									</div>*/
									'</div>'+
									'<div class="width-formgrup">'+
									'<textarea class="form-control" placeholder="Type Message and Hit Enter to Reply" id="SPpreviewmsgs"></textarea>'+
									'</div>'+
									'<div id="SPlookupdocidPreview" style="display: none">'+docid+'</div>';
	$("#MessagesDiv").empty().append(SPpreviewmessagesection);
	$('#SPpreviewmsgs').keypress(function(event){
	debugger;
	if(event.keyCode == 13 ){
	event.preventDefault();    	
	previewmessagesglbl=true;
	SPsubmitmessage(event);
	event.keyCode=10;      	 	
	return false; 	
	} 
	});

}

/*Function to get Preview details(UI)*/
function SPPreviewDetailsSection()
{
debugger;
	var SPPreviewDetailshtml='';
		SPPreviewDetailshtml+='<div class="form-group">'+
									'<label class="col-sm-2 control-label">'+
									'SP Compliance</label>'+
									'<div class="col-sm-5">'+
										'<select class="form-control" id="SPComplianceId">'+
										'</select>'+
										'<textarea class="form-control textarea-mt" id="Compliancecomments" style="display: none"></textarea>'+
									'</div>'+
									'<textarea type="text" id="otherCategory" style="display: none"></textarea>'+
									'<div class="col-sm-5">'+
										'<div class="checkbox checkbox-pd">'+
											'<label>'+
											'<input type="checkbox" id="notifycomplience">Notify Complience</label>'+										
											'<label>'+
											'<input type="checkbox" class="checkboxmargin" id="Compliencecheckboxmargin">Add Recipient Email</label>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="form-group">'+
									'<label class="col-sm-2 control-label">SP Legal</label>'+
									'<div class="col-sm-5">'+
										'<select class="form-control" id="SPLegalId">'+
										'</select>'+
										'<textarea class="form-control textarea-mt" id="Legalcomments" style="display: none"></textarea>'+
									'</div>'+
									'<div class="col-sm-5">'+
										'<div class="checkbox checkbox-pd">'+
											'<label>'+
											'<input type="checkbox" id="notifyLegal">Notify Legal</label><br>'+
											'<label>'+
											'<input type="checkbox" class="checkboxmargin" id="Legalcheckboxmargin">Add Recipient Email</label>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="form-group">'+
									'<label class="col-sm-2 control-label">SP Brand</label>'+
									'<div class="col-sm-5">'+
										'<select class="form-control" id="SPBrandId">'+
										'<textarea class="form-control textarea-mt" id="SPBrandcomments" style="display: none">'+
										'</textarea></select></div>'+
									'<div class="col-sm-5">'+
										'<div class="checkbox checkbox-pd">'+
											'<label>'+
											'<input type="checkbox" id="notifySPBranding">Notify SP Branding</label><br>'+
											'<label>'+
											'<input type="checkbox" class="checkboxmargin" id="SPBrandcheckboxmargin">Add Recipient Email</label>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="form-group">'+
									'<label class="col-sm-2 control-label">Amex Brand</label>'+
									'<div class="col-sm-5">'+
										'<select class="form-control" id="AXPBrandId">'+
										'<textarea class="form-control textarea-mt" id="AXPBrandcomments" style="display: none">'+
										'</textarea></select></div>'+
									'<div class="col-sm-5">'+
										'<div class="checkbox checkbox-pd">'+
											'<label>'+
											'<input type="checkbox" id="notifyAXPBranding">Notify Amex Branding</label>'+
											'<label>'+
											'<input type="checkbox" class="checkboxmargin" id="Amexcheckboxmargin">Add Recipient Email</label>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="form-group" id="previewaction">'+
									'<button type="button" class="btn btn-colse" onclick="submitpreviewdocDetails()">Submit</button></div>'+
									'</div>';
	$("#previewdetails-right").empty().append(SPPreviewDetailshtml);
}

/*Function to get properties section in document preview */

function SPpropertiesinpreview()
{
debugger;
	$.showLoading({
	name: 'circle-turn'
});
	$("#SPactions").removeClass("active");
	$("#SPProperties").addClass("active");
	$('#SPworkflowdetails').hide();
	var relateddocid=$("#SPlookupdocidPreview").text();
	$("#previewaction").hide();
	SPgetListItemswithid(relateddocid,DocumentlistName, siteurl,SPdocumentdetailsIDSuccess,SPdocumentdetailsIDfailure);
}

/*Function to get Action section in document preview */

function SPActioninpreview()
{
	debugger;
	$("#SPProperties").removeClass("active");
	$("#SPactions").addClass("active");
	$("#SPdetails").empty();
	$("#SPemailid").empty();
	$("#ALLcomments").empty();
	$("#SPworkflowdetails").show();
	$("#previewaction").show();
}
/*Function to get details of document */

var documentid=""
var SPDocudetailsId=''
function SPGetLibraryItems(docid)
{
	debugger;
	SPDocudetailsId=docid;
	$('#tab-list-menuID').empty();
	documentid=docid;
	$.showLoading({
	  name: 'circle-turn'
	});
	$("#informationid").empty()	;
	$("#emailid").empty();
	$("#departmntid").empty();
	$('#myModalDetails').modal({backdrop: 'static', keyboard: false});
	$('#tab-list-menuID').empty().append('<li class="" id="detailscls"><a href="#letters" data-toggle="tab" aria-expanded="false" onclick="SPGethistory()"> History</a></li>'+
                        '<li class="active" id="historycls"><a href="#emails" data-toggle="tab" aria-expanded="true" onclick="SPGetdetails()"> Details</a></li>' );
	SPGetdetails();
	//GetALLlibraryItems(docid,DocumentlistName, siteurl,GetALLlibraryItemsSuccess,GetALLlibraryItemsFailure);
}


/* #region  - Function to get all items from library */

function GetALLlibraryItems(docid,listName, siteurl,success,failure) {
debugger;
    $.ajax({
        url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items("+docid+")?$select=SPCompliance,SPLegal,SPBrand,AXPBrand,Created,DocumentDescription,ProjectName,Modified,FromAddress,RplyToAddress,CompleteSubjectLine,Author/Name,EmailMarketing,IsThisAnEmailCommunication,CountryOfOrigin,IntendedAudience,TargetMarket,AudienceSize,ReviewType,EncodedAbsUrl,ID&$expand=Author",
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
	     '<span class="sapn-text" id="lastactivitydate"><strong>Last activity :</strong>'+modifieddate+'</span>'+ 
	     '<span class="sapn-text" id="submitdby"><strong>Submitted by :</strong>'+resultauthor+'</span> '+
	     '<span class="sapn-text" ><strong>Folder location :</strong>'+folderlocation+'</span>';
	     
	var Emailhtml=     '<h6>Email :</h6>'+
	     '<span class="sapn-text" id="Emailfrom"><strong>From address </strong>'+FromAddress+'</span>'+
	     '<span class="sapn-text" id="EmailTo"><strong>Reply-to address </strong>'+RplyToAddress+'</span>'+ 
	     '<span class="sapn-text" id="subjectLine"><strong>Subject line </strong>'+CompleteSubjectLine+'</span>'+ 
	     '<span class="sapn-text" id="emailtarget"><strong>Email platform </strong>'+EmailMarketing+'</span>';
	
	var Departmenthtml=  '<h6>Department Information :</h6>'+
	 '<span class="sapn-text" id="Countryid"><strong>SP compliance </strong>'+SPCompliance+'</span>'+
	     '<span class="sapn-text" id="marketid"><strong>SP legal</strong>'+SPLegal+'</span>' +
	     '<span class="sapn-text" id="audienceid"><strong>SP brand</strong>'+SPBrand+'</span>' +
	     '<span class="sapn-text" id="audiencesizeid"><strong>AXP brand</strong>'+AXPBrand+'</span>'+

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
function GetALLlibraryItemsFailure()
{
debugger;
	//alert("failure");
	$.hideLoading();
}
/* #ENDregion  - Function to get all items from library */




/* #Region - Function to change status of document */

function changeStatus(docid)
{
	var status="In Progress";
	var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle(DocumentlistName);
    this.oListItem = oList.getItemById(docid);	
	oListItem.set_item('Status', status);
	//oListItem.set_item('InternalStatus', status);
	oListItem.set_item('InternalstatusNew', "True");	
    oListItem.update();
    clientContext.executeQueryAsync(Function.createDelegate(this, this.UpdateStatusQuerySucceeded), Function.createDelegate(this, this.UpdateStatusQueryFailed));
}

function UpdateStatusQuerySucceeded()
{
	//SPgetItemsForApproversPaging(topcount,skipcountnew,SPgetListItemsForApproverssuccess, SPgetListItemsForApproversfailure);
	 SPgetListItemsForApprovers(DocumentlistName, siteurl, SPgetListItemsForApproverssuccess, SPgetListItemsForApproversfailure);
	 //$.hideLoading();
}
function UpdateStatusQueryFailed()
{
	$.hideLoading();
}
/* #ENDregion  - Function to change status of document */


/*Function to get the document info with id*/

function SPdocumentdetailsIDSuccess(documentdetails)
{
debugger;
	var ALLcommentshtml="";
	var informationhtml='';
	var Emailhtml='';
	var libraryitemsarray=documentdetails[0];
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
	if(libraryitemsarray.SPComplianceComments!=null)
	{
		var SPCompliancecmts=libraryitemsarray.SPComplianceComments;
	}
	else
	{
		var SPCompliancecmts="";
	}
	if(libraryitemsarray.SPLegalcomments!=null)
	{
		var SPLegal=libraryitemsarray.SPLegalcomments;
	}
	else
	{
		var SPLegal="";
	}
	if(libraryitemsarray.SPBrandcomments!=null)
	{
		var SPBrand=libraryitemsarray.SPBrandcomments;
	}
	else
	{
		var SPBrand="";
	}		
	    
	informationhtml+= '<h4 class="prop-title">Information</h4> <div class="sapn-text" id="submiteddate"><strong>Date Submitted :</strong>'+createddate+'</div>'+
					'<div class="sapn-text" id="lastactivitydate"><strong>Last Activity :</strong>'+modifieddate+'</div>'+ 
					'<div class="sapn-text" id="submitdby"><strong>Submitted By :</strong>'+resultauthor+'</div> '+
					'<div class="sapn-text" ><strong>Folder Location :</strong>'+folderlocation+'</div>'+
					'<div class="sapn-text" id="marketid"><strong>Target market :</strong>'+TargetMarket+'</div>' +
					'<div class="sapn-text" id="audienceid"><strong>Intended audience :</strong>'+IntendedAudience+'</div>' +
					'<div class="sapn-text" id="audiencesizeid"><strong>Audience size :</strong>'+AudienceSize+'</div>';
						     
	Emailhtml+=    '<h4 class="prop-edetails">Email</h4> <div class="sapn-text" id="Emailfrom"><strong>From address :</strong>'+FromAddress+'</div>'+
					 '<div class="sapn-text" id="EmailTo"><strong>Rply to address :</strong>'+RplyToAddress+'</div>'+ 
					 '<div class="sapn-text" id="subjectLine"><strong>Complete subject line :</strong>'+CompleteSubjectLine+'</div>'+ 
					 '<div class="sapn-text" id="emailtarget"><strong>Email Service :</strong>'+EmailMarketing+'</div>';
					 
			$().SPServices({
		operation: "GetGroupCollectionFromUser", 
		userLoginName: $().SPServices.SPGetCurrentUser(), 
		async: false, 
		completefunc: function (xData, Status) { 
			if ($(xData.responseXML).find("Group[Name='SP Compliance Team']").length == 1)
				{ 												
				}
			else if ($(xData.responseXML).find("Group[Name='SP Process Manager']").length == 1)
				{
				ALLcommentshtml+='<h4 class="prop-edetails">Comments</h4><div class="sapn-text"><strong>Compliance</strong>'+SPCompliancecmts+'</div>'+ 
									'<div class="sapn-text"><strong>Legal</strong>'+SPLegal+'</div>'+
									'<div class="sapn-text"><strong>SPBrand</strong>'+SPBrand+'</div>';					
				}
			else if ($(xData.responseXML).find("Group[Name='SP Legal Team']").length == 1)
				{ 
					ALLcommentshtml+='<h4 class="prop-edetails">Comments</h4><div>'+SPCompliancecmts+'</div>';
				}
			else if ($(xData.responseXML).find("Group[Name='SP Brand Review']").length == 1)
				{ 
					 ALLcommentshtml+='<h4 class="prop-edetails">Comments</h4><div>'+SPLegal+'</div>';				
				}
			else if ($(xData.responseXML).find("Group[Name='AXP Brand Review']").length == 1)
				{
					 ALLcommentshtml+='<h4 class="prop-edetails">Comments</h4><div>'+SPBrand+'</div>'; 
				}	
			}
		});		 
					 
	$("#SPdetails").empty().append(informationhtml) ;
	$("#SPemailid").empty().append(Emailhtml) ;
	$("#ALLcomments").empty().append(ALLcommentshtml) ;
	$.hideLoading();
}

function SPdocumentdetailsIDfailure()
{
	$.hideLoading();
}


/*Function to get Opening messesages onclick on button*/

function SPopenmessages(idofdoc)
{
	debugger;
	previewmessagesglbl=false;	
	$('#SPmyModalmessages').modal({backdrop: 'static', keyboard: false});
	$("#msgesconent").empty();
	
	$("#SPdescriptionid").val("");
	$('#SPcloseid').attr("data-dismiss","modal");
	$('#SPcloseid').text("Close");
	
	documentId=idofdoc;		
	SPgetdiscussions(documentId,Discussionlist, siteurl,SPgetdiscussionssuccess,SPgetdiscussionsfailure);
	$("#SPlookupdocid").text(idofdoc);
	SPgetpermissionsOnclickOpenMsg(documentId);				
}
/* Function to check notification based on login user login user  */

function SPgetpermissionsOnclickOpenMsg(documentId)
{
//debugger;
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
		{ 
			$("#reviewernotification").text("");
			$("#reviewernotification").removeClass("SPappr");
			var ColumnName="reviewerread";
			updateSPDocumentList(ColumnName,documentId,testcolumn);
		}
	}
 }); 
}
/* Function to update item in library  */

function updateSPDocumentList(ColumnName,id,testcolumn) 
{
//debugger;

    var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle(DocumentlistName);
    this.oListItem = oList.getItemById(id);
	oListItem.set_item(ColumnName, testcolumn);
	//oListItem.set_item("InternalStatus", testcolumn);
	oListItem.set_item('InternalstatusNew', "True");
    oListItem.update();
    clientContext.executeQueryAsync(Function.createDelegate(this, this.SPNotificationonQuerySucceeded), Function.createDelegate(this, this.SPNotificationononQueryFailed));
}

function SPNotificationonQuerySucceeded() {
//debugger;
}

function SPNotificationononQueryFailed(sender, args) {    
}

/* #Region-Function to get messages from discussion list*/

function SPgetdiscussions(documentId,Discussionlist, siteurl,success,failure) {
debugger;
    $.ajax({
        url: siteurl + "/_api/web/lists/getbytitle('" + Discussionlist+ "')/items?$select=Author/Name,Body,id,Created&$expand=Author&$filter=Documentlookup eq'"+documentId+"'",
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

function SPgetdiscussionssuccess(results)
{
	debugger;	
	var messagearray=new Array();
	messagearray=results;
	var messageshtml="";
	var previewmessageshtml="";
	var previewmangername='';
	var mangername='';
	$("#PreviewIMGandMSGs").empty();
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
				var discussionbydate=new Date(messagearray[i].Created);
				var resulttime=DateTimeFormate(discussionbydate);								
         		var discussionbydatenew = discussionbydate.getMonth()+1 + "/" + discussionbydate.getDate() + "/" + discussionbydate.getFullYear() + " " + resulttime;
         		var discussionbydateOLD = discussionbydate.getMonth()+1 + "/" + discussionbydate.getDate() + "/" + discussionbydate.getFullYear();

			}
			else
			{
				var discussionbydatenew="";
			}
			
				if(previewmessagesglbl==true)
				{
					if(resultdiscussionby==loginusername)
					{
						previewmessageshtml+='<div class="msg-left">'+
                             '<div class="pro-com-img">'+
                             ' <img src="/Style Library/SP/css/Img.png"> </div>'+
                               ' <div class="tab-name-comm">'+
                                    '<div class="tab-name-title">'+resultdiscussionby+'</div>'+
                                    '<p>'+resultdiscusinbody+'</p>'+
                                     '<p>'+discussionbydatenew+'</p>'+
                               ' </div>'+
                               ' </div>';		
	                                     
	                 }
					else
					{
						previewmessageshtml+='<div class="text-bg-color msg-right">'+
                                  '<div class="tab-name-comm">'+
                                    '<div class="tab-name-title">'+resultdiscussionby+'</div>'+
                                   ' <p>'+resultdiscusinbody+'</p>'+                                     
                               '</div>'+
                                '</div>	'+
                                '<p style="text-align: right">'+discussionbydatenew+'</p>';
					}
					//$(".tab-name-comm").empty().append(previewmessageshtml);
					$("#PreviewIMGandMSGs").empty().append(previewmessageshtml);
					
				}
				else
				{
					if(i%2!=0)
					{			
	
						messageshtml+=	'<div class="Bodymargin">'+									
										'<p>'+resultdiscussionby+'</p>'+
									'<p>'+resultdiscusinbody+'</p>'+
									'<p>'+discussionbydateOLD+'</p>'+
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
									'<p>'+discussionbydateOLD+'</p>'+
									'</div>'+
									'</div>';
					}
					$("#SPmsgesconent").empty().append(messageshtml);
				}
			
		}
		
	}
	previewmangername+= '<div class="pro-img">'+
								'<img src="/Style%20Library/SP/css/Img.png" />'+
								'</div>'+
								'<div class="tab-name">'+
								'<h5>'+loginusername+'</h5>'+
								//'<h6>Compliance Manager</h6>'+
								'</div>';
								
	mangername+='<div class="pro-img-popup"> <img src="/Style Library/SP/css/Img.png"> </div>'+
									'<div class="tab-name">'+
									'<h5>'+loginusername+'</h5>'+
									//'<h6>Compliance Manager</h6>'+
								'</div>';
		$(".left-list-poup").empty().append(mangername);
		$(".left-list").empty().append(previewmangername);							
	//$.hideLoading();									
}
function SPgetdiscussionsfailure()
{
	//debugger;
	$.hideLoading();
}
/* #ENDRegion-Function to get messages from discussion list*/


SP.SOD.executeFunc('sp.js', 'SP.ClientContext');
/*#Region-Function to create messages in discussion list */

function SPsubmitmessage(event) {
	debugger;
     
	if(previewmessagesglbl==true)
	{
		temp = temp.concat($("#SPpreviewmsgs").val().trim());
		var message=$("#SPpreviewmsgs").val().trim();
		var doclookupid=$("#SPlookupdocidPreview").text();
		if(temp!=message)
		{
		    return false;
		}
	}
	else
	{
		var message=$("#SPdescriptionid").val().trim();
		var doclookupid=$("#SPlookupdocid").text();
	}
	
	
	
	$("#SPdescriptionid").val("");
	
    
	if(message=="")
	{
		alert("Please enter message");
		return false;
	}
    var clientContext = new SP.ClientContext(siteurl);
    var oList = clientContext.get_web().get_lists().getByTitle(Discussionlist);        
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
    clientContext.executeQueryAsync(Function.createDelegate(this, this.SPonQuerySucceededmSg), Function.createDelegate(this, this.SPonQueryFailedMSG));
}

function SPonQuerySucceededmSg() {
//debugger;
    //alert('Item created: ' + oListItem.get_id());
    $("#SPdescriptionid").val("");
    $('#SPpreviewmsgs').val("");
    $('#SPcloseid').text("Close");
    SPgetdiscussions(documentId,Discussionlist, siteurl,SPgetdiscussionssuccess,SPgetdiscussionsfailure)
   // getListItemswithid(documentId,DocumentlistName, siteurl,getItemssuccesswithId,getListItemsfailurewithId);
   if(previewmessagesglbl!=true)
   {
   	SPgetpermissionsOnclickSubmitMsg(documentId); 
   }    
   temp="";
}

function SPonQueryFailedMSG(sender, args) {

    //alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    $.hideLoading();
    temp="";
}
/* #ENDRegion-Function to create messages in discussion list */

/*creating messages end */

function SPgetpermissionsOnclickSubmitMsg(documentId)
{
SPgetListItemswithid(documentId,DocumentlistName, siteurl,SPgetItemssuccesswithId,SPgetListItemsfailurewithId);
//debugger;
 
}
/*getting list data based on id starts*/
function SPgetListItemswithid(documentId,DocumentlistName, siteurl,success,failure)
{
	//debugger;
	$.ajax({
        url: siteurl + "/_api/web/lists/getbytitle('" +DocumentlistName+ "')/items?$select=SPCompliance,SPLegal,SPBrand,AXPBrand,loginuserread,reviewerread,Created,Modified,Author/Name,EncodedAbsUrl,IntendedAudience,TargetMarket,AudienceSize,FromAddress,RplyToAddress,CompleteSubjectLine,EmailMarketing,SPComplianceComments,SPLegalcomments,SPBrandcomments&$expand=Author&$filter=Id eq'"+documentId+"'",
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

function SPgetItemssuccesswithId(obj)
{
	//debugger;
	userno=obj[0].loginuserread;
	reviewrno=obj[0].reviewerread;
	$().SPServices({
	operation: "GetGroupCollectionFromUser", 
	userLoginName: $().SPServices.SPGetCurrentUser(), 
	async: false, 
	completefunc: function (xData, Status) { 
		if ($(xData.responseXML).find("Group[Name='Document Owner']").length != 1)
		{ 
			var ColumnName="loginuserread";
			if(userno==null)
			{
				userno=0;
			}
			var testcolumn=userno+1;
			
		} 
	 else if($(xData.responseXML).find("Group[Name='SP Process Manager']").length == 1 || $(xData.responseXML).find("Group[Name='SP Legal Team']").length == 1 || $(xData.responseXML).find("Group[Name='SP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='AXP Brand Review']").length == 1 || $(xData.responseXML).find("Group[Name='SP Compliance Team']").length == 1)
		{ 
			var ColumnName="reviewerread";
			if(reviewrno==null)
			{
				reviewrno=0;
			}
			var testcolumn=reviewrno+1;
			
		}
		updateSPDocumentList(ColumnName,documentId,testcolumn);
	}
 });
}

function SPgetListItemsfailurewithId()
{
	//debugger;
}

/*getting list data based on id end*/

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
		previewmessagesglbl=false;
		SPsubmitmessage()
	}
	else if($('#SPcloseid').text()=="Close")
	{
		 $('#SPcloseid').attr("data-dismiss","modal");
	}
}


function SPgetDocumentItemsForDropDown(success,failure)
 {
 	 $.ajax({
        url: siteurl + "/_api/web/lists/getbytitle('" + DocumentlistName+ "')/fields?$filter=EntityPropertyName eq 'SPCompliance' or EntityPropertyName eq 'SPLegal' or EntityPropertyName eq 'SPBrand' or EntityPropertyName eq 'AXPBrand'",
      //url: siteurl +"_api/web/lists/getbytitle('SPPOCdoc')?$expand=Attachments",
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
 var SPpreviewdropdownvalues=new Array();
function SPpreviewdropdownSuccess(array)
{
	debugger;
	SPpreviewdropdownvalues=array;
	$('#SPComplianceId :selected').text(SPpreviewdropdownvalues[0].SPCompliance);
	$('#SPLegalId :selected').text(SPpreviewdropdownvalues[0].SPLegal);
	$('#SPBrandId :selected').text(SPpreviewdropdownvalues[0].SPBrand);
	$('#AXPBrandId :selected').text(SPpreviewdropdownvalues[0].AXPBrand); 
	SPgetDocumentItemsForDropDown(SPDropDownvaluessuccess,SPDropDownvaluesfailure);                      
}

function SPpreviewdropdownfailure()
{
	$.hideLoading();
}
/*preview dropdown values*/

function SPDropDownvaluessuccess(Dropdownarray)
{
	debugger;
	 
	 if(Dropdownarray.length>0)
	 {
	 	var SPCompliancedropdown='';
	 	var SPLegaldropdown='';
	 	var SPBranddropdown='';
	 	var AXPBranddropdown='';
	 		 	
	 		var SPCompliancearry=Dropdownarray[0].Choices.results;
	 		var SPLegal=Dropdownarray[1].Choices.results;
	 		var SPBrand=Dropdownarray[2].Choices.results;
	 		var AXPBrand=Dropdownarray[3].Choices.results;
	 		 		
	 		for(var i=0;i<SPCompliancearry.length;i++)
	 		{
	 		    if(SPCompliancearry[i]==SPpreviewdropdownvalues[0].SPCompliance)
	 		    {	 		    
	 				SPCompliancedropdown+='<option value='+i+' Selected >'+SPCompliancearry[i]+'</option>';
	 			}
	 			else
	 			{
	 				SPCompliancedropdown+='<option value='+i+'>'+SPCompliancearry[i]+'</option>';
	 			}
	 		}
	 		for(var i=0;i<SPLegal.length;i++)
	 		{
	 			if(SPLegal[i]==SPpreviewdropdownvalues[0].SPLegal)
	 		    {	 		    
	 				SPLegaldropdown+='<option value='+i+' Selected >'+SPLegal[i]+'</option>';
	 			}
	 			else
	 			{
	 				SPLegaldropdown+='<option value='+i+'>'+SPLegal[i]+'</option>';
	 			}
	 		}
	 		for(var i=0;i<SPBrand.length;i++)
	 		{
	 			if(SPBrand[i]==SPpreviewdropdownvalues[0].SPBrand)
	 		    {	 		    
	 				SPBranddropdown+='<option value='+i+' Selected >'+SPBrand[i]+'</option>';
	 			}
	 			else
	 			{
	 				SPBranddropdown+='<option value='+i+'>'+SPBrand[i]+'</option>';
	 			}
	 		}
	 		for(var i=0;i<AXPBrand.length;i++)
	 		{
	 			if(AXPBrand[i]==SPpreviewdropdownvalues[0].AXPBrand)
	 		    {	 		    
	 				AXPBranddropdown+='<option value='+i+' Selected >'+AXPBrand[i]+'</option>';
	 			}
	 			else
	 			{
	 				AXPBranddropdown+='<option value='+i+'>'+AXPBrand[i]+'</option>';
	 			}
	 		}
	 		
			$("#SPComplianceId").empty().append(SPCompliancedropdown);
		 	$("#SPLegalId").empty().append(SPLegaldropdown);
		 	$("#SPBrandId").empty().append(SPBranddropdown);
		 	$("#AXPBrandId").empty().append(AXPBranddropdown);
		 
	 }
	 
		
		$().SPServices({
		operation: "GetGroupCollectionFromUser", 
		userLoginName: $().SPServices.SPGetCurrentUser(), 
		async: false, 
		completefunc: function (xData, Status) { 
			if ($(xData.responseXML).find("Group[Name='SP Compliance Team']").length == 1)
				{ 
						$("#SPBrandId").attr("disabled", true);
						$("#AXPBrandId").attr("disabled", true);
						$("#SPLegalId option[value='2']").hide();
						$("#SPLegalId option[value='3']").hide();
						$("#SPLegalId option[value='4']").hide();
						
						$("#notifyLegal").attr("disabled", true);
						$("#Legalcheckboxmargin").attr("disabled", true);
						$("#notifySPBranding").attr("disabled", true);
						$("#SPBrandcheckboxmargin").attr("disabled", true);
						$("#notifyAXPBranding").attr("disabled", true);
						$("#Amexcheckboxmargin").attr("disabled", true);						
							
				}
			else if ($(xData.responseXML).find("Group[Name='SP Process Manager']").length == 1)
				{ 
				debugger;
				}
			else if ($(xData.responseXML).find("Group[Name='SP Legal Team']").length == 1)
				{ 
						$("#SPComplianceId").attr("disabled", true);
						$("#SPBrandId").attr("disabled", true);
						$("#AXPBrandId").attr("disabled", true);
						
						$("#notifycomplience").attr("disabled", true);
						$("#Compliencecheckboxmargin").attr("disabled", true);
						$("#notifySPBranding").attr("disabled", true);
						$("#SPBrandcheckboxmargin").attr("disabled", true);
						$("#notifyAXPBranding").attr("disabled", true);
						$("#Amexcheckboxmargin").attr("disabled", true);
	
				}
			else if ($(xData.responseXML).find("Group[Name='SP Brand Review']").length == 1)
				{ 
						$("#SPComplianceId").attr("disabled", true);
						$("#AXPBrandId").attr("disabled", true);
						$("#SPLegalId").attr("disabled", true);
						
						$("#notifycomplience").attr("disabled", true);
						$("#Compliencecheckboxmargin").attr("disabled", true);
						$("#notifyLegal").attr("disabled", true);
						$("#Legalcheckboxmargin").attr("disabled", true);
						$("#notifyAXPBranding").attr("disabled", true);
						$("#Amexcheckboxmargin").attr("disabled", true);
				
				}
			else if ($(xData.responseXML).find("Group[Name='AXP Brand Review']").length == 1)
				{ 
						$("#SPComplianceId").attr("disabled", true);
						$("#SPLegalId").attr("disabled", true);
						$("#SPBrandId").attr("disabled", true);
						
						$("#notifycomplience").attr("disabled", true);
						$("#Compliencecheckboxmargin").attr("disabled", true);
						$("#notifyLegal").attr("disabled", true);
						$("#Legalcheckboxmargin").attr("disabled", true);
						$("#notifySPBranding").attr("disabled", true);
						$("#SPBrandcheckboxmargin").attr("disabled", true);

				}	
			}
		});
		/*workflow comments*/
	
		$('#SPComplianceId').on('change', function () {
 debugger;
        var myValue = $(this).val();
        var myText = $.trim($("#SPComplianceId :selected").text()); // Trim spaces and convert to lowercase for comparison
    	if(myText =="Approved w/ Comments")
		{
			//$("#commentnpopup").modal('show');
			$("#Compliancecomments").show();
		}
		else if(myText =="Not approved; Re-submit")
		{
			//$("#commentnpopup").modal('hide');
			$("#Compliancecomments").show();
		}
		else
		{
			$("#Compliancecomments").hide();
		}
		
	});

$('#SPLegalId').on('change', function () {
 debugger;
        var myValue = $(this).val();
        var myText = $.trim($("#SPLegalId :selected").text()); // Trim spaces and convert to lowercase for comparison
    	if(myText =="Approved w/ Comments")
		{
			//$("#commentnpopup").modal('show');
			$("#Legalcomments").show();
		}
		else if(myText =="Not approved; Re-submit")
		{
			//$("#commentnpopup").modal('show');
			$("#Legalcomments").show();
		}
		else
		{
			//$("#commentnpopup").modal('hide');
			$("#Legalcomments").hide();
		}
	});
$('#SPBrandId').on('change', function () {
 debugger;
        var myValue = $(this).val();
        var myText = $.trim($("#SPBrandId :selected").text()); // Trim spaces and convert to lowercase for comparison
    	if(myText =="Approved w/ Comments")
		{
			//$("#commentnpopup").modal('show');
			$("#SPBrandcomments").show();
		}
		else if(myText =="Not approved; Re-submit")
		{
			//$("#commentnpopup").modal('show');
			$("#SPBrandcomments").show();
		}
		else
		{
			//$("#commentnpopup").modal('hide');
			$("#SPBrandcomments").hide();
		}
	});
$('#AXPBrandId').on('change', function () {
 debugger;
        var myValue = $(this).val();
        var myText = $.trim($("#AXPBrandId :selected").text()); // Trim spaces and convert to lowercase for comparison
    	if(myText =="Approved w/ Comments")
		{
			//$("#commentnpopup").modal('show');
			$("#AXPBrandcomments").show();
		}
		else if(myText =="Not approved; Re-submit")
		{
			//$("#commentnpopup").modal('show');
			$("#AXPBrandcomments").show();
		}
		else
		{
			//$("#commentnpopup").modal('hide');
			$("#AXPBrandcomments").hide();
		}
	});
/*workflow comments*/
$.hideLoading();	 
} 
function SPDropDownvaluesfailure()
{
	debugger; 
	$.hideLoading();
}
/*preview dropdown values*/


function SPGethistory()
{
	debugger;
	$("#detailscls").addClass("active");
	$("#historycls").removeClass("active");
	
	$("#informationid").empty()	;
	$("#emailid").empty();
	$("#departmntid").empty();
	$("#detialsdiv").show() ;
	$('#detialsdiv').empty()
	Historydetails(SPDocudetailsId,HistorydetailsSuccess,HistorydetailsFailure);	
}
/*Getting Details of document */
function SPGetdetails()
{
	debugger;
	$("#detailscls").removeClass("active");
	$("#historycls").addClass("active");
	
	$("#informationid").empty()	;
	$("#emailid").empty();
	$("#departmntid").empty();
	$("#detialsdiv").hide() ;
		
	GetALLlibraryItems(SPDocudetailsId,DocumentlistName, siteurl,GetALLlibraryItemsSuccess,GetALLlibraryItemsFailure);
	}




/*Function for Submiting preview details start*/

function submitpreviewdocDetails()
{
debugger;
	var SPcompliancecomments='SPComplianceComments';
	var SPlegalcomments='SPLegalcomments'
	var SPbrandcomments='SPBrandcomments'
	var AXPBrandcommentsname='AXPBrandcomments'
					
	var documentid= $("#SPlookupdocidPreview").text();
	var SPCompliancename=$('#SPComplianceId :selected').text();
	if(SPCompliancename=="Approved w/ Comments")
	{
		var SPCompliancename="Approved";
		var SPcompliancecomments='SPComplianceComments';
	}
	else if(SPCompliancename=="Not approved; Re-submit")
	{
		var SPcompliancecomments='SPAlerts';
	}
	
	var SPLegalname=$('#SPLegalId :selected').text();
	if(SPLegalname=="Approved w/ Comments")
	{
		var SPLegalname="Approved";
		var SPlegalcomments='SPLegalcomments'
	}
	else if(SPLegalname=="Not approved; Re-submit")
	{
		var SPlegalcomments='SPAlerts';
	}

	var SPBrandname=$('#SPBrandId :selected').text();
	if(SPBrandname=="Approved w/ Comments")
	{
		var SPBrandname="Approved";
		var SPbrandcomments='SPBrandcomments'
	}
	else if(SPBrandname=="Not approved; Re-submit")
	{
		var SPbrandcomments='SPAlerts';
	}

	var AXPBrandname=$('#AXPBrandId :selected').text();
	if(AXPBrandname=="Approved w/ Comments")
	{
		var AXPBrandname="Approved";
		var AXPBrandcommentsname='AXPBrandcomments'
	}
	else if(AXPBrandname=="Not approved; Re-submit")
	{
		var AXPBrandcommentsname='SPAlerts';
	}
	
	var complincecomments=$('#Compliancecomments').val();
	var Legalcomments=$('#Legalcomments').val();
	var SPBrandcomments=$('#SPBrandcomments').val();
	var AXPBrandcomments=$('#AXPBrandcomments').val();
	
	var NotifyComplience=$('#notifycomplience').is(":checked");
	var notifyLegal=$('#notifyLegal').is(":checked");	
	var notifySPBranding=$('#notifySPBranding').is(":checked");
	var notifyAXPBranding=$('#notifyAXPBranding').is(":checked");
	var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle(DocumentlistName);
    this.oListItem = oList.getItemById(documentid);
	oListItem.set_item('SPCompliance', SPCompliancename);
	oListItem.set_item('SPLegal', SPLegalname);
	oListItem.set_item('SPBrand', SPBrandname);
	oListItem.set_item('AXPBrand', AXPBrandname);	
	oListItem.set_item('NotifyCompliance', NotifyComplience);
	oListItem.set_item('NotifyLegal', notifyLegal);
	oListItem.set_item('NotifySPBranding', notifySPBranding);
	oListItem.set_item('NotifyAXPBranding', notifyAXPBranding);
	
	oListItem.set_item(SPcompliancecomments, complincecomments);
	oListItem.set_item(SPlegalcomments, Legalcomments);
	oListItem.set_item(SPbrandcomments, SPBrandcomments);
	oListItem.set_item(AXPBrandcommentsname, AXPBrandcomments);
	
	oListItem.set_item('InternalstatusNew', "False");	
    oListItem.update();
    clientContext.executeQueryAsync(Function.createDelegate(this, this.SPpreviewQuerySucceeded), Function.createDelegate(this, this.SPpreviewQueryFailed));
}
function SPpreviewQuerySucceeded() {
debugger;
		//$("#SPComplianceId").prop('selectedIndex',0);
		//$("#SPLegalId").prop('selectedIndex',0);
		//$('#SPBrandId').prop('selectedIndex',0);
		//$('#AXPBrandId').prop('selectedIndex',0);
		$('#notifycomplience').attr('checked', false);
		$('#notifyLegal').attr('checked', false);
		$('#notifySPBranding').attr('checked', false);
		$('#notifyAXPBranding').attr('checked', false);
		$('#Compliancecomments').val('');
		$('#Legalcomments').val('');
		$('#SPBrandcomments').val('');
		$('#AXPBrandcomments').val('');

		$('#Compliancecomments').hide();
		$('#Legalcomments').hide();
		$('#SPBrandcomments').hide();
		$('#AXPBrandcomments').hide();
}

function SPpreviewQueryFailed(sender, args) {
debugger;
}
/*submiting preview details end*/

/*updating additional recipient start*/

function SPupdaterecipient(recipientcolumn) 
{
debugger;
	var id=$("#SPlookupdocidPreview").text();
	var recipient=$("#SPrecipienttext").val()
    var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle(DocumentlistName);
    this.oListItem = oList.getItemById(id);
	oListItem.set_item(recipientcolumn, recipient);
	//oListItem.set_item("InternalStatus", recipient);
	oListItem.set_item('InternalstatusNew', "True");
    oListItem.update();
    clientContext.executeQueryAsync(Function.createDelegate(this, this.SPrecipientQuerySucceeded), Function.createDelegate(this, this.SPrecipientonQueryFailed));
}

function SPrecipientQuerySucceeded() {
//debugger;
$("#SPrecipienttext").val('');
$('#Compliencecheckboxmargin').attr('checked', false);
$('#Legalcheckboxmargin').attr('checked', false);
$('#SPBrandcheckboxmargin').attr('checked', false);
$('#Amexcheckboxmargin').attr('checked', false);
}

function SPrecipientonQueryFailed(sender, args) {    
}

/*history*/
function Historydetails(SPDocudetailsId,success,failure) 
{

	$.ajax({
        url: siteurl+"/_api/web/lists/getbytitle('"+DocumentlistName+"')/items("+SPDocudetailsId+")?$select=Created,Modified,DocumentDescription,SPCompliance,SPLegal,SPBrand,AXPBrand,AddNewNotes",
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
var SPhistoryarray = new Array();
	SPhistoryarray = data;
	var SPhistory='';
	if(SPhistoryarray.Created!=null)
	{
		var Createddatehistory=SPhistoryarray.Created.split('T')[0];
	}
	else
	{
		var Createddatehistory='';
	}
	if(SPhistoryarray.DocumentDescription!=null)
	{
		var DocumentDescriptionhistory=SPhistoryarray.DocumentDescription;
	}
	else
	{
		var DocumentDescriptionhistory='';
	}	
	if(SPhistoryarray.Modified!=null)
	{
		var Modifieddatehistory=SPhistoryarray.Modified.split('T')[0];
	}
	else
	{
		var Modifieddatehistory='';
	}
	if(SPhistoryarray.SPCompliance!=null && SPhistoryarray.SPCompliance!="Select")
	{
		var SPcomplincehistory=SPhistoryarray.SPCompliance;
	}
	else
	{
		var SPcomplincehistory='';
	}
	if(SPhistoryarray.SPLegal!=null && SPhistoryarray.SPLegal!="Select")
	{
		var SPLegalhistory=SPhistoryarray.SPLegal;
	}
	else
	{
		var SPLegalhistory='';
	}
	if(SPhistoryarray.SPBrand!=null && SPhistoryarray.SPBrand!="Select")
	{
		var SPBrandhistory=SPhistoryarray.SPBrand;
	}
	else
	{
		var SPBrandhistory='';
	}
	if(SPhistoryarray.AXPBrand!=null && SPhistoryarray.AXPBrand!="Select")
	{
		var AXPBrandhistory=SPhistoryarray.AXPBrand;
	}
	else
	{
		var AXPBrandhistory='';
	}
	if(SPhistoryarray.AddNewNotes!=null)
	{
		var AddNewNoteshistory=SPhistoryarray.AddNewNotes;
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


/*updating additional recipient end*/

/*Function for pagination*/

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
	this.showPageNav = function(SPpagerName, positionId) {
		if (! this.inited) {
		alert("not inited");
		return;
	}
		var SPelement = document.getElementById(positionId);
		var SPpagerHtml = '<span onclick="' + SPpagerName+ '.prev();" class="pg-normal"> Prev </span> ';
		for (var page = 1; page <= this.pages; page++)
		SPpagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + SPpagerName+ '.showPage(' + page + ');">' + page + '</span> ';
		SPpagerHtml += '<span onclick="'+SPpagerName+'.next();" class="pg-normal"> Next </span>';
		SPelement.innerHTML = SPpagerHtml;
		}
}

/*Function for sorting each columns*/

function sortTable(f,n){
	var rows = $('#SPapprvergrid tbody  tr').get();

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
		$('#SPapprvergrid').children('tbody').append(row);
	});
}


/*Function for export to excel*/

function SPExcelReport()
        {
        debugger;        
                 var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
                 var textRange; var j=0;              
              var $clonedTable = $('#SPapprvergrid').clone();
              //tab = document.getElementById('SPapprvergrid'); // id of table
              tab=$clonedTable[0];
             /*for(j = 0 ; j < tab.rows.length ; j++) 
              {     
                    tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
                    //tab_text=tab_text+"</tr>";
              } */             
				for(j = 0 ; j < tab.rows.length ; j++) 
				{ 
				    if(tab.rows[j].childNodes.length>0)
				    {
					    for(var k=0;k<tab.rows[j].childNodes.length;k++)
					      {
						      	if(tab.rows[j].childNodes[k].className=="excelhide")
						        {
						        	//tab.rows[j].childNodes[k].remove();
						        	tab.rows[j].childNodes[k].parentElement.removeChild(tab.rows[j].childNodes[k]);
						        	
						        }						        
						       if(j==0 && tab.rows[j].childNodes[k].localName=='td')
						       {
							       	if(tab.rows[j].childNodes[k].childNodes[0].firstElementChild.className=="filter")
							        {
							        	tab.rows[j].childNodes[k].childNodes[0].firstElementChild.parentElement.removeChild(tab.rows[j].childNodes[k].childNodes[0].firstElementChild);
							        }
						       } 						        
					      }					      
				    }
					if(j==0)
					{
						tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
					}
					else{
						tab_text=tab_text+"<tr>"+tab.rows[j].innerHTML+"</tr>";
					}
				}				
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
                          /*var a = document.createElement('a');
						    a.href = 'data:application/vnd.ms-excel,' +  encodeURIComponent(tab_text);
						    a.download = 'rxe_data' + '.xls';
						    a.click();*/                         			                          
                                }
                                



                                                            