var db = require('../connection');

var conn=db.getConnection();

function getAllpost(req, res, next){
  var query=
  conn.query('SELECT DISTINCT idNhaTro,TenChuTro,Sdt,TenDuong,TenQuan,TenTP,localX, localY FROM quanlynhatro1.nhatro,quanlynhatro1.quan,quanlynhatro1.thanhpho,quanlynhatro1.duong where nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idDuong=duong.idDuong;', function(err,rows){
    if(err){
      throw err;
    }else{
      // console.log(rows);
      res.status(201).json({ Apartments: rows });
    }
  });
}

module.exports={
  getAllpost: getAllpost
}