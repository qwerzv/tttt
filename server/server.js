const express= require('express');
const path = require('path');
const bodyParser= require('body-parser');
const multer = require('multer');



const app = express();
app.use("/images",express.static('images'));
app.use(express.static(path.join(__dirname,'public')));
app.set('port',process.env.PORT ||3000);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})) 

const mysql = require('mysql');
const conn = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'lostark'
};

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"images/");
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null,path.basename(file.originalname,ext)+"-"+Date.now()+ext);
    },
})

var upload = multer({storage: storage});

var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();
let dbsearch = ""
app.post('/searchdb',function(req,res){
    
    dbsearch = req.body.searchSkill;
    
    res.redirect("/admin");
  });
  

  let JobName11,SkillName11,SkillEx11,AttHit11,DefHit11;
app.get('/admin', (req, res) => {
    var sql = 'select JobName,SkillName,SkillEx,AttHit,DefHit from skill where SkillName =?'
    var param = dbsearch;
    if(dbsearch !==""){
    connection.query(sql,param,function(err,rows){
        console.log(rows);
        if(rows[0]!==undefined){
            JobName11 = rows[0].JobName;
            SkillName11 = rows[0].SkillName;
            SkillEx11 = rows[0].SkillEx;
            AttHit11 = rows[0].AttHit;
            DefHit11 = rows[0].DefHit;
           
        }
        res.render("admin",{JobName11:JobName11,SkillName11:SkillName11,SkillEx11:SkillEx11,AttHit11:AttHit11,DefHit11:DefHit11});
         })
         
    }
    else{
        JobName11 ="";
        SkillName11 = "";
        SkillEx11 = "";
        AttHit11 = "";
        DefHit11 ="";
        res.render("admin",{JobName11:JobName11,SkillName11:SkillName11,SkillEx11:SkillEx11,AttHit11:AttHit11,DefHit11:DefHit11});
    }
  });

app.post('/inputdb', upload.array('SkillImage'),function(req,res){
    var sql1 = 'Select SkillName from skill where SkillName = ?';
    var param1 = req.body.SkillName;
    connection.query(sql1,param1,function(err,rows){
        console.log(rows);
        if(rows[0] !== undefined){
            console.log("중복됨");
            res.send("<script>alert('스킬명 중복됨');window.location.replace('/admin');</script>;");
        }
        else{
            var sql = 'Insert INTO skill (JobName,SkillName,SkillEx,AttHit,DefHit,SkillImg,SkillThumb) VALUES(?,?,?,?,?,?,?) ';
            const JobName = req.body.JobName;
            const SkillName = req.body.SkillName;
            const SkillEx = req.body.SkillEx;
            const AttHit = req.body.AttHit;
            const DefHit = req.body.DefHit;
            console.log(req.files);
            let filename1 = "";
            let filename2 = "";
            if(req.files[0]&&req.files[1] !== undefined){
                filename1 = req.files[0].filename;
                filename2 = req.files[1].filename;
            }
            const SkillImage = `/images/${filename1}`;  
            const SkillThumb = `/images/${filename2}`;            
            var param = [JobName,SkillName,SkillEx,AttHit,DefHit,SkillImage,SkillThumb];
            connection.query(sql,param,function(err){
                if(err){
                    console.log(err);
                }
                
            })
            res.send("<script>alert('입력 완료!');location.href='/admin';</script>");
        }
        
    })


  });
  app.post('/updatedb', upload.array('SkillImage'),function(req,res){

    var sql = 'Update skill set SkillEx=?,AttHit=?,DefHit=?,SkillImg=?,SkillThumb=? where SkillName = ?';
    const SkillName = req.body.SkillName;
    const SkillEx = req.body.SkillEx;
    const AttHit = req.body.AttHit;
    const DefHit = req.body.DefHit;
    let filename1 = "";
    let filename2 = "";
    if(req.files !== undefined){
        filename1 = req.files[0].filename;
        filename2 = req.files[1].filename;
    }
    const SkillImage = `/images/${filename1}`;  
    const SkillThumb = `/images/${filename2}`;  
    var param = [SkillEx,AttHit,DefHit,SkillImage,SkillThumb,SkillName];
            connection.query(sql,param,function(err){
                if(err){
                    console.log(err);
                }
            })
            res.send("<script>alert('수정 완료!');location.href='/admin';</script>");    
  });
  app.post('/deletedb', upload.single('SkillImage'),function(req,res){

    var sql = 'Delete from skill where SkillName = ?';
    const SkillName = req.body.SkillName;
 
    var param = [SkillName];
            connection.query(sql,param,function(err){
                if(err){
                    console.log(err);
                }
                
            })
            res.send("<script>alert('삭제 완료!');location.href='/admin';</script>");
  });
  



  let result = [];
