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
        var query = conn.query(`SELECT DISTINCT  idNhaTro,TenChuTro,Sdt,DiaChi,TenQuan,TenTP,localX,localY,gia,dientich,DATE_FORMAT(date,"%d/%m/%Y") as date,state,chitiet,Img 
        FROM quanlynhatro1.nhatro,quanlynhatro1.quan,quanlynhatro1.thanhpho,(SELECT idNhatro as id,ImageHinh as Img FROM quanlynhatro1.image group by idNhatro) as image1
        WHERE nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idNhatro and nhatro.idNhaTro=image1.id
        order by idNhaTro desc;`, function (err, rows) {
          if (err) {
            throw err;
          } else {
            console.log(rows);
            res.status(201).json(rows);
          }
        });
      }
    });
  }else{
    res.status(201).json({data:'Error'});
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
        var query=conn.query(`SELECT DISTINCT  idNhaTro,TenChuTro,Sdt,DiaChi,TenQuan,TenTP,localX,localY,gia,dientich,DATE_FORMAT(date,"%d/%m/%Y") as date,state,chitiet,Img 
        FROM quanlynhatro1.nhatro,quanlynhatro1.quan,quanlynhatro1.thanhpho,(SELECT idNhatro as id,ImageHinh as Img FROM quanlynhatro1.image group by idNhatro) as image1
        WHERE nhatro.idQuan=quan.idQuan and nhatro.idThanhPho=thanhpho.idThanhPho and nhatro.idNhatro and nhatro.idNhaTro=image1.id and nhatro.idNhatro=${req.body.idnhatro}`, 
        function(err,rows){
          if(err){
            throw err;
          }else{
            console.log(rows);
            res.status(201).json(rows[0]);
          }
        });
      }
    });
  }else{
    res.status(201).json({data:'Error'});
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
        var query=conn.query(`INSERT INTO quanlynhatro1.nhatro (TenChuTro, Sdt, DiaChi, idQuan, idThanhPho, localX, localY, gia, dientich, date, chitiet) 
        VALUES ('${req.body.tenchutro}', '${req.body.sdt}', '${req.body.diachi}', '${req.body.quan}', '${req.body.thanhpho}',
        '${req.body.localx}', '${req.body.localy}', '${req.body.giaphong}', '${req.body.dientich}', '${req.body.date}' ,'${req.body.chitiet}');`, function(err,result){
          if(err){
            throw err;
          }else{
            res.status(201).json(rows);
          }
        });
      }
    });
  }else{
    res.status(201).json({data:'Error'});
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
  }else{
    res.status(201).json({data:'Error'});
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
  }else{
    res.status(201).json({data:'Error'});
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
  }else{
    res.status(201).json({data:'Error'});
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
                  flag=true;
                  break;
              }
              dem++;
              tam--;
          };
          if(flag==false)
          {
            return res.status(201).json({data:'Error'});
          }
      }
    });
  }catch{
    return res.status(201).json({data:'Error'});
  }
}

function LoginGoogle(req,res,next){
  try{
    var query=conn.query('SELECT Username,Password FROM quanlynhatro1.User;', function(err,rows){
      if(err){
        return res.status(201).json({data:'Error'});
      }else{
          var dem=0;
          var tam=rows.length;
          var flag=false;
          while(tam!=0)
          {
              var Username=rows[dem].Username;
              var Password=rows[dem].Password;
              if(req.body.gmail==Username && req.body.id==Password)
              {
                  var token = jwt.sign({ten:Username},'abc',{algorithm:'HS256',expiresIn: '3h'});
                  res.status(201).json({access_token:token});
                  flag=true;
                  break;
              }
              dem++;
              tam--;
          };

          if(flag==false)
          {
            var query=conn.query(`INSERT INTO quanlynhatro1.nguoidung(Ho,Ten,photourl)
              values('${req.body.Ho}','${req.body.Ten}','${req.body.photourl}');`, function(err,rows){
                if(err){
                  return res.status(201).json({data:'Error'});
                }
            });

            var query=conn.query(`INSERT INTO quanlynhatro1.user(Username,Password)
              values('${req.body.gmail}','${req.body.id}');`, function(err,rows){
                if(err){
                  return res.status(201).json({data:'Error'});
                }
            });
            var token = jwt.sign({ten:req.body.gmail},'abc',{algorithm:'HS256',expiresIn: '3h'});
            res.status(201).json({access_token:token});
          }
      }
    });
  }catch{
    return res.status(201).json({data:'Error'});
  }
}

function DangKy(req,res,next){
  var query=conn.query('SELECT Username,Password FROM quanlynhatro1.User;', function(err,rows){
    if(err){
      return res.status(201).json({data:'Error'});
    }else{
        var dem=0;
        var tam=rows.length;
        var flag=false;
        while(tam!=0)
        {
            var Username=rows[dem].Username;
            if(req.body.Username==Username)
            {
                res.status(201).json('Da Dang Ky');
                flag=true;
                break;
            }
            dem++;
            tam--;
        };
        if(flag==false)
        {
          var query=conn.query(`INSERT INTO quanlynhatro1.nguoidung(Ho,Ten,NgaySinh,DiaChi,sodt,photourl)
          values('${req.body.Ho}','${req.body.Ten}','${req.body.NgaySinh}','${req.body.DiaChi}','${req.body.sodt}','${req.body.photourl}');`, function(err,rows){
            if(err){
              return res.status(201).json({data:'Error'});
            }
          });
          var query=conn.query(`INSERT INTO quanlynhatro1.user(Username,Password)
              values('${req.body.Username}','${req.body.Password}');`, function(err,rows){
                if(err){
                  return res.status(201).json({data:'Error'});
                }
          });
          res.status(201).json('Dang Ky Thanh Cong');
        }
    }
  });
}

function DanhSachHinhAnh(req,res,next){
  if(req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase()=== 'bearer'){
    var token =req.headers.authorization.split(' ')[1];
    jwt.verify(token,'abc',function(err,decode){
      if(err){
        return res.status(201).json({data:'Error'});
      }
      else{
        var query=conn.query(`SELECT idNhatro,ImageHinh
        FROM quanlynhatro1.image
        where idNhatro=${req.body.idnhatro};`,function(err,rows){
          if(err){
            throw err;
          }else{
            res.status(201).json(rows);
          }
        });
      }
    });
  }else{
    res.status(201).json({data:'Error'});
  }
}

module.exports = {
  getAllpost: getAllpost,
  InsetNhaTro: InsetNhaTro,
  LayDanhSachBL: LayDanhSachBL,
  getAllpostID: getAllpostID,
  LayThongTinNguoiDung: LayThongTinNguoiDung,
  ThemBinhLuan: ThemBinhLuan,
  LoginUser: LoginUser,
  LoginGoogle: LoginGoogle,
  DangKy: DangKy,
  DanhSachHinhAnh: DanhSachHinhAnh
}