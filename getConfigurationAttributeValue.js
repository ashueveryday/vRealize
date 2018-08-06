// VMware vRealize Orchestrator action sample
//
// This sample retrieves the value of an attribute defined in a configuration element
// Note: This calls another action defined in getConfigurationElement.js
// 
// For vRO 6.0+
//
// Action Inputs:
// configurationCategoryPath - string - Path of the configuration element; e.g., PSO/VAPI/
// configurationName - string - name of the configuration element
//
// Return type: Any

var attribute;
var configElement = getConfigurationElement(configurationCategoryPath, configurationName);

if (!configElement) {
	throw "Missing configuration element " + configurationCategoryPath + "/" + configurationName;
}

attribute = configElement.getAttributeWithKey(attributeName);

if (attribute) {
	return attribute.value;
}

System.warn("Cannot find attribute " + attribute + " in " + configurationCategoryPath + "/" + configurationName + " configuration element");

return null;
