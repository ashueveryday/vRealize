// VMware vRealize Orchestrator action sample
//
// Returns the parent of a given vCACCAFE:CatalogResource
// For example, find the Deployment resource of a Machine
// 
// For vRA 7.0+/vRO 7.0+
//
// Action Inputs:
// childCatalogResource - vCACCAFE:CatalogResource - catalog resource for which to get the parent
// cafeHost - vCACCAFE:VCACHost - vRA CAFE host
//
// Return type: Any - the value for the given key

var parentId = childCatalogResource.parentResourceRef.getId();

return vCACCAFEEntitiesFinder.getCatalogResource(cafeHost, parentId) ;
