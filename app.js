var app = angular.module('testApp', []);

app.factory('Login', function($location) {
    var login = {};
    
    login.data = "";
    login.get = function() {
        return this.data;
    };
    login.set = function(text) {
        this.data = text;
    };
    return login;
});

app.controller('loginController', function(Login) {
    var vm = this;
    vm.text = Login.get();
    vm.send = function() {
        Login.set('Hello World');  
        this.text = Login.get();
        window.location.href = '/dash.html';
    };
});

app.controller('dashController', function(Login) {
    var vm = this;
    vm.text = Login.get();
    vm.send = function() {
        //Login.set('Hello World');  
        this.text = Login.get();
    };
});
