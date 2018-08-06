// VMware vRealize Orchestrator action sample
//
// This sample retrieves the value of an attribute defined in a configuration element
// 
// For vRO 6.0+
//
// Action Inputs:
// configurationCategoryPath - string - Path of the configuration element; e.g., PSO/VAPI/
// configurationName - string - name of the configuration element
// attributeName - string - name of the attribute in the configuration element
//
// Return type: ConfigurationElement

var category = Server.getConfigurationElementCategoryWithPath(configurationCategoryPath);
if (!category) {
	throw "Missing configuration element category " + configurationCategoryPath;
}

for each (var configuration in category.configurationElements) {
	if (configuration.name === configurationName) {
		return configuration;
	}
}

System.warn("Cannot find " + configurationCategoryPath + "/" + configurationName + " configuration element");

return null;
