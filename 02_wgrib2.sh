#!/bin/sh

# gfortranがインストールされており、コンパイル環境が整っている前提です。

wget ftp://ftp.cpc.ncep.noaa.gov/wd51we/wgrib2/wgrib2.tgz
tar xzvf wgrib2.tgz 
cd grib2
make
cd ..
rm wgrib2.tgz

cp grib2/wgrib2/wgrib2 .
chmod +x wgrib2

# rm -rf grib2
