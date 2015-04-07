var app = angular.module('testApp', ['tableGistogram']);

app.controller('mainCtrl', ['$scope', function($scope){


}])



jQuery(document).ready(function($) {
        jQuery('#show-gistogram').click(function(event) {
           jQuery('#' + jQuery(this).data('table')).addClass('tg-activate');
        });

        jQuery('#hide-gistogram').click(function(event) {
            jQuery('#' + jQuery(this).data('table')).removeClass('tg-activate');
        });

        jQuery('#remove-gistogram').click(function(event) {
        });
});
