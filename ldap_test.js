var LdapAuth = require('ldapauth');
var options = {
    url: '',
    adminDn: "",
    adminPassword:  "",
    searchBase: "",
    searchFilter: ""
    
};

var auth = new LdapAuth(options);

var username = "";
var password = "";
auth.authenticate(username, password, function(err, user) { 
        console.log("err =", err);
        console.log("user =", user);

});

auth.close(function(err) {
        console.log("close err =", err);
});

