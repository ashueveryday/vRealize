// VMware vRealize Orchestrator action sample
//
// Returns day-2 or resource action request(s) that have been submitted for a vRA catalog resource
// 
// For vRA 7.0+/vRO 7.0+
//
// Action Inputs:
// cafeHost - vCACCAFE:VCACHost - vRA CAFE host
// resource - vCACCAFE:CatalogResource - catalog resource for which to get day-2 requests
// actionLabel - string - optional action label to filter by
//
// Return type: Array/vCACCAFE:ResourceActionRequest - the value for the given key


var resourceActionRequests = new Array();
var allActionRequests = vCACCAFEEntitiesFinder.getResourceActionRequests(host);
var resourceId = resource.id;

//System.log("allActionRequests "+allActionRequests);

for each (request in allActionRequests) {
	if (resourceId == request.resourceRef.getId()) {
		System.log("Found requestID match : "+request.resourceRef.getId());
		if (actionLabel != null && actionLabel != "") {
			System.log("Label defined : "+actionLabel);
			if (actionLabel == request.resourceActionRef.getLabel()) {
				System.log("Label matched action label");
				resourceActionRequests.push(request);
			}
		} else {
			resourceActionRequests.push(request);
			System.log("Label not defined, grabbing action request with label : "+request.resourceActionRef.getLabel());
		}
	}
}

return resourceActionRequests;
