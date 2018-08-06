// VMware vRealize Orchestrator action sample
//
// Get the network profiles of a vRA reservation (IaaS)
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// vcacHost - vCAC:VCACHost - vRA IaaS Host
// reservationEntity - vCAC:Entity - Reservation entity
//
// Return type: Array/vCAC:Entity - Network profile entities

var networkProfileEntities = [];
var entities = getNetworkProfiles(vcacHost);
var linkEntities;
var reservationEntityId = reservationEntity.entityKey.get("HostReservationID");

//System.log("Reservation Entity ID  " + reservationEntityId);

for each (var e in entities) {
	linkEntities = e.getLink(vcacHost, "HostNicToReservations");
	for each (var n in linkEntities) {
		if (reservationEntityId === n.getProperty("HostReservationID")) {
			networkProfileEntities.push(e);
			break;
		}
	}

}

return networkProfileEntities;


function getNetworkProfiles(host) {
	var model = "ManagementModelEntities.svc";
	var entitySetName = "StaticIPv4NetworkProfiles";
	var entities = vCACEntityManager.readModelEntitiesByCustomFilter(host.id, model, entitySetName, null, null);
	
	return entities;
}
