// VMware vRealize Orchestrator action sample
//
// This sample returns the ID of a vCenter Tag Category given its name
// 
// For vRO/VAPI 7.0+
//
// Action Inputs:
// endpoint - VAPIEndpoint - VAPI Endpoint
// categoryName - string - Name of the vCenter Tag Category
//
// Return type: string

var client = endpoint.client();
var catService = new com_vmware_cis_tagging_category(client);
var categories = catService.list();

for each (var catId in categories) {
	if (catService.get(catId).name === categoryName) {
		System.debug("Found tag category with name '" + categoryName + "' with ID '"+ catId +"'");
		return catId;
	}
}

System.warn("No tag category found with name '" + categoryName + "'");

return null;
