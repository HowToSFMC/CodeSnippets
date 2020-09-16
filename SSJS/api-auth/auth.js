<script runat='server'>
Platform.Load("Core","1")
  
/*************************************************/
//API Authentication; update: authBase, restBase, clientID, clientSecret vars with details from the SFMC Installed PKG
var authBase = '';
var restBase = '';
var contentType = 'application/json';
var grantType = 'client_credentials';
var mid = '';
  
var clientID = '';
var clientSecret = '';
/*************************************************/

  
//Get Authentication Token
function auth(clientID, clientSecret, contentType, grantType, authBase, mid) {
 //Set Auth URL, and authHeaders
 var url = authBase + 'v2/token';
 var payload = {
  "client_id": clientID,
  "client_secret": clientSecret,
  "grant_type": grantType,
  "account_id": mid
 };
  
 var authPayload = Platform.Function.Stringify(payload);
  
 try {
   var accessTokenResult = HTTP.Post(url, contentType, authPayload);
   var response = accessTokenResult["Response"][0];
   var accessToken = Platform.Function.ParseJSON(response).access_token;
  
      
   return accessToken;
   
 } catch (e) { 
  Write(Stringify(e));
 };
};
  
var accessToken = auth(clientID, clientSecret, contentType, grantType, authBase, mid);
</script>
