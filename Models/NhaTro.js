var db = require('../connection');
var jwt=require('jsonwebtoken');

var conn = db.getConnection();

function getAllpost(req, res, next) {
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()=== 'bearer'){
    var token =req.headers.authorization.split(' ')[1];
    jwt.verify(token,'abc',function(err,decode){
      if(err){
        return res.status(201).json({data:'Error'});
      }
      else{
        var query = conn.query(`SELECT DISTINCT  TenChuTro,Sdt,DiaChi,TenQuan,TenTP,localX,localY,gia,dientich,DATE_FORMAT(date,"%d/%m/%Y") as date,state,chitiet 
        FROM quanlynhatro1.nhatro,quanlynhatro1.quan,quanlynhatro1.thanhpho
        WHERE nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idNhatro;`, function (err, rows) {
          if (err) {
            throw err;
          } else {
            console.log(rows);
            res.status(201).json(rows);
          }
        });
      }
    });
    }
}

function getAllpostID(req, res, next){
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()=== 'bearer'){
    var token =req.headers.authorization.split(' ')[1];
    jwt.verify(token,'abc',function(err,decode){
      if(err){
        return res.status(201).json({data:'Error'});
      }
      else{
        var query=conn.query(`SELECT DISTINCT  TenChuTro,Sdt,DiaChi,TenQuan,TenTP,localX,localY,gia,dientich,DATE_FORMAT(date,"%d/%m/%Y") as date,state,chitiet 
        FROM quanlynhatro.nhatro,quanlynhatro.quan,quanlynhatro.thanhpho
        WHERE nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idNhatro=${req.body.idnhatro};`, function(err,rows){
          if(err){
            throw err;
          }else{
            console.log(rows);
            res.status(201).json(rows[0]);
          }
        });
      }
    });
  }
}

function InsetNhaTro(req, res, next) {
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()=== 'bearer'){
    var token =req.headers.authorization.split(' ')[1];
    jwt.verify(token,'abc',function(err,decode){
      if(err){
        return res.status(201).json({data:'Error'});
      }
      else{
        var query = conn.query(`call InsertNhaTro(${req.body.idnhatro},'${req.body.tenchutro}',${req.body.sdt},${req.body.idquan},${req.body.idthanhpho},${req.body.idduong},${req.body.localx},${req.body.localy},${req.body.localz},${req.body.idimage},${req.body.gia});`, function (err, rows) {
          if (err) {
            throw err;
          } else {
            // console.log(rows);
            res.status(201).json(rows);
          }
        });
      }
    });
  }
  
}

function LayDanhSachBL(req, res, next) {
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()=== 'bearer'){
    var token =req.headers.authorization.split(' ')[1];
    jwt.verify(token,'abc',function(err,decode){
      if(err){
        return res.status(201).json({data:'Error'});
      }
      else{
        var query = conn.query(`select nguoidung.IdNguoiDung,Ho,Ten,photourl,noidung,DATE_FORMAT(date,"%d/%m/%Y") as date
        from quanlynhatro1.binhluan,quanlynhatro1.nguoidung
        where binhluan.IdNguoiDung = nguoidung.idNguoiDung && binhluan.idNhaTro=${req.body.idnhatro};`, function (err, rows) {
          if (err) {
            throw err;
          } else {
            // console.log(rows);
            res.status(201).json(rows);
          }
        });
      }
    });
  }
  
}


function LayThongTinNguoiDung(req, res, next){
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()=== 'bearer'){
    var token =req.headers.authorization.split(' ')[1];
    jwt.verify(token,'abc',function(err,decode){
      if(err){
        return res.status(201).json({data:'Error'});
      }
      else{
        var query=conn.query(`SELECT nguoidung.Ho,nguoidung.Ten,nguoidung.DiaChi,nguoidung.sodt,nguoidung.photourl 
        FROM quanlynhatro1.nguoidung WHERE nguoidung.idNguoiDung=${req.body.idNguoiDung};`,function(err,rows){
          if(err){
            throw err;
          }else{
            res.status(201).json(rows);
          }
        });
      }
    });
  }
}

function ThemBinhLuan(req, res, next){
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()=== 'bearer'){
    var token =req.headers.authorization.split(' ')[1];
    jwt.verify(token,'abc',function(err,decode){
      if(err){
        return res.status(201).json({data:'Error'});
      }
      else{
        var query=conn.query(`insert into quanlynhatro1.binhluan
        values(null,${req.body.idnguoidung},${req.body.idnhatro},'${req.body.noidung}','${req.body.date}');`,function(err,rows){
          if(err){
            throw err;
          }else{
            res.status(201).json(rows);
          }
        });
      }
    });
  }
}

function LoginUser(req,res,next){
  try{
    var query=conn.query('SELECT Username,Password FROM quanlynhatro1.User;', function(err,rows){
      if(err){
        throw err;
      }else{
          var dem=0;
          var tam=rows.length;
          var flag=false;
          while(tam!=0)
          {
              var Username=rows[dem].Username;
              var Password=rows[dem].Password;
              if(req.body.Username==Username && req.body.Password==Password)
              {
                  var token = jwt.sign({ten:'abc'},'abc',{algorithm:'HS256',expiresIn: '3h'});
                  res.status(201).json({access_token:token});
                  break;
              }
              dem++;
              tam--;
          };
      }
    });
  }catch{
    res.status(201).json('Error');
  }
}

module.exports = {
  getAllpost: getAllpost,
  InsetNhaTro: InsetNhaTro,
  LayDanhSachBL: LayDanhSachBL,
  getAllpostID: getAllpostID,
  LayThongTinNguoiDung: LayThongTinNguoiDung,
  ThemBinhLuan: ThemBinhLuan,
  LoginUser: LoginUser
}