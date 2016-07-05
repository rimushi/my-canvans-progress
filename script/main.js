define(function(require, exports, module){
    var $ = require("$");     
    var DrawProcess = require('./drawProcess.js');
    
    module.exports = {
        init: function() { 
	        var self = this;
            self.drawList(); 
        },   
        drawList: function() {
            var self = this;   
            var bfb2 = [];
            //多图的初始位置赋值
            for(var i = 0; i < $('.myCanvas').length; i++) {
              bfb2[i] = 0;
            }  
            
            var bfbEnd2 = [20,80,50];
            // var bfbEnd2 = [];
            // for(var j = 0; j < self.items.length; j++) {
            //     bfbEnd2.push(self.items[j].percent);
            // }

            function start2() {    
                for(var i=0; i<$('.myCanvas').length; i++) {              
                    if(bfb2[i] <= bfbEnd2[i]){               
                        var drawProcess = new DrawProcess();
                        drawProcess.init({
                            dom: $('.myCanvas')[i],
                            x: 100,
                            y: 100,
                            radius: 100,
                            process: bfb2[i],
                            backColor: '#c0b9a9',
                            proColor: '#7c2327',
                            fontColor: '#7c2327'
                        });
                        bfb2[i] += 1;
                    }    
                }                  
            }            
            window.setInterval(start2, 1000/60); 
            // var t = requestAnimFrame(start2);
            // if (Math.max.apply(null,bfb2) > Math.max.apply(null, bfbEnd2)) {                           
            //     cancelAnimationFrame(t);   
            //     return;
            // }             
        }       
    };

    //代码实现方式二
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
                window.setInterval(callback, 1000 / 60);
            };
    })();

    window.cancelAnimationFrame = (function() {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            function(callback, element) {
                window.clearTimeout(callback, 1000 / 60);
            };
    })();  

    module.exports.init();
});