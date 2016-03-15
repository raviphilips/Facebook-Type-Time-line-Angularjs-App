var app = angular.module("timeline", []);

app.factory("UpdateTimeline", function($http, $q){
	return function(post) {
		var deferedobject = $q.defer();
		$http.post("/Home/updateTimeline", {post: post}).
			success(function(data){
				deferedobject.resolve({ data: data});
			}).error(function(){
				deferedobject.resolve({ data: false});
			});

			return deferedobject.promise;
	};
});
   

app.factory("LoadTimeline", function($http, $q) {
	return function() {
		var deferedobject = $q.defer();
		$http.post("/Home/loadFunction").
			success(function (data) {
				deferedobject.resolve({ data: data});
			}).error(function () {
				deferedobject.resolve({ data: false});
			});

			return deferedobject.promise;
	};
});

app.controller("timelineController", function ($scope, UpdateTimeline, LoadTimeline, $interval){

	$scope.submitData  = function(post) {
		var result = UpdateTimeline(post);
		result.then(function(output) {
			alert('Data Posted');
			post.header = "";
			post.comment ="";
			$scope.loadTimeline();

		});
	};


	$scope.loadTimeline = function() {
		var result = LoadTimeline();
		result.then(function(output) {
			$scope.timeline = angular.copy(output.data);
		});
	};

	$interval($scope.loadTimeline,30000);

});
