// VMware vRealize Orchestrator action sample
//
// Creates a simple Mime document
// 
// For vRO 7.0+
//
// Action Inputs:
// name - string - Name to call the Mime document
// mimeType - string - MIME type (See https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)
// contents - string - Contents of the Mime document
//
// Return type: MimeAttachment - the Mime document

function createMime(name, mimeType, contents) {
  var mime = new MimeAttachment();
  mime.name = name;
  mime.mimeType = mimeType;
  mime.content = contents;
  
  return mime;
}