app.post('/inputpost',function(req,res){
    let sent = req.body.contents;
    let regex = /\[(.*?)\]/g;
    let ex;
    while((ex=regex.exec(sent))!==null){
        result.push(ex[1]);
    }
    
    let sql = 'insert into post (id,password,Contents,Me,You,SkillName1,SkillName2,SkillName3) values (?,?,?,?,?,?,?,?)';
    let param = [req.body.id,req.body.password,req.body.contents,req.body.me,req.body.you,result[0],result[1],result[2]];
    connection.query(sql,param,function(err){
        if(err){
            console.log(err);
        }
    })
    result = [];
    res.redirect("/post");
    
})
app.post('/inputpost1',function(req,res){
    let sent = req.body.contents;
    let regex = /\[(.*?)\]/g;
    let ex;
    while((ex=regex.exec(sent))!==null){
        result.push(ex[1]);
    }
    
    let sql = 'insert into post (id,password,Contents,Me,You,SkillName1,SkillName2,SkillName3) values (?,?,?,?,?,?,?,?)';
    let param = [req.body.id,req.body.password,req.body.contents,postme,postyou,result[0],result[1],result[2]];
    connection.query(sql,param,function(err){
        if(err){
            console.log(err);
        }
    })
 result = [];
    res.redirect("/post");
    
})


let savecontents, id , password, me, you = ""
app.get('/write',function(req,res,next){
    const sql = "select SkillName,SkillThumb from skill where JobName = ? "  ;
    var param = jobname1;
    connection.query(sql,[param],function(err,rows){
            if(err) console.error;
            res.render("write",{rows:rows,savecontents:savecontents,id:id,password:password,me:me,you:you});
         })
 

})

let postme = "";
let postyou = "";
app.post('/postsearch',function(req,res){
    postme = req.body.me;
    res.redirect('/post' );
  })
  app.post('/postsearch1',function(req,res){
    postyou = req.body.you;
    res.redirect('/post' );
  })


app.get('/post',function(req,res){

    let sql = "SELECT P.password,P.Num,P.id,P.Contents,P.SkillName1, S1.SkillEx AS SkillEx1, S1.SkillImg AS SkillImg1,S1.SkillThumb AS SkillThumb1, P.SkillName2, S2.SkillEx AS SkillEx2, S2.SkillImg AS SkillImg2, S2.SkillThumb AS SkillThumb2,P.SkillName3, S3.SkillEx AS SkillEx3, S3.SkillImg AS SkillImg3, S3.SkillThumb AS SkillThumb3 FROM Post AS P LEFT JOIN Skill AS S1 ON P.SkillName1 = S1.SkillName LEFT JOIN Skill AS S2 ON P.SkillName2 = S2.SkillName LEFT JOIN Skill AS S3 ON P.SkillName3 = S3.SkillName WHERE ME =? AND YOU=? ; "
    let param = [postme,postyou];

    connection.query(sql,param,function(err,rows){
        if(err) console.error;       
    
        res.render("post",{rows,rows,postme:postme,postyou:postyou})
    })

})
app.post('/tt',function(req,res){
    console.log("실행됨"+req.body.aa);
    var sql = 'Delete from post where Num = ?';
    const num = req.body.aa;
    var param = [num];
    connection.query(sql,param,function(err){
                if(err){
                    console.log(err);
                }
            })
            res.send("<script>alert('삭제 완료!');location.href='/post';</script>");
  })
  //post 페이지에서 삭제 실패시
  app.post('/tt1',function(req,res){
    console.log("실행됨");
    res.redirect("/post");
   
  })

  let jobname ="";
  let jobname1 = "";
  app.post('/search',function(req,res){
    jobname = req.body.job;
    
    
    res.redirect('/skilldb/' );
  })

  app.post('/search1',function(req,res){
    jobname1 = req.body.job;
    savecontents = req.body.contents;
    id = req.body.id;
    password = req.body.password;
    me = req.body.me;
    you = req.body.you;

    res.redirect('/write/' );
  })



  app.get('/skilldb', function(req,res,next){
    const sql = "select SkillName,SkillEx,SkillImg,SkillThumb from skill where JobName = ? "  ;
    var param = jobname;
    connection.query(sql,[param],function(err,rows){
            if(err) console.error;
            res.render("skilldb",{rows:rows,postme:postme})
         })
 

  })


app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
})