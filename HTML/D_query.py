import requests
import json


data = {
    "grant_type": "refresh_token",
    "client_id": "8DEv1AMNXczW3y4U15LL3jYf62jK93n5",
    "refresh_token": "Lxp-sbQm4IDKDYSYUcHHa591Qe1Q90b0pkFtKdBBhvI19"
}

headers = {
    "Content-Type": "application/json",
    "X-UIPATH-TenantName": "DefaultTenant"
}

r = requests.post("https://account.uipath.com/oauth/token", data, headers)
response = json.loads(r.content)
auth = "Bearer " + response["access_token"]

headers1 = {
    "Content-Type": "application/json",
    "X-UIPATH-TenantName": "DefaultTenant",
    "X-UIPATH-OrganizationUnitId": "4912146",
    "Authorization": auth
}


# 第三個專案-查詢並製作憑證
startInfo3 = {
    "ReleaseKey": "f7d48c0f-b8a2-4150-8e82-ebe92c8717c7",
    "Strategy": "ModernJobsCount"
}

data3 = {
    "startInfo": startInfo3
}

json_data3 = json.dumps(data3)

r3 = requests.post("https://platform.uipath.com/qqbaby/DefaultTenant/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",
                   data=json_data3, headers=headers1)
print(r3.content)


