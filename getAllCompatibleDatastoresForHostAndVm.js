// VMware vRealize Orchestrator action sample
//
// Get all compatible datastores for a given host, resource pool, and virtual machine.
// The datstore must have enough free storage space necessary for the VM, and must be
// accessible and not in an overall status of "Red".
// 
// For vRO 7.0+/vCenter 6.0+
//
// Action Inputs:
// host - VC:HostSystem - vCenter host
// vm - VC:VirtualMachine - vCenter VM
// pool - VC:Resource Pool - vCenter resource pool
//
// Return type: Array/VC:Datastore - datastores compatible with the given host and VM

var compatibleDatastores = [];

// use OOTB function to find all datastores for the given host/pool/VM
var allDatastores = System.getModule("com.vmware.library.vc.datastore").getDatastoreForHostAndResourcePool(host,pool,vm);
var vmStorageNeeded = vm.summary.storage.committed;

System.debug("vm.summary.storage.committed (MB): " + (vmStorageNeeded / 1024 / 1024));

for each (var datastore in allDatastores) {
	datastore.refreshDatastore();
	
	System.debug("Checking compatibility of datastore: " + datastore.name);
	System.debug("  datastore.overallStatus: " + datastore.overallStatus);
	System.debug("  datastore.summary.accessible: " + datastore.summary.accessible);
	System.debug("  datastore.info.freeSpace (MB): " + (datastore.info.freeSpace / 1024 / 1024));
	
	if (datastore.summary.accessible
			&& datastore.overallStatus != VcManagedEntityStatus.red
			&& datastore.info.freeSpace >= vmStorageNeeded) {
		compatibleDatastores.push(datastore);
	}
}

return compatibleDatastores;
