var db = require('../connection');

var conn = db.getConnection();

function getAllpost(req, res, next) {
  var query = conn.query(`SELECT DISTINCT nhatro.idNhaTro,TenChuTro,Sdt,TenDuong,TenQuan,TenTP,gia,dientich,DATE_FORMAT(date,"%d/%m/%Y") as date,ImageHinh,ImageTen, localX, localY,chitiet
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

function getAllpostID(req, res, next){
  var query=conn.query(`SELECT DISTINCT  TenChuTro,Sdt,TenDuong,TenQuan,TenTP,gia,dientich,DATE_FORMAT(date,"%d/%m/%Y") as date,state,ImageHinh,ImageTen,localX, localY,chitiet
  FROM quanlynhatro1.nhatro,quanlynhatro1.quan,quanlynhatro1.thanhpho,quanlynhatro1.duong,quanlynhatro1.image 
  where nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idDuong=duong.idDuong and nhatro.idImage=image.idImage and nhatro.idNhatro=${req.body.idnhatro};`, function(err,rows){
    if(err){
      throw err;
    }else{
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
      res.status(201).json(rows);
    }
  });
}

function LayDanhSachBL(req, res, next) {
  var query = conn.query(`select nguoidung.IdNguoiDung,Ho,Ten,photourl,noidung
  from binhluan,nguoidung
  where binhluan.IdNguoiDung = nguoidung.idNguoiDung && binhluan.idNhaTro=${req.body.idnhatro};`, function (err, rows) {
    if (err) {
      throw err;
    } else {
      // console.log(rows);
      res.status(201).json(rows);
    }
  });
}


function LayThongTinNguoiDung(req, res, next){
  var query=conn.query(`SELECT nguoidung.Ho,nguoidung.Ten,nguoidung.DiaChi,nguoidung.sodt,nguoidung.email,nguoidung.photourl 
  FROM nguoidung WHERE nguoidung.idNguoiDung=${req.body.idNguoiDung};`,function(err,rows){
    if(err){
      throw err;
    }else{
      // console.log(rows);
      res.status(201).json(rows);
    }
  });
}

function ThemBinhLuan(req, res, next){
  var query=conn.query(`insert into binhluan
  values(${req.body.idbinhluan},${req.body.idnguoidung},${req.body.idnhatro},'${req.body.noidung}');`,function(err,rows){
    if(err){
      throw err;
    }else{
      res.status(201).json(rows);
    }
  });
}

module.exports = {
  getAllpost: getAllpost,
  InsetNhaTro: InsetNhaTro,
  LayDanhSachBL: LayDanhSachBL,
  getAllpostID: getAllpostID,
  LayThongTinNguoiDung: LayThongTinNguoiDung,
  ThemBinhLuan: ThemBinhLuan
}