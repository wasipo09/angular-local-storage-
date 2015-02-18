//Angular Backend
var app = angular.module('testApp', []);

//DataStore Service
app.factory('DataStore', function($window) {
   var ds = {};
   ds.getData = function(key) {
      return JSON.parse($window.localStorage.getItem(key));
   };
   ds.setData = function(key, value) {
      $window.localStorage.setItem(key, JSON.stringify(value));
   };
   ds.removeKey = function(key) {
      $window.localStorage.removeItem(key);
   };
   return ds;
});

//Login Controller
app.controller('loginController', function(DataStore){
   var vm = this;
   var constructor = function() {
      //Generate dummy users
      var data = DataStore.getData('users');
      var users = [{id:1, user:"foo", pass:"bar", name:"Foobar"},
                   {id:2, user:"test", pass:"test", name:"Admin"}];
      if (!data) 
      DataStore.setData('users', users);
   };
   constructor(); //Call constructor
   
   vm.login = function(id) {
      if (id) {
         DataStore.setData('currentUserId', id); 
         window.location.href = "/dash.html";
      }     
   };
});

app.controller('dashboardController', function(DataStore) {
   var vm = this;
   var constructor = function() {
      var id = DataStore.getData('currentUserId');
      if (!id){
         alert('Login First');
         window.location.href = "/index.html";
      }
      var query = DataStore.getData('users').filter(function(item) {
         return (item.id == id);
      });
      vm.currentUser = query[0].user;
      vm.helloMessage = 'Welcome, ' + query[0].user;
   };
   vm.currentUser = {};
   vm.logout = function() {
      DataStore.removeKey('currentUserId');
      window.location.href = "/index.html";
   }
   
   constructor(); //Call constructor
});
    


