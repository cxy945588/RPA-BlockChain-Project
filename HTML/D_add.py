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

# 第一個專案-新增例行檢查資料
startInfo1 = {
    "ReleaseKey": "3e828620-5c7a-407c-bfab-ecc2fdfeefd5",
    "Strategy": "ModernJobsCount"
}

data1 = {
    "startInfo": startInfo1
}

json_data1 = json.dumps(data1)

r1 = requests.post("https://platform.uipath.com/qqbaby/DefaultTenant/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",
                   data=json_data1, headers=headers1)
print(r1.content)

# 第二個專案-IPFS_upload_and_copy_CID
startInfo2 = {
    "ReleaseKey": "a88cf3d1-3ad6-4f3d-b27b-38d11c0f5fd2",
    "Strategy": "ModernJobsCount"
}

data2 = {
    "startInfo": startInfo2
}

json_data2 = json.dumps(data2)

r2 = requests.post("https://platform.uipath.com/qqbaby/DefaultTenant/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",
                   data=json_data2, headers=headers1)
print(r2.content)

# 第三個專案-複製CID到IPFS
# startInfo3 = {
#     "ReleaseKey": "973fc557-d61c-4b34-b735-907e91dc2ed1",
#     "Strategy": "ModernJobsCount"
# }

# data3 = {
#     "startInfo": startInfo3
# }

# json_data3 = json.dumps(data3)

# r3 = requests.post("https://platform.uipath.com/qqbaby/DefaultTenant/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",
#                    data=json_data3, headers=headers1)
# print(r3.content)
