// VMware vRealize Orchestrator action sample
//
// Get all the reservation policies of a vRA instance
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// cafeHost - vCACCAFE:VCACHost - vRA host
//
// Return type: Array/Any - Collection of vCACCAFE:vCACCAFEReservationPolicy

var client = cafeHost.createReservationClient();
var rsvpService = client.getReservationReservationPolicyService();
var reservationPolicies = rsvpService.getAllReservationPolicies().getContent();

return reservationPolicies;
