// VMware vRealize Orchestrator action sample
//
// Determine whether the given vCenter VM is a template
// 
// For vRO 7.0+/vCenter 6.0+
//
// Action Inputs:
// vm - VC:VirtualMachine - vCenter VM
//
// Return type: boolean - true if the VM is a template

if (vm.config) {
	if (vm.config.template) {
		return true;
	}
} else if (vm.summary) {
	System.warn("Config info of VM " + vm.name + " is inaccessible. Trying config summary info ...");
	if (vm.summary.config.template) {
		return true;
	}
} else if (!vm.config && !vm.summary) {
	throw "Cannot deteremine if VM " + vm.name + " is a template because its config info and config summary info are both inaccessible";
}

return false;
