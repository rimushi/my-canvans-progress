define(function(require, exports, module) {
    var $ = require("$");
    function DrawProcess() {

    };
    DrawProcess.prototype = {
        init: function(config) {            
            var self = this;
            self.$dom = config.dom;
            self.x = config.x;
            self.y = config.y;
            self.radius = config.radius;
            self.process = config.process;
            self.backColor = config.backColor;
            self.proColor = config.proColor;
            self.fontColor = config.fontColor;

            // console.log(self.$dom);
            self.initAttr(self.$dom, self.x, self.y, self.radius, self.process, self.backColor, self.proColor, self.fontColor);
        },
        initAttr: function(dom, x, y, radius, process, backColor, proColor, fontColor) {                      
            var self = this; 
            var canvas = dom;

            if (canvas.getContext) {
                var cts = canvas.getContext('2d');
            } else {
                return;
            }

            cts.beginPath();
            // 坐标移动到圆心  
            cts.moveTo(x, y);
            // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
            cts.arc(x, y, radius, 0, Math.PI * 2, false);
            cts.closePath();
            // 填充颜色  
            cts.fillStyle = backColor;
            cts.fill();

            if(process!= 0 && process!= 100) {
                cts.beginPath();
                // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
                cts.moveTo(x, y);
                // 跟上面的圆唯一的区别在这里,不画满圆，根据进度画扇形
                cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 2 * (process)/100 - Math.PI * 0.5, false);
                cts.closePath();
                cts.fillStyle = proColor;
                cts.fill();                
            }
            /*else if(process==100){
                cts.beginPath();
                // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
                cts.moveTo(x, y);
                // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形(优化的时候减去0.0001是因为进度100时有个bug)
                cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 2 * (process-0.00001)/100 - Math.PI * 0.5, false);
                cts.closePath();
                cts.fillStyle = proColor;
                cts.fill();                
            }*/

            

            //填充背景白色
            cts.beginPath();
            cts.moveTo(x, y);
            cts.arc(x, y, radius - (radius * 0.10), 0, Math.PI * 2, false);
            cts.closePath();

            // cts.fillStyle = '#f0efef';
            cts.fillStyle = '#efe8e2';
            cts.fill();

            // 画一条线  
            cts.beginPath();
            cts.arc(x, y, radius - (radius * 0.11), 0, Math.PI * 2, false);
            cts.closePath();

            // 与画实心圆的区别,fill是填充,stroke是画线  
            cts.strokeStyle = '#efe8e2';
            cts.stroke();

            //在中间写字 
            cts.font = "bold 45pt Arial";
            // cts.fillStyle = fontColor;            
            cts.textAlign = 'center';
            cts.textBaseline = 'middle';
            cts.moveTo(x, y);           
            // cts.fillText(process + "%", x, y); 
            if(process==100) {
                cts.fillStyle = "#c0b9a9";
                cts.fillText("满", x, y);                      
            } else if(process==0) {
                cts.fillStyle = fontColor;
                cts.fillText("抢", x, y); 
            } else {
                cts.fillStyle = fontColor;
                cts.fillText(process + "%", x, y);
            }                                 
        }        
    };    

    module.exports = DrawProcess;
});
