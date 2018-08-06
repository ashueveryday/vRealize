// VMware vRealize Orchestrator action sample
//
// Use VM-host compatibility checker, which is native to the vCenter plugin,
// to determine if a host is compatible with a given VM and resource pool
// 
// For vRO 7.0+/vCenter 6.0+
//
// Action Inputs:
// host - VC:HostSystem - vCenter host
// vm - VC:VirtualMachine - vCenter VM
// pool - VC:Resource Pool - vCenter resource pool
//
// Return type: boolean - is true if the host is compatible

var vcTask;
var sdkConnection = host.sdkConnection;

var testTypes = [];
if (host) testTypes.push(VcCheckTestType.hostTests);
if (pool) testTypes.push(VcCheckTestType.resourcePoolTests);

System.debug("Checking compatibility of host " + host.name + " with VM template " + vm.name);

try {
	vcTask = sdkConnection.vmCompatibilityChecker.checkCompatibility_Task(vm, host, pool, testTypes);
	
	//wait for the task to finish
	System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(vcTask,false,10);
	
	System.debug("  VM-Host compatibility check state: " + vcTask.info.state);
	System.debug("  VM-Host compatibility check error (if any): " + vcTask.info.error);
	
	//assumes a successful task means that the host is compatible
	return vcTask.info.state == VcTaskInfoState.success;
} catch (e) {
	System.error("Error while checking host for compatibility: " + e);
}

return false;
