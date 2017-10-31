import Vue from 'vue';
import template from './background.html';

export default Vue.extend({
  template,
  
  mounted: function() {
    let ctx, circles, animateHeader = true;
    
        const body   = document.body;
        const html   = document.documentElement;
    
        let height   = Math.max( body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        let width    = document.body.clientWidth;
    
        const els = {
            bg1:  this.$el.querySelector('.background1'),
            bg2:  this.$el.querySelector('.background2'),
            bg3:  this.$el.querySelector('.background3'),
        };
    
        const canvas = this.$el.querySelector('.canvas');
    
        function Circle() {
            var _this = this;
    
            let init = () => {
                _this.pos.x = Math.random()*width;
                _this.pos.y = height+Math.random()*100;
                _this.alpha = 0.1+Math.random()*0.25;
                _this.scale = 0.1+Math.random()*0.15;
                _this.velocity = Math.random()*5.8;
            }
    
            (() => {
                _this.pos = {};
                init();
            })();
    
            this.draw = () => {
                if(_this.alpha <= 0) {
                    init();
                }
                _this.pos.y -= _this.velocity;
                _this.alpha -= 0.0003;
                ctx.beginPath();
                ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
                ctx.fill();
            };
        }
    
        const resize = () => {
            var width = document.body.clientWidth;
            let height   = Math.max( body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
            
            console.log(html.clientHeight);

            Object.keys(els).forEach(function(key) {
                els[key].style.height = height+'px';
            });
    
            canvas.width = width;
            canvas.height = height;     
        }

        const animate = () => {
            if(animateHeader) {
                ctx.clearRect(0,0,width,height);
                for(var i in circles) {
                    circles[i].draw();
                }
            }
    
            requestAnimationFrame(animate);
        }
    
        let initParticles = () => {
    
            Object.keys(els).forEach(function(key) {
                els[key].style.height = height+'px';
            });
    
            canvas.width = width;
            canvas.height = height;

            ctx = canvas.getContext('2d');
    
            circles = [];
            
            for(var x = 0; x < width*0.3; x++) {
                var c = new Circle();
                circles.push(c);
            }

            animate();
        }
    
        const addListeners = () => {
            window.addEventListener('resize', resize);
        }
    
        const init = () => {
            initParticles();
            addListeners();
        }
    
        init();
  }
});
