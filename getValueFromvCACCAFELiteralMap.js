// VMware vRealize Orchestrator action sample
//
// Returns the value of a given key defined in a vCACCAFE:vCACCAFELiteralMap
// Performs depth-first search
// 
// For vRA 7.0+/vRO 7.0+
//
// Action Inputs:
// map - Any - the vCACCAFE:vCACCAFELiteralMap to parse
// key - string - Key for searching in the literal map
//
// Return type: Any - the value for the given key

return getValueFromDataMap(map, key);


function getValueFromDataMap(map, key) {
	var mapKeys = map.keySet();
	var data;

	for each (var mapKey in mapKeys) {
		//System.debug("key: " + mapKey);
		data = map.get(mapKey);
		
		if (mapKey === key) {
			System.log(mapKey + ": " + data);
			return (data) ? data.value : null;
		}
		
		if (data) {
			if (System.getObjectType(data.value) === null) {
				try {
					data = getValueFromRequestDataMap(data.value, key);
					if (data) return data;
				} catch(e) {
					System.error(e);
				}
			}
		}
	}
	
	return null;
}
