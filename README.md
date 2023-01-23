## OneDrive File Browser

Is based on the OneDrive File picker [sample](https://github.com/OneDrive/samples/tree/master/samples/file-picking) from Microsoft, 
but instead of opening up in a new browser window it's displayed inline in an IFrame. 

It uses the [Graph Toolkit](https://docs.microsoft.com/en-us/graph/toolkit/overview) Login component and MsalProvider for authentication and authorization for accessing the Graph API. 



### Setup

**Under API Permissions (Azure AD: Register app)**<br>
Minimal permissions needed: ``Sites.Read.All`` and ``User.Read``<br><br>

To enable File upload; create folder; move files/folders; site pinning; add ``Sites.ReadWrite.All`` instead of ``Sites.Read.All``<br>
Also ``Channel.ReadBasic.All`` should be added to make "In channels" list work and not show an error.
 
### Picker configuration in code

See [Schema](https://learn.microsoft.com/en-us/onedrive/developer/controls/file-pickers/v8-schema?view=odsp-graph-online) on how to configure the picker

Picker url is on the format ``{baseUrl}/_layouts/15/FilePicker.aspx``

The {baseUrl} value above is either the SharePoint web url<br>
``<Browser baseUrl="https://{baseurl}.sharepoint.com/" options={paramsTest} />``

## Usage
### Login
Sign in with your Microsoft account and click "Add files" to open the picker.
![File manager](file-manager.jpg)

### Picker
Select files and click "Select" to add them to the list.
<img src="picker.jpg" alt="drawing" width="773"/>

## References

#### OneDrive File Picker v8

[Samples](https://github.com/OneDrive/samples/tree/master/samples/file-picking)

[Documentation](https://learn.microsoft.com/en-us/onedrive/developer/controls/file-pickers/?view=odsp-graph-online)

#### Graph Toolkit

[GitHub](https://github.com/microsoftgraph/microsoft-graph-toolkit)

[Documentation](https://docs.microsoft.com/en-us/graph/toolkit/overview)

[Playground](https://mgt.dev/)


