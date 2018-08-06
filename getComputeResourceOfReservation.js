// VMware vRealize Orchestrator action sample
//
// Get the compute resource of a vRA reservation (IaaS)
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// vcacHost - vCAC:VCACHost - vRA IaaS Host
// reservationEntity - vCAC:Entity - Reservation entity
//
// Return type: vCAC:Entity - Compute resource entity

var computeResourceEntity;
var linkEntities = reservationEntity.getLink(vcacHost, "Host");

if (linkEntities && linkEntities.length !== 0) {
	computeResourceEntity = linkEntities[0];
}

return computeResourceEntity;
