# VMware vRealize Automation API sample in PowerSHell
#
# Submits a catalog item request via the vRA API
# 
# For vRO 7.0+


#set global variables
$baseUrl = 'https://vra01a.corp.local'
$catalogItemName = 'HVD 7'
$machine = 'tnhvd00004'
$vrauser = 'myuser'
$vrapass = 'mypassword'
$tenant = 'dev02'

#connect to AppHost
$url = "$baseUrl/identity/api/tokens"
$req = [System.Net.WebRequest]::Create($url) 
$req.Method ="POST"
$req.Contenttype = "application/json"
$Body = [byte[]][char[]] '{"username":"$vrauser","password":"$vrapass","tenant":"$tenant"}';
$Stream = $req.GetRequestStream();
$Stream.Write($Body, 0, $Body.Length);
$Stream.Flush();
$Stream.Close();
$response = $req.GetResponse();
$reader = new-object System.IO.StreamReader($response.GetResponseStream())
$stuff = $reader.ReadToEnd() 
$obJson = $stuff | ConvertFrom-Json
$jID = $obJson.id
$jExpires = $obJson.expires

#get machine by name
$url = "$baseUrl/catalog-service/api/consumer/resources?`$filter=name+eq+'$machine'"
$req = [System.Net.WebRequest]::Create($url) 
$req.Method ="GET"
$req.Headers.Add('Authorization','Bearer ' + $jID)
#$Stream = $req.GetRequestStream();
$response = $req.GetResponse();
$reader = new-object System.IO.StreamReader($response.GetResponseStream())
$stuff = $reader.ReadToEnd()
$obJson = $stuff | ConvertFrom-Json
$obJson.content | select id, name, status, description, providerBinding
$arrContent = $obJson.content | select id, name, ProviderBinding | Where-Object {$_.name -eq $machine}
$CatResID = $arrContent.id
$BindingID = $arrContent.providerBinding.bindingId

#alternative: get list of machines then find machine by name
$url = "$baseUrl/catalog-service/api/consumer/resources/types/Infrastructure.Machine/?page=1&limit=99999"
$req = [System.Net.WebRequest]::Create($url) 
$req.Method ="GET"
$req.Headers.Add('Authorization','Bearer ' + $jID)
#$Stream = $req.GetRequestStream();
$response = $req.GetResponse();
$reader = new-object System.IO.StreamReader($response.GetResponseStream())
$stuff = $reader.ReadToEnd()
$obJson = $stuff | ConvertFrom-Json
$obJson.content | select id, name, status, description, providerBinding
$arrContent = $obJson.content | select id, name, ProviderBinding | Where-Object {$_.name -eq $machine}
$CatResID = $arrContent.id
$BindingID = $arrContent.providerBinding.bindingId

########## example 1
$vCenterAction = 'change lease'

#Get Action id  - list of actions using previous machines id  
$url = "$baseUrl/catalog-service/api/consumer/resources/$CatResID/actions"
$req = [System.Net.WebRequest]::Create($url) 
$req.Method ="GET"
$req.Headers.Add('Authorization','Bearer ' + $jID)
$response = $req.GetResponse();
$reader = new-object System.IO.StreamReader($response.GetResponseStream())
$stuff = $reader.ReadToEnd()
$obJson = $stuff | ConvertFrom-Json
$AcID = $obJson.content | select name, id | Where-Object {$_.name -eq $vCenterAction}
$actionID = $AcID.id

#Get the template for the action
$url = "$baseUrl/catalog-service/api/consumer/resources/$CatResID/actions/$actionID/requests/template"
$headers = @{}
$headers.Add('Authorization','Bearer ' + $jID)
$R=Invoke-WebRequest $url -SessionVariable fb -Headers $headers
$Form = $R.Content | ConvertFrom-Json
$Form.data.'provider-ExpirationDate' = $null

#submit action request
$url = "$baseUrl/catalog-service/api/consumer/resources/$CatResID/actions/$actionID/requests/"
$headers = @{}
$headers.Add('Authorization','Bearer ' + $jID)
$headers.Add("accept","application/json")
$cjson = $Form  | ConvertTo-Json
$K=Invoke-WebRequest $url -Headers $headers -Method POST -Body $cjson -ContentType "application/json"
if ($K.StatusCode -eq 201) {write-host "successfully posted $vCenterAction"}

#Get lease information
$url = "$baseUrl/catalog-service/api/consumer/resources/$CatResID/"
$req = [System.Net.WebRequest]::Create($url) 
$req.Method ="GET"
$req.Headers.Add('Authorization','Bearer ' + $jID)
$response = $req.GetResponse();
$reader = new-object System.IO.StreamReader($response.GetResponseStream())
$stuff = $reader.ReadToEnd()
$obJson = $stuff | ConvertFrom-Json
$obJson.lease
$objson.destroyDate

########## example 1
$vCenterAction = 'reconfigure'

#Get Action id  - list of actions using previous machines id  
$url = "$baseUrl/catalog-service/api/consumer/resources/$CatResID/actions"
$req = [System.Net.WebRequest]::Create($url) 
$req.Method ="GET"
$req.Headers.Add('Authorization','Bearer ' + $jID)
$response = $req.GetResponse();
$reader = new-object System.IO.StreamReader($response.GetResponseStream())
$stuff = $reader.ReadToEnd()
$obJson = $stuff | ConvertFrom-Json
$AcID = $obJson.content | select name, id | Where-Object {$_.name -eq $vCenterAction}
$actionID = $AcID.id

#get action template
$url = "$baseUrl/catalog-service/api/consumer/resources/$CatResID/actions/$actionID/requests/template"
$headers = @{}
$headers.Add('Authorization','Bearer ' + $jID)
$R=Invoke-WebRequest $url -Headers $headers
$Form = $R.Content | ConvertFrom-Json
$Form.data.cpu = 8
$Form.data.memory = 8192 

#change disk0 size
$disk0Size = 200
$Form.data.disks[0].data.size = $disk0Size

#change custom property
$propName = 'vmconfig.cpuid.corespersocket'
$propValue = 4
$Form.data.customProperties.data | where-object {$_.id -eq $propName} | %{ $_.value = $propValue }

#request action
$url = "$baseUrl/catalog-service/api/consumer/resources/$CatResID/actions/$actionID/requests/"
$headers = @{}
$headers.Add('Authorization','Bearer ' + $jID)
$cjson = $Form  | ConvertTo-Json -Depth 10
$K=Invoke-WebRequest $url -Headers $headers -Method POST -Body $cjson -ContentType "application/json" 
if ($K.StatusCode -eq 201) {write-host "successfully posted $vCenterAction"}
