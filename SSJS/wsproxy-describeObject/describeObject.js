<script runat='server'>
Platform.Load("core", "1.1.1");
 
//Returns all retrievable columns from a soap object and puts them in an array
//Takes a SOAP Object Type as a string
function getSoapCols(objectType) {
    var cols = [];
    var prox = new Script.Util.WSProxy();
    var res = prox.describe(objectType);

    //Get Properties
    var props = res.Results[0].Properties;

    for (i = 0; i < props.length; i++) {
        if (props[i].IsRetrievable) {
            var col = props[i].Name;
            cols.push(col);
        };
    };

    Write(objectType + " cols: " + Stringify(cols) + "<br><br><br>");

    return cols;
};


//Makes a Filtered WSProxy Call with the Columns from the initial describe
//Takes a SOAP Object Type as a string, the Cols array variable, and the Filter variable
function wsProxyRetreive(objectType, cols, filter) {
    var prox = new Script.Util.WSProxy(),
        //Identify ObjectType, Columns to retreive, and Filter here
        objectType = objectType,
        cols = cols,
        filter = filter,
        moreData = true,
        reqID = null,
        numItems = 0;

    //Allows for pagination of results    
    var data = prox.retrieve(objectType, cols, filter) 
        
    Write("WSProxy Response: " + Stringify(data) + "<br><hr><br>");
  return data
  
}


//Sets the Object Type
var objectType = "DataExtension";
//Initiates the describe function
var cols = getSoapCols(objectType);
//Sets the filter for the WSProxy Retreive
var filter = {
    Property: "Name",
    SimpleOperator: "equals",
    Value: "JourneySendsSummary"
};
//Initiates the WSProxy Retreive
var deData = wsProxyRetreive(objectType, cols, filter);
  
//Set the Results array to a var
var de = deData.Results[0];
  
//Parse out the columns
var customerKey = de.CustomerKey;
var Name = de.Name;

Write("DE CustomerKey: " + customerKey + "<br>");
Write("DE Name: " + Name + "<br>");
  
</script>