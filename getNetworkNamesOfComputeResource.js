// VMware vRealize Orchestrator action sample
//
// Get the network names of a compute resource (IaaS)
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// vcacHost - vCAC:VCACHost - vRA IaaS Host
// reservationEntity - vCAC:Entity - Compute resource entity
//
// Return type: Array/string - Network names

if (vcacHost == null) return null;
if (computeResourceEntity == null) return null;

var networkNames = [];
var nicEntity;
var linkEntities = computeResourceEntity.getLink(vcacHost, "HostNics");

for each (var n in linkEntities) {
	nicEntity = getNicEntityById(vcacHost.id, n.getProperty("HostNicID"));
	if (nicEntity) {
		networkNames.push(nicEntity.getProperty("HostNicName"));
	}
}

return networkNames.sort();


function getNicEntityById(hostId, id) {
	var model = "ManagementModelEntities.svc";
	var entitySetName = "HostNics";
	
	var filters = new Properties();
	filters.put("HostNicID", id);

	return vCACEntityManager.readModelEntity(hostId, model, entitySetName, filters, null);
}
