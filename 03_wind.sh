export YYYYMMDDHH=2015121100

wget "http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t00z.pgrb2.0p25.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs."$YYYYMMDDHH -O data/$YYYYMMDDHH.dat

./wgrib2 -d 1 data/$YYYYMMDDHH.dat -order we:ns -no_header -ieee data/$YYYYMMDDHH-U.ieee
./wgrib2 -d 2 data/$YYYYMMDDHH.dat -order we:ns -no_header -ieee data/$YYYYMMDDHH-V.ieee

# ダウンロードを一回で終わらせる為連結しておく
cat data/$YYYYMMDDHH-U.ieee data/$YYYYMMDDHH-V.ieee > dest/data/wind.ieee
