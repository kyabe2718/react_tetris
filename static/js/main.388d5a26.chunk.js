(this.webpackJsonpsample_react=this.webpackJsonpsample_react||[]).push([[0],{15:function(t,e,r){},16:function(t,e,r){},18:function(t,e,r){"use strict";r.r(e);var n=r(2),c=r.n(n),a=r(10),o=r.n(a),u=(r(15),r(3)),i=r(0),s=r(6),l=r(7),f=r(9),d=r(8),h=r(4),b=(r(16),{type:"I",color:"#00ffff",shape:function(t){return[[[0,-1],[0,0],[0,1],[0,2]],[[-1,0],[0,0],[1,0],[2,0]],[[0,-2],[0,-1],[0,0],[0,1]],[[-2,0],[-1,0],[0,0],[1,0]]][t]}}),v={type:"T",color:"#ff00ff",shape:function(t){return[[[0,0],[-1,0],[1,0],[0,-1]],[[0,0],[1,0],[0,1],[0,-1]],[[0,0],[-1,0],[1,0],[0,1]],[[0,0],[-1,0],[0,1],[0,-1]]][t]}},j={type:"O",color:"#ffff00",shape:function(t){return[[0,-1],[1,-1],[0,0],[1,0]]}},O={type:"L",color:"#ff8800",shape:function(t){return[[[0,0],[1,0],[-1,0],[1,-1]],[[0,0],[0,1],[0,-1],[1,1]],[[0,0],[1,0],[-1,0],[-1,1]],[[0,0],[0,1],[0,-1],[-1,-1]]][t]}},p={type:"J",color:"#0000ff",shape:function(t){return[[[0,0],[-1,0],[1,0],[-1,-1]],[[0,0],[0,1],[0,-1],[1,-1]],[[0,0],[1,0],[-1,0],[1,1]],[[0,0],[0,1],[0,-1],[-1,1]]][t]}},m={type:"Z",color:"#ff0000",shape:function(t){return[[[0,0],[1,0],[0,-1],[-1,-1]],[[0,0],[1,0],[0,1],[1,-1]]][t%2]}},y={type:"S",color:"#00ff00",shape:function(t){return[[[0,0],[-1,0],[0,-1],[1,-1]],[[0,0],[0,-1],[1,0],[1,1]]][t%2]}};function w(t){switch(t){case"I":return b;case"T":return v;case"O":return j;case"L":return O;case"J":return p;case"Z":return m;case"S":return y}}function x(t){return(t-1)%4}var k=r(1);function g(t){return JSON.parse(JSON.stringify(t))}function D(t){return t.mino.shape(t.rot).map((function(e){return[e[0]+t.x,e[1]+t.y]}))}function I(t,e){return D(e).every((function(e){var r=Object(h.a)(e,2),n=r[0],c=r[1],a=t.length,o=t[0].length;return!(c<0||a<=c)&&(!(n<0||o<=n)&&null===t[c][n])}))}var C=function(t){Object(f.a)(r,t);var e=Object(d.a)(r);function r(t){var n;return Object(s.a)(this,r),(n=e.call(this,t)).state={current:void 0,cells:Array(t.height).fill([null]).map((function(e){return Array(t.width).fill(null)}))},n}return Object(l.a)(r,[{key:"update",value:function(){var t=this;this.setState((function(e){var n=r.removedFilledRow(e.cells);if(null!==n)return{current:e.current,cells:n};if(void 0===e.current){var c=t.createNewMino(function(){switch(Math.floor(7*Math.random())){case 0:return"I";case 1:return"T";case 2:return"O";case 3:return"L";case 4:return"J";case 5:return"Z";case 6:return"S";default:return"I"}}());if(I(e.cells,c))return{current:c,cells:e.cells};console.log("game over")}return t.calcNextState("Down",e)}))}},{key:"controlMino",value:function(t){var e=this;this.setState((function(r){return e.calcNextState(t,r)}))}},{key:"render",value:function(){var t=this,e=g(this.state.cells),r=this.state.current;r&&D(r).forEach((function(n){var c=Object(h.a)(n,2),a=c[0],o=c[1];0<=a&&a<t.props.width&&0<=o&&o<t.props.height&&(e[o][a]=r.mino.type)}));var n=e.map((function(t){return Object(k.jsx)("tr",{className:"tetris_th",children:t.map((function(t){if(null===t)return Object(k.jsx)("td",{className:"tetris_td",style:{background:"#ffffff"}});var e=w(t);return Object(k.jsx)("td",{className:"tetris_td",style:{background:e.color}})}))})}));return Object(k.jsxs)("div",{children:[Object(k.jsx)("table",{className:"tetris_board",children:Object(k.jsx)("tbody",{children:n})}),Object(k.jsx)(N,{board:this})]})}},{key:"createNewMino",value:function(t){return{mino:w(t),x:Math.floor((this.props.width+1)/2),y:1,rot:0}}},{key:"calcNextState",value:function(t,e){if(void 0!==e.current){var r=function(t,e){switch(e){case"Left":return Object(i.a)(Object(i.a)({},t),{},{x:t.x-1});case"Right":return Object(i.a)(Object(i.a)({},t),{},{x:t.x+1});case"Down":return Object(i.a)(Object(i.a)({},t),{},{y:t.y+1});case"Clockwise":return Object(i.a)(Object(i.a)({},t),{},{rot:(r=t.rot,(r+1)%4)});case"CounterClockwise":return Object(i.a)(Object(i.a)({},t),{},{rot:x(t.rot)})}var r}(e.current,t);if(I(e.cells,r))return Object(i.a)(Object(i.a)({},e),{},{current:r});if("Down"===t){var n=g(e.cells);return D(e.current).forEach((function(t){var r=Object(h.a)(t,2),c=r[0],a=r[1];void 0!==e.current&&(n[a][c]=e.current.mino.type)})),Object(i.a)(Object(i.a)({},e),{},{current:void 0,cells:n})}if("Clockwise"===t||"CounterClockwise"===t){var c=void 0;if([1,-1,2,-2].forEach((function(t){void 0===c&&I(e.cells,Object(i.a)(Object(i.a)({},r),{},{x:r.x+t}))&&(c=Object(i.a)(Object(i.a)({},e),{},{current:Object(i.a)(Object(i.a)({},r),{},{x:r.x+t})}))})),void 0!==c)return c}}return e}}],[{key:"removedFilledRow",value:function(t){var e=t.findIndex((function(t){return t.every((function(t){return null!=t}))}));if(-1!==e){var r=g(t);return r.splice(e,1),r.unshift(new Array(t[0].length).fill(null)),r}return null}}]),r}(c.a.Component),N=function(t){Object(f.a)(r,t);var e=Object(d.a)(r);function r(t){var n;return Object(s.a)(this,r),(n=e.call(this,t)).timerID=void 0,n.board=void 0,n.board=t.board,n.onKeyDown=n.onKeyDown.bind(Object(u.a)(n)),n}return Object(l.a)(r,[{key:"render",value:function(){var t=this;if(void 0===this.timerID||null===this.timerID){return Object(k.jsx)("button",{className:"startButton",onClick:function(){document.addEventListener("keydown",t.onKeyDown),t.timerID=setInterval((function(){t.board.update()}),1e3),t.forceUpdate()},children:void 0===this.timerID?"Game Start":"Restart"})}return Object(k.jsx)("button",{className:"startButton",onClick:function(){document.removeEventListener("keydown",t.onKeyDown),void 0!==t.timerID&&null!==t.timerID&&(clearInterval(t.timerID),t.timerID=null),t.forceUpdate()},children:"Stop Game"})}},{key:"onKeyDown",value:function(t){var e=function(t){switch(t){case"ArrowDown":return"Down";case"ArrowLeft":return"Left";case"ArrowRight":return"Right";case"ArrowUp":return"Clockwise";default:return null}}(t.key);null!==e&&this.board.controlMino(e)}}]),r}(c.a.Component);var S=function(){return Object(k.jsx)("div",{className:"App",children:Object(k.jsx)(C,{width:10,height:20})})},L=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,19)).then((function(e){var r=e.getCLS,n=e.getFID,c=e.getFCP,a=e.getLCP,o=e.getTTFB;r(t),n(t),c(t),a(t),o(t)}))};o.a.render(Object(k.jsx)(c.a.StrictMode,{children:Object(k.jsx)(S,{})}),document.getElementById("root")),L()}},[[18,1,2]]]);
//# sourceMappingURL=main.388d5a26.chunk.js.map