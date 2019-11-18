var db = require('../connection');

var conn = db.getConnection();

function getAllpost(req, res, next) {
  var queryString = "SELECT DISTINCT idNhaTro,TenChuTro,Sdt,TenDuong,TenQuan,TenTP,localX, localY, ImageHinh " +
    "FROM quanlynhatro1.nhatro,quanlynhatro1.quan,quanlynhatro1.thanhpho,quanlynhatro1.duong, quanlynhatro1.image " +
    "where nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idDuong=duong.idDuong and nhatro.idImage = image.idImage;";
  var query =
    conn.query(queryString, function (err, rows) {
      if (err) {
        throw err;
      } else {
        // console.log(rows);
        res.status(201).json(rows);
      }
    });
}

module.exports = {
  getAllpost: getAllpost
}