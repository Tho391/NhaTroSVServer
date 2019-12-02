var db = require('../connection');

var conn = db.getConnection();

function getAllpost(req, res, next) {
  var query = conn.query(`SELECT DISTINCT nhatro.idNhaTro,TenChuTro,Sdt,TenDuong,TenQuan,TenTP,gia,dientich,DATE_FORMAT(date,"%d/%m/%Y") as date,ImageHinh,ImageTen, localX, localY
  FROM nhatro,quan,thanhpho,duong,image 
  where nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idDuong=duong.idDuong and nhatro.idImage=image.idImage;`, function (err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.status(201).json(rows);
    }
  });
}

function InsetNhaTro(req, res, next) {
  var query = conn.query(`call InsertNhaTro(${req.body.idnhatro},'${req.body.tenchutro}',${req.body.sdt},${req.body.idquan},${req.body.idthanhpho},${req.body.idduong},${req.body.localx},${req.body.localy},${req.body.localz},${req.body.idimage},${req.body.gia});`, function (err, rows) {
    if (err) {
      throw err;
    } else {
      // console.log(rows);
      res.status(201).json({ data: rows });
    }
  });
}

function LayDanhSachBL(req, res, next) {
  var query = conn.query(`select IdNguoiDung,noidung
  from binhluan
  where binhluan.idNhaTro=${req.body.idnhatro};`, function (err, rows) {
    if (err) {
      throw err;
    } else {
      // console.log(rows);
      res.status(201).json({ data: rows });
    }
  });
}

module.exports = {
  getAllpost: getAllpost,
  InsetNhaTro: InsetNhaTro,
  LayDanhSachBL: LayDanhSachBL
}