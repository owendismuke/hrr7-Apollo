angular.module('app.landingPage',[])

  .controller('landingPageController', ['$scope', '$http', 'auth', 'store', '$state', '$analytics',
    function ($scope, $http, auth, store, $location, $analytics) {
      $scope.login = function () {
        auth.signin({}, function (profile, token) {
          // Success callback
          $analytics.eventTrack('Login', {category: 'User', label: profile.name});
          store.set('profile', profile);
          store.set('token', token);
          $http.post('/api/getProfile', {id: auth.profile.user_id.split('|')[1]})
        .then(function(res){
          if(!!res.data){
            $state.go('performance');
          } else {
            $state.go('user');
          }
        });
    }, function () {
      // Error callback
    });
  };
}]);

