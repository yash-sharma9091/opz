angular.module('google-signin', []).provider('GoogleSignin', [function() {
    var options = {};
    this.setClientId = function(clientId) {
        options.client_id = clientId;
        return this;
    };
    this.getClientId = function() {
        return options.client_id;
    };
    this.setCookiePolicy = function(cookiePolicy) {
        options.cookie_policiy = cookiePolicy;
        return this;
    };
    this.getCookiePolicy = function() {
        return options.cookie_policiy;
    };
    this.setFetchBasicProfile = function(fetchBasicProfile) {
        options.fetch_basic_profile = fetchBasicProfile;
        return this;
    };
    this.getFetchBasicProfile = function() {
        return options.fetch_basic_profile;
    };
    this.setHostedDomain = function(hostedDomain) {
        options.hosted_domain = hostedDomain;
        return this;
    };
    this.getHostedDomain = function() {
        return options.hosted_domain;
    };
    this.setOpenIDRealm = function(openIDRealm) {
        options.openid_realm = openIDRealm;
        return this;
    };
    this.getOpenIDRealm = function() {
        return options.openid_realm;
    };
    options.scopes = ['profile', 'email'];
    this.setScopes = function(scopes) {
        options.scopes = scopes;
        return this;
    };
    this.getScopes = function() {
        return options.scopes;
    };
    this.init = function(customOptions) {
        angular.extend(options, customOptions);
    };
    this.$get = ['$rootScope', '$q', function($rootScope, $q) {
        var auth2;
        var NgGoogle = function() {};
        NgGoogle.prototype.signIn = function(loginOptions) {
            return _wrapInAngularPromise(auth2.signIn(loginOptions));
        };
        NgGoogle.prototype.signOut = function() {
            return _wrapInAngularPromise(auth2.signOut());
        };
        NgGoogle.prototype.grantOfflineAccess = function(options) {
            return _wrapInAngularPromise(auth2.grantOfflineAccess(options));
        };
        NgGoogle.prototype.isSignedIn = function() {
            return auth2.isSignedIn.get();
        };
        NgGoogle.prototype.getUser = function() {
            return auth2.currentUser.get();
        };

        NgGoogle.prototype.getBasicProfile = function() {
            var currentUser = this.getUser().getBasicProfile();
            var profile = null;
            if (currentUser) {
                profile = {
                    id: currentUser.getId(),
                    name: currentUser.getName(),
                    image: currentUser.getImageUrl(),
                    email: currentUser.getEmail()

                };
            }
            return profile;
        };
        NgGoogle.prototype.disconnect = function() {
            auth2.disconnect();
        };
        NgGoogle.prototype._loadCallback = function() {
            gapi.load('auth2', _initializeOnLoad);
        };
        return new NgGoogle();

        function _initializeOnLoad() {
            auth2 = gapi.auth2.init(options);
            auth2.currentUser.listen(function(user) {
                $rootScope.$broadcast('ng-google-signin:currentUser', user);
                $rootScope.$apply();
            });
            auth2.isSignedIn.listen(function(isSignedIn) {
                $rootScope.$broadcast('ng-google-signin:isSignedIn', isSignedIn);
                $rootScope.$apply();
            });
        }

        function _wrapInAngularPromise(googleThenable) {
            var deferred = $q.defer();
            googleThenable.then(deferred.resolve, deferred.reject);
            return deferred.promise;
        }
    }];
}]).run(['$window', 'GoogleSignin', function($window, GoogleSignin) {
    $window._startGoogleSignin = GoogleSignin._loadCallback;
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/client:platform.js?onload=_startGoogleSignin';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
}]);