// VMware vRealize Orchestrator action sample
//
// Get the reservations of a vRA compute resource
// For vRO/VRA 7.0+
//
// Action Inputs:
// cafeHost - vCACCAFE:VCACHost - vRA host
// computeResourceName - string - Compute resource name
//
// Return type: Array/vCACCAFE:Reservation - Reservations of compute resource

var reservations = [];

var client = host.createReservationClient();
var service = client.getReservationReservationService();
var allReservations = service.getAllReservations().getContent(); //Array, vCACCAFE:vCACCAFEReservation

//looks for a compute resource like MYCLUSTER (...)
var filter = new RegExp(computeResourceName + " \\(", "i");

for each (var reservation in allReservations) {
	System.debug("computeResource.label: " + reservation.extensionData.get("computeResource").getLabel());
	System.debug("computeResource.id: " + reservation.extensionData.get("computeResource").getId());
	System.debug("computeResource.componentId: " + reservation.extensionData.get("computeResource").getComponentId());
	System.debug("computeResource.classId: " + reservation.extensionData.get("computeResource").getClassId());
	if (reservation.extensionData.get("computeResource").getLabel().search(filter) == 0) {
		System.log("Reservation '" + reservation.name + "' found in vCACCAFE inventory for compute resource '" + computeResource + "'");
		reservations.push(reservation);
		// Note: Can return array of Reservation Policy IDs instead:
		// reservationPolicyIds.push( reservation.getReservationPolicyId() );
	}
}

return reservations;
