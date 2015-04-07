var tableGistogram = angular.module('tableGistogram', []);
tableGistogram.directive('tableGistogram', function(){

    var defaults =  {
                    bgcolor         : '#ffcc00',        // gistogram color
                    opacity         : 1,                // gistogram lines opacity
                    activationClass : 'tg-activate',    // class for switching 
                    activeByDefault : true              // show immediately or not
                    };

    return {
        restrict    : 'AC',
        replace     : false,
        scope       : {
            'tgdataindex' : '=',
            'tgopacity'   : '=',
            'tgbgcolor'   : '='
        },
        link : function(scope, iElement, iAttr){


                //initial drawing the lines and calculating
                //
                var numberOfLines = iElement.find('tbody').children().length - 1;
                var tableLines = iElement.find('tbody').find('tr');

                //collect data about the table : height of the lines and width
                var parentDimensions = tableLines[0].getBoundingClientRect();
                
                var wrapperDiv = document.createElement('div');
                wrapperDiv.className = 'tg gistogram__data';
                wrapperDiv.style.bottom = (numberOfLines+1)*parentDimensions.height + 'px';

                //calculating max value across the table
                var valuesArray = [];
                for (var i = 0; i <= numberOfLines; i++) {
                    valuesArray.push(angular.element(angular.element(tableLines[i]).find('td')[(iAttr.tgdataindex-1)]).text());
                }
                var maxValue = Math.max.apply(null, valuesArray);

                //drawing divs
                for (var i = 0; i <= numberOfLines; i++) {
                    var tmpDiv = document.createElement('div');
                    tmpDiv.className            = 'tg gistogram__line';
                    tmpDiv.style.width          = (valuesArray[i]/maxValue)*100 + '%';
                    tmpDiv.style.background     = iAttr.tgbgcolor || defaults.bgcolor;
                    tmpDiv.style.opacity        = iAttr.tgopacity || defaults.opacity;
                    tmpDiv.style.height         = parentDimensions.height + 'px';
                    tmpDiv.setAttribute('data', 'width : ' + (valuesArray[i]/maxValue)*100);

                    wrapperDiv.appendChild(tmpDiv);
                };


                iElement.wrap('<div class="tg gistogram__wrapper"/>');
                iElement.after(wrapperDiv);
                if(defaults.activeByDefault) iElement.addClass(defaults.activationClass);

                //listening to the class changes
                scope.$watch(function() {
                  return iElement.attr('class');
                }, function(newValue, oldValue) {
                  if (newValue.indexOf(defaults.activationClass) > -1 ){

                    jQuery('.gistogram__line').each(function(index, item) {
                       jQuery(item).width(jQuery(item).data('width') + '%');
                    });

                  } else {

                     jQuery('.gistogram__line').each(function(index, item) {
                         jQuery(item).width(0);
                    });

                  }
                });
        }
    }
})