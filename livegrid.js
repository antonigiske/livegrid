/*
 * Livegrid.js
 *
 * Licensed under the WTFPL license:
 *   http://www.wtfpl.net/
 *
 * Author: @antonigiske - 2012
 *
 */
;(function ( $, window, document, undefined ) {
	
	
	// Change this to your fittings.
    var options = {
		gridBg: "rgba(0,0,0,0.1)",		// Background of the grid (so the gutters are shown)
		colBg: "rgba(0,0,0,0.2)",		// Background of the columns
        center: true,					// If you want to center the grid in document.
		cols: 4,						// How many columns.
		colWidth: 280,					// Width of each individual column.
		gutterWidth: 20					// Width of the gutter. 0 for none.
   	};

    function liveGrid( element ) {
        this.element = element;
        this.opts = options;
        this.init();
    }

    liveGrid.prototype = {
	
        init: function() {
			this.gridWidth = (this.opts.cols * this.opts.colWidth) + (this.opts.cols * (this.opts.gutterWidth));

			if (this.createGrid(this.element, this.opts) === false) {
				return;
			}

			$(document).on('keyup', function(e) {
				if(e.keyCode === 71) {
					$('#livegrid').toggle();
				}
			});
        },

        createGrid: function(el, options) {
			$(el).append('<div id="livegrid"></div>');

			this.container = $('#livegrid');

			for(i = 1; i <= this.opts.cols; i++) {
				this.container.append('<span class="row-' + i + '"></span>');
			}

			this.container.css({
				'position' : 'fixed',
				'width' : this.gridWidth + 'px',
				'height' : '100%',
				'top': 0,
				'background': this.opts.gridBg,
				'z-index': '9999'
			});

			if(this.opts.center) {
				this.container.css({
					'left': '50%',
					'marginLeft': '-' + (this.gridWidth / 2) + 'px'
				});
			}

			this.container.find('span').css({
				'background': this.opts.colBg,
				'height': '100%',
				'width': this.opts.colWidth + 'px',
				'display': 'block',
				'margin': '0 ' + (this.opts.gutterWidth / 2) + 'px 0',
				'float':'left'
			});
        }
    };

    $.fn['liveGrid'] = function () {
        return this.each(function () {
            if (!$.data(this, 'liveGrid')) {
                $.data(this, 'liveGrid', new liveGrid( this ));
            }
        });
    };

})( jQuery, window, document );

// Go live!
$(document).ready(function() {
	$('body').liveGrid();
});