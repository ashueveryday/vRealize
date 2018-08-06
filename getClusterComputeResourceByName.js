// VMware vRealize Orchestrator action sample
//
// Returns the vCenter ClusterComputeResource with the given name
// Assumes there is only 1
// Does a case-insensitive search
// 
// For vRO 7.0+/vCenter 6.0+
//
// Action Inputs:
// clustername - string - Name of the cluster to find
//
// Return type: VC:ClusterComputeResource - the cluster with the given name

var clusters = VcPlugin.getAllClusterComputeResources(null,
	"xpath:matches(translate(name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), '" + clusterName.toLowerCase() + "')");

if (clusters.length > 0) {
	return clusters[0];
}

System.warn("VC:ClusterComputeResource named '" + clusterName + "' not found.");

return null;
