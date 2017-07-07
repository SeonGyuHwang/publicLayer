"use strict";
(function (win, doc, src, $, a, m) {
    a = doc.createElement('script'),
        m = doc.getElementsByTagName('script')[0];
    a.async = 1;
    a.src = src;
    a.onload = function(){
        $ = jQuery || win.jQuery;

        win.publicLayer = {
            'o': null,
            'v': null,
            'isResize': true,
            'useLayer': false,
            'w': $(window).width()*0.8,
            'h': $(window).height()*0.8,
            'destory': function(){

                this.useLayer = false;
                this.w = $(window).width()*0.8;
                this.h = $(window).width()*0.8;

                $('._layers_').remove();

            },
            'resize': function(){
                if( this.useLayer ) {
                    if( this.isResize ) {
                        this.o.css({
                            'top': ( $(window).scrollTop() + ($(window).height() - parseInt(this.h)) / 2 ) + 'px',
                            'left': ( $(window).width() / 2 ) - ( parseInt(this.w) / 2 ) + 'px'
                        });
                    }


                    this.v.css({
                        'width': $(document).width()+'px',
                        'height': $(document).height()+'px'
                    });
                }
            },
            'setCss': function(options){
                if( typeof options == "object" ) {
                    //console.log(options);
                    $(this.o).css(options);
                }
            },
            'setHtml': function(addHtml){

                if( !this.o ) {
                    this.o = $('<div />');
                    this.o.attr('class', '_layer_ _layers_').appendTo('body');
                }

                if( !this.v ) {
                    this.v = $('<div />');
                    this.v.attr('class', '_layerOveray_ _layers_').appendTo('body');
                }

                this.v.css({
                    'width': $(document).width()+'px',
                    'height': $(document).height()+'px',
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'z-index': '40',
                    'filter': 'alpha(opacity=50)',
                    '-khtml-opacity': '0.5',
                    '-moz-opacity': '0.5',
                    'opacity': '0.5',
                    'background-color': '#000',
                    'display': 'none'
                });

                this.o.css({
                    'top': ( $(window).scrollTop() + ($(window).height() - this.h) / 2 )+'px',
                    'left': ( $(window).width() / 2 ) - ( this.w / 2 )+'px',
                    'width': this.w,
                    'height': this.h,
                    'position': 'absolute',
                    'padding': '0px',
                    'background-color': '#fff',
                    'overflow': 'none',
                    'cursor': 'default',
                    'z-index': '50',
                    'display': 'none'
                });

                this.o.html(addHtml);
            },
            'setSize': function(w, h, resize){
                this.isResize = resize !== false ? true : false;
                this.w = w || $(window).width()*0.8;
                this.h = h || $(window).height()*0.8;
            },
            'init': function(){
                this.useLayer = true;
                this.o.show();

                if( $('._layerOveray_:visible').length <= 0 )
                    this.v.show();

                $(window).resize(function(){ win.publicLayer.resize(); });
                $(window).scroll(function(){ win.publicLayer.resize(); });
                $(document).on('click touchstart', '.publicLayerCloseBtn', function(e){
                    e.preventDefault();
                    win.publicLayer.destory();
                });

            }
        };
    };
    m.parentNode.insertBefore(a, m);
})(window, document, 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js');
