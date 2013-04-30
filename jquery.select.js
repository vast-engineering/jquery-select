/**
 * @author - Branko Sekulic
 *
 * @Usage:       $.fn.selectOverlap()
 *
 *@Additional infos:
 *
 *         Plugin will add 3 class
 *
 *         j-select-holder - with this class you can select all select button accross the site (js class).
 *         j-select-[name] - this class will be assigned if button has name attribute (js class).
 *         select-holder - with this class you can style select button across the site (css class).
 *
 *         Note: Letter: "j-" is reserved letter for javascript, please DON'T use this class for CSS styles
 *
 * @example:
 *         $('select').selectOverlap();
 *
 *      Output:
 *
 *      <div class="j-select-holder select-holder j-select-example" style="position: relative;">
 *          <div style="cursor: pointer; opacity: 1;" class="select-text">Select Make</div>
 *          <select name="example" data-inited="yes" style="cursor: pointer; opacity: 0; position: absolute; top: 0px; left: 10px; width: 100%;">
 *              <option value="">Select Menu</option>
 *              <option value="option1">Option 1</option>
 *              ...
 *          </select>
 *          <span class="arrow-icon"></span>
 *      </div>
 *
 */

(function( $ ) {
    $.fn.selectOverlap = function() {

        var options = {
            'container' : {
                'position' : 'relative'
            },
            'select' : {
                'cursor' : 'pointer',
                'opacity' : '0',
                'position' : 'absolute',
                'top' : '0',
                'left' : '0',
                'width' : '100%'
            },
            'back' : {
                'cursor' : 'pointer'
            }
        };


        /**
         * Updating target with select box value
         * @param {Object} select
         * @param {Object} target
         */
        var change = function(select, target){
            var value = $(select).val();
            value = $(select).find('option[value="' + value + '"]').html();

              $(target).html(value);

              if($(select).find('option').length == 1){
                  $(select).attr('disabled', 'disabled');
                $(target).css('opacity', '0.5');
            }else{
                $(select).removeAttr('disabled');
                $(target).css('opacity', '1');
            }
        };

        $(this).each(function(){

            if($(this).attr('data-inited') == 'yes'){
                change(this, $(this).prev()[0]);
                return;
            }

            $(this).attr('data-inited', 'yes');

            /** container and image holder */
            var container = document.createElement('div');
            var back = document.createElement('div');
            var arrowIcon = document.createElement('span');

            /** Applying styles */
            $(container).addClass('j-select-holder select-holder');
            for(var i in options.container){
                $(container).css(i, options.container[i]);
            }

            // Hover state
            $(container).hover(function(){
                $(this).addClass('hover');
            }, function(){
                $(this).removeClass('hover');
            });

            // Focus state
            $(this).focus(function(){
                $(container).removeClass('hover');
                $(container).addClass('focus');
            }).blur(function(){
                $(container).removeClass('focus');
            });

            if($(this).attr('name')){
                $(container).addClass('j-select-' + $(this).attr('name')  + ' ' + $(this).attr('data-class'));
            }



            if($(this).css('display') == 'none'){
                $(container).css('display', 'none');
            }

            for(i in options.back){
                $(back).css(i, options.back[i]);
            }

            for(i in options.select){
                $(this).css(i, options.select[i]);
            }

            if($(this).attr('disabled') == 'disabled'){
                $(back).css('opacity', '0.5');
            }

            /** Appending select box and image holder to container */
            $(container).insertBefore(this);
            $(back).addClass('select-text').appendTo(container);
            $(this).appendTo(container);
            $(arrowIcon).addClass('arrow-icon').appendTo(container);

            /** Prepopulating selected values */
            change(this, back);
            /** Attaching onchange event */
            $(this).change(function(){
                change(this, back);
            });
        });
    };
})(jQuery);

