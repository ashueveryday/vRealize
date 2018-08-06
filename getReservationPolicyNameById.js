// VMware vRealize Orchestrator action sample
//
// Get the name of a vRA reservation policy given its ID
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// cafeHost - vCACCAFE:VCACHost - vRA host
// reservationPolicyId - string - Reservation policy ID
//
// Return type: string - Reservation policy name, or null if no match is found

var reservationPolicy = vCACCAFEEntitiesFinder.getReservationPolicy(cafeHost, reservationPolicyId);

if (!reservationPolicy) return null;

return reservationPolicy.name;
