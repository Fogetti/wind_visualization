#!/bin/sh

cd data

# 50m cultural の Admin0 - Countriesを利用しました。
wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip

unzip ne_50m_admin_0_countries.zip 

# gdalとtopojsonはインストール済みの想定です。

# GeoJSON化。日本周辺のみ抽出。
ogr2ogr -f GeoJSON -where "adm0_a3 IN ('JPN', 'KOR', 'PRK', 'TWN', 'CHN', 'RUS')" map_geo.json ne_50m_admin_0_countries.shp

# TopoJSON化。オプションの使い方が今ひとつ分かってません。。
topojson --id-property su_a3 -p NAME=name -p name -o map_topo.json map_geo.json

cp map_topo.json ../dest/data
