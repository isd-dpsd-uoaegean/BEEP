/*
 * BEEP app
 * Author: Iconize <pim@iconize.nl>
 *
 * Images controller
 */
app.controller('ImagesCtrl', function($scope, $rootScope, $window, $timeout, $location, $filter, $interval, api, $routeParams, ngDialog, hives) 
{

    // settings
    $scope.images                = [];
    $scope.hives                 = [];
    $scope.apiaries              = [];
    $scope.orderName             = 'date';
    $scope.orderDirection        = 'false';
    $scope.size                  = 100;
    $scope.thumbStyle            = {'width':'100px', 'height':'100px', 'display':'inline-block', 'border':'1px solid #333', 'margin':'5px'};
    $scope.labelStyle            = {'font-size':'10px', 'width':'100%', 'text-align':'center'};
 
     // handlers
    $scope.isLoading             = false;
 
    $scope.init = function()
    {
        $scope.hives             = hives.hives;
        $scope.apiaries          = hives.locations_owned;
        $scope.loadImages();
    };

    $scope.loadImages = function()
    {
        $scope.images = api.getApiRequest('images', 'images');
    }

    $scope.updateImages = function(e, data)
    {
        $scope.images = data;
    }
    $scope.imageLoadedHandler = $rootScope.$on('imagesLoaded', $scope.updateImages);

    $scope.setOrder = function(name)
    {
        if ($scope.orderName == name)
        {
            $scope.orderDirection = !$scope.orderDirection;
        }
        else 
        {
            $scope.orderDirection = false;    
        }
        $scope.orderName = name;
    }

    $scope.setSize = function(size)
    {
        $scope.size       = size;
        $scope.thumbStyle = {'width':size+'px', 'height':size+'px', 'display':'inline-block', 'border':'1px solid #999', 'margin':'5px'};
        $scope.labelStyle = {'font-size':(5+2*Math.round(size/50))+'px', 'width':'100%', 'text-align':'center'};
    }

    $scope.natSort = function(a, b) 
    {
        //console.log($scope.orderName, a.value, b.value);
        if ($scope.orderName == 'size')
        {
            return b.value - a.value;
        }
        else if ($scope.orderName == 'date')
        {
            if (a.value == null || a.value == '')
                return -1;

            if (b.value == null || b.value == '')
                return 1;
        }

        return naturalSort(a.value,b.value);
    };

    $scope.back = function()
    {
        if ($rootScope.optionsDialog)
        {
            $rootScope.optionsDialog.close();
        }
        else
        {
            $rootScope.historyBack();
        }
    };

    //close options dialog
    $scope.backListener = $rootScope.$on('backbutton', $scope.back);


    $scope.init();


    // remove the listeners
    $scope.$on('$destroy', function() 
    {
        $scope.removeListeners();
    });


    // remove listeners
    $scope.removeListeners = function()
    {
        $scope.imageLoadedHandler();
        $scope.backListener();
    };

});
