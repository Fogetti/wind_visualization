// 定数
var MIN_LAT = 20;
var MAX_LAT = 60;
var MIN_LON = 115;
var MAX_LON = 155;
var MIN_AGE = 500;
var MAX_AGE = 1200;

// 粒子クラス
var Particle = function() {
  this.initialize();
};

Particle.prototype.initialize = function() {
  function rand(min, max) {
    return Math.random() * ((max + 1) - min) + min;
  }
  this.lat = rand(MIN_LAT, MAX_LAT);
  this.lon = rand(MIN_LON, MAX_LON);
  this.age = rand(MIN_AGE, MAX_AGE);

  this.nlat = this.lat;
  this.nlon = this.lon;
};

// 近傍４点を利用した補間関数
Particle.prototype._interpolate = function(field, width, offset, x, y) {
  // 線形補間
  function linear(p, d1, d2) {
    return d1 * (1.0 - p) + d2 * p;
  }

  var x1 = Math.floor(x);
  var y1 = Math.floor(y);
  var x2 = x1 + 1;
  var y2 = y1 + 1;

  var dx = x - x1;
  var dy = y - y1;
  var d1 = field[offset + y1 * width + x1];
  var d2 = field[offset + y1 * width + x2];
  var d3 = field[offset + y2 * width + x1];
  var d4 = field[offset + y2 * width + x2];

  var z1 = linear(dx, d1, d2);
  var z2 = linear(dx, d3, d4);
  var z3 = linear(dy, z1, z2);

  return z3;
};

Particle.prototype.move = function(tx, field) {
  // 前回の座標を代入
  this.lat = this.nlat;
  this.lon = this.nlon;

　// 範囲制御
  if (this.lat < MIN_LAT || this.lat > MAX_LAT || this.lon < MIN_LON || this.lon > MAX_LON) {
    this.initialize();
    return;
  }

  // 寿命制御
  this.age = this.age - 1 * tx;
  if (this.age <=0) {
    this.initialize();
    return;
  }

  // 緯度・経度が1440 * 721のどこに対応するか計算
  var x = this.lon / 360 * 1440;
  var y = (1 - (this.lat + 90) / 180) * 721;

  // 1440 * 721 Uデータの後にVデータを連結しているのでoffsetが必要
  var offset = 1038240;

  // 次の座標を計算(フレームレート変動と調整係数を加味する)
  this.nlon = this.lon + 0.0005 * tx * this._interpolate(field, 1440,      0, x, y); 
  this.nlat = this.lat + 0.0005 * tx * this._interpolate(field, 1440, offset, x, y);
};
 
Particle.prototype.draw = function(ctx, projection) {
  // スクリーンの座標に変換
  var p  = projection([ this.lon,  this.lat]);
  var np = projection([this.nlon, this.nlat]);

  // 線を描画
  ctx.moveTo( p[0],  p[1]);
  ctx.lineTo(np[0], np[1]);
};
