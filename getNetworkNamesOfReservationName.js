// VMware vRealize Orchestrator action sample
//
// Get the network names of a vRA reservation (IaaS)
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// vcacHost - vCAC:VCACHost - vRA IaaS Host
// reservationName - string - Reservation name
//
// Return type: Array/strings - Network names

if (vcacHost == null) return null;
if (reservationName == null) return null;

var networkNames = [];
var reservationEntity = System.getModule("com.vmware.library.vcac").getReservationEntityByName(vcacHost,reservationName);
var linkEntities = reservationEntity.getLink(vcacHost, "HostNicToReservations");
var nicEntity;

for each (var n in linkEntities) {
	//System.log("\tHostNicID  " + n.getProperty("HostNicID"));
	nicEntity = getNicEntityById(vcacHost.id, n.getProperty("HostNicID"));
	if (nicEntity) {
		networkNames.push( nicEntity.getProperty("NetworkName") );
	}
}

return networkNames;


function getNicEntityById(hostId, id) {
	var model = "ManagementModelEntities.svc";
	var entitySetName = "HostNics";
	
	var filters = new Properties();
	filters.put("HostNicID", id);
	
	return vCACEntityManager.readModelEntity(hostId, model, entitySetName, filters, null);
}
