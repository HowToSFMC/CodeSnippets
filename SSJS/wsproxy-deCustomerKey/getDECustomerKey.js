<script runat='server'>
Platform.Load("Core","1")
  
//Get CustomerKey and CategoryID of Data Extension based on DE Name
//Takes an argument of a Data Extension name as a String
function getDEData(arg) {
 var prox = new Script.Util.WSProxy();
 var config = {
  "cols": ["CustomerKey","CategoryID"],
  "filter": {
   "Property": "Name",
   "SimpleOperator": "equals",
   "Value": arg
  }
 };
 try {  
  var result = prox.retrieve("DataExtension", config.cols, config.filter); 
  
  var deData = {
          "customerKey": result.Results[0].CustomerKey,
          "categoryID": result.Results[0].CategoryID
        };
      
  return deData;
 } catch (e) {
  Write(Stringify(e));
 };
};

var deData = getDEData("JourneySendsSummary");
var customerKey = deData.customerKey;
var categoryID = deData.categoryID;
  
Write("Customer Key: " + customerKey + "<br>");
Write("CategoryID: " + categoryID + "<br>");
  
 
</script>