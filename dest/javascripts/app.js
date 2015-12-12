var App = (function() {
  // 粒子数
  var NUM = 3000;

  // 粒子配列
  var particles = [];

  // 処理時間計測用
  var start;

  var canvas;
  var wind;
  var projection;

  // 処理開始
  function run(can, w, p) {
    canvas     = can;
    wind       = w;
    projection = p;

    // 粒子初期化
    for (var i = 0; i < NUM; i++) {
      particles.push(new Particle());
    }

    // フレーム毎処理開始
    start = new Date().getTime();
    requestAnimationFrame(process);
  }

  // フレーム毎処理
  function process() {
    var now = new Date().getTime();
    var tx = now - start; // 前回処理からの時間
    start  = now;
  
    // 粒子を動かす
    move(tx);
  
    // 描画する
    render();
  
    // 次回描画処理の準備
    requestAnimationFrame(process);
  }

  // 粒子移動
  function move(tx) {
    particles.forEach(function(p) { p.move(tx, wind); });
  }
  
  // 描画
  function render() {
    var ctx = canvas.node().getContext("2d");
  
    // canvasを少し暗く
    ctx.fillStyle = "rgba(0, 0, 0, 0.90)";
    var prev = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillRect(0, 0, canvas.attr("width"), canvas.attr("height"));
    ctx.globalCompositeOperation = prev;
    
    // particlesを描画
    ctx.beginPath();
    ctx.strokeStyle = "rgb(200,200,200)";
    particles.forEach(function(p) { p.draw(ctx, projection); });
    ctx.stroke();
  }

  return { "run": run };
})();
