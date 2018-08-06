// VMware vRealize Orchestrator action sample
//
// Get all the managed VMs in a vRA IaaS instance
// 
// For vRO/VRA 7.0+
//
// Action Inputs:
// host - vCAC:VCACHost - vRA IaaS Host
//
// Return type: Array/vCAC:VirtualMachine - all managed VMs in a vRA instance

var result = [];

if (host == null) return result;

var properties = new Properties();
properties.put("IsManaged", true);

var entities = vCACEntityManager.readModelEntitiesByCustomFilter(host.id, "ManagementModelEntities.svc", "VirtualMachines", properties, null);

for each( var entity in entities) {
	result.push(entity.getInventoryObject());
}

return result;
