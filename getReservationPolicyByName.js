// VMware vRealize Orchestrator action sample
//
// Get a vRA reservation policy given its name
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// cafeHost - vCACCAFE:VCACHost - vRA host
// name - string - Reservation policy name
//
// Return type: Any - A single vCACCAFE:vCACCAFEReservationPolicy

var client = cafeHost.createReservationClient();
var rsvpService = client.getReservationReservationPolicyService();
var reservationPolicies = rsvpService.getAllReservationPolicies().getContent();

for each (var reservationPolicy in reservationPolicies) {
	if (reservationPolicy.getName() === name) {
		return reservationPolicy;
	}
}

return null;
