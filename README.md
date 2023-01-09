## OneDrive File Browser

### Setup

**Under API Permissions (Azure AD: Register app)**
Add ``Files.Read.All``, ``Sites.Read.All``, Leave ``User.Read`` for Graph delegated permissions
Add ``AllSites.Read``, ``MyFiles.Read`` for SharePoint delegated permissions

### Picker configuration in code

See [Schema](https://learn.microsoft.com/en-us/onedrive/developer/controls/file-pickers/v8-schema?view=odsp-graph-online) on how to configure the picker

Picker url is on the format ``{baseUrl}/_layouts/15/FilePicker.aspx``

The {baseUrl} value above is either the SharePoint web url<br>
``<Browser baseUrl="https://{baseurl}.sharepoint.com/" getToken={getToken} options={paramsTest} />``

### References

#### OneDrive File Picker v8

[Samples](https://github.com/OneDrive/samples/tree/master/samples/file-picking)

[Documentation](https://learn.microsoft.com/en-us/onedrive/developer/controls/file-pickers/?view=odsp-graph-online)



