// VMware vRealize Orchestrator action sample
//
// Sends an email
// Almost identical to library workflow "Send notification to mailing list", but with option to add attachments
// 
// For vRO 7.0+
//
// Action Inputs:
// smtpHost - string - SMTP host
// smtpPort - number - SMTP port
// username - string - Username for authentication
// password - SecureString - Password for authentication
// fromName - string - Sender's name
// fromAddress - string - Sender's address
// toAddressList - Array/string - List of destination addresses
// subject - string - Email subject
// content - string - Email content (text or HTML)
// ccList - Array/string - List of carbon copy addresses
// bccList - Array/string - List of blind carbon copy addresses
// useSsl - boolean - If set to true, use SSL to connect
// useStartTls - boolean - If true, enables the use of the STARTTTLS command
// ccList - Array/string - List of carbon copy addresses
// attachments - Array/MimeAttachment - Optional list of Mime attachments to add
//
// Return type: Any - the value for the given key

function convertToComaSeparatedList( arrayList ){
	// Build Coma Seperated list from an Array
	
	if ( arrayList == null || arrayList.length == 0) {
		return null
	}
	
	var outStr = "";
	for ( var i=0; i<arrayList.length; i++ ){
		outStr += arrayList[i] + ",";
	}
	if ( outStr.length > 0 ){
		outStr = outStr.substring( 0, ( outStr.length-1 ) );
	}
	return outStr;
}

var message = new EmailMessage();

// Override default settings if and only if input parameter is set
if ( smtpHost != null && smtpHost.length > 0 ){
	message.smtpHost = smtpHost;
}
if ( smtpPort != null && smtpPort > 0 ){
	message.smtpPort = smtpPort;
}
if ( username !=null && username.length > 0){
	message.username = username;
}
if ( password != null && password.length > 0){
	message.password = password;
}
if ( fromName != null && fromName.length > 0){
	message.fromName = fromName;
}
if ( fromAddress != null && fromAddress.length > 0){
	message.fromAddress = fromAddress;
}

if ( useSsl ){
	message.useSsl = true;
}

if ( useStartTls ){
	message.useStartTls = true;
}

// Build Address Lists
message.toAddress = convertToComaSeparatedList(toAddressList);
message.ccAddress = convertToComaSeparatedList(ccList);
message.bccAddress = convertToComaSeparatedList(bccList);

message.subject = subject;
message.addMimePart(content,"text/html; charset=UTF-8");

// Add attachments
if (attachments && attachments.length !== 0) {
	for each (var a in attachments) {
		message.addMimePart(a, a.mimeType);
	}
}

System.log( "sending mail to host: " + message.smtpHost + ":" + message.smtpPort + " with user:" + message.username 
			+ ", from:" + message.fromAddress + ", to:" + message.toAddress );
			
message.sendMessage();
