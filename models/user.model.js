const con = require("../config/mysql");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

var fs = require("fs");
var path = require("path");

const { use } = require("../routes/user.route");
const {
  signJwt,
  signRefreshToken,
  signEmailToken,
} = require("../helpers/jwt.helpers");

const sessionModel = require("./session.model");
require("colors");

const reportData = () => {
  console.log("Report All data using select with user");
};


const mycrypto = {
  encrypt: (password) => {
    const cipher = crypto.createCipher("aes192", process.env.HASH_KEY);
    let hashedPassword = cipher.update(`${password}`, "utf8", "hex");
    hashedPassword += cipher.final("hex");
    return hashedPassword;
  },

  decrypt: (hashed) => {
    const decipher = crypto.createDecipher("aes192", process.env.HASH_KEY);
    let decrypted = decipher.update(`${hashed}`, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  },
};


const userModel = {
  register: (user) =>
    new Promise(async (resolve, reject) => {
      console.log("user", user);
      // Email duplication check
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res !== undefined && res.length !== 0) {
            return reject(new Error("User already exists", err));
          } else {
            // const hashedPassword = await bcrypt.hash(`${user.password}`, 10);
            const hashedPassword = await mycrypto.encrypt(user.password);
            console.log("hashedPassword", hashedPassword);
            const sql = `INSERT into users (first_name,last_name, email, mobile, password, roleId_fk) values ('${user.firstName}','${user.lastName}','${user.email}','${user.mobile}','${hashedPassword}',1)`;
            con.query(sql, async (err, res) => {
              console.log("res", res);
              if (res) {
                if (res.affectedRows > 0) {
                  const emailToken = await signEmailToken({
                    payload: {
                      id: `${res.insertId}`,
                      email: user.email,
                    },
                  });
                  const url = `https://xanamedtec.page.link/?link=${process.env.EMAIL_URL}/user/verification/${emailToken}&apn=com.xanamedtec
                   `;
                  const transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    auth: {
                      user: "mmm28800@gmail.com",
                      pass: "  1310125897819  ",
                    },
                    // host: "mail.codistan.org",
                    // port: 465,
                    // secure: true, // true for 465, false for other ports
                    // auth: {
                    //   user: "malik.mubashir@codistan.org",
                    //   pass: "Mailk@Mubashir321",
                    // },
                  });
                  console.log("user.email :>>", user.email);
                  const mailOptions = {
                    from: "malik.mubashir@codistan.org", // sender address
                    to: user.email, // list of receivers
                    subject: "Email verification", // Subject line
                    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif">
                     <head> 
                      <meta charset="UTF-8"> 
                      <meta content="width=device-width, initial-scale=1" name="viewport"> 
                      <meta name="x-apple-disable-message-reformatting"> 
                      <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                      <meta content="telephone=no" name="format-detection"> 
                      <!--[if (mso 16)]>
                        <style type="text/css">
                        a {text-decoration: none;}
                        </style>
                        <![endif]--> 
                      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
                      <!--[if gte mso 9]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG></o:AllowPNG>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]--> 
                      <!--[if !mso]><!-- --> 
                      <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"> 
                      <!--<![endif]--> 
                      <style type="text/css">
                    #outlook a {
                      padding:0;
                    }
                    
                    .es-wrapper-color {
                        padding-top: 70px;
                        padding-bottom: 70px;
                    }
                    table.es-content-body {
                        border: 1px solid #D0D1D1;
                    }
                    .es-button {
                      mso-style-priority:100!important;
                      text-decoration:none!important;
                    }
                    a[x-apple-data-detectors] {
                      color:inherit!important;
                      text-decoration:none!important;
                      font-size:inherit!important;
                      font-family:inherit!important;
                      font-weight:inherit!important;
                      line-height:inherit!important;
                    }
                    .es-desk-hidden {
                      display:none;
                      float:left;
                      overflow:hidden;
                      width:0;
                      max-height:0;
                      line-height:0;
                      mso-hide:all;
                    }
                    [data-ogsb] .es-button {
                      border-width:0!important;
                      padding:10px 30px 10px 30px!important;
                    }
                    .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
                      background:#bf9000!important;
                      border-color:#bf9000!important;
                      color:#ffffff!important;
                    }
                    .es-button-border:hover {
                      border-color:#000000 #000000 #000000 #000000!important;
                      background:#bf9000!important;
                    }
                    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:22px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:22px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:20px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
                    </style> 
                     </head> 
                     <body style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
                      <div class="es-wrapper-color" style="background-color:#F9FAFF"> 
                       <!--[if gte mso 9]>
                          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                            <v:fill type="tile" color="#F9FAFF"></v:fill>
                          </v:background>
                        <![endif]--> 
                       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F9FAFF"> 
                         <tr> 
                          <td valign="top" style="padding:0;Margin:0"> 
                           <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                             <tr> 
                              <td align="center" style="padding:0;Margin:0"> 
                               <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:550px"> 
                                 <tr> 
                                  <td align="left" style="Margin:0;padding-bottom:10px;padding-top:40px;padding-left:40px;padding-right:40px"> 
                                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr> 
                                      <td align="center" valign="top" style="padding:0;Margin:0;width:470px"> 
                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                         <tr> 
                                          <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;font-size:0px"><img class="adapt-img" src="https://ldsdvt.stripocdn.email/content/guids/CABINET_9f52f61ac3e4947cf4ec50983d8edcaa/images/xana_logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="250"></td> 
                                         </tr> 
                                         <tr> 
                                          <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:40px;font-size:0"> 
                                           <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                             <tr> 
                                              <td style="padding:0;Margin:0;border-bottom:1px solid #e5e5e5;background:none;height:1px;width:100%;margin:0px"></td> 
                                             </tr> 
                                           </table></td> 
                                         </tr> 
                                       </table></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                                 <tr> 
                                  <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-bottom:30px"> 
                                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr> 
                                      <td align="center" valign="top" style="padding:0;Margin:0;width:510px"> 
                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                         <tr> 
                                          <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:30px"><h1 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#1f3d74">Verify your email address</h1></td> 
                                         </tr> 
                                         <tr> 
                                          <td align="center" class="es-m-p10r es-m-p10l" style="padding:0;Margin:0;padding-bottom:15px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#000000;font-size:18px">Please click on the link below in order to successfully verified your account.</p></td> 
                                         </tr> 
                                         <tr> 
                                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#000000;font-size:18px"><a target="_blank" href="${url}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#0000ff;font-size:18px">https://xanameditest.com/verification/</a><span style="color:#0000CD"></span></p></td> 
                                         </tr> 
                                       </table></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                                 <tr> 
                                  <td align="left" bgcolor="#1F3D74" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#1f3d74"> 
                                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr> 
                                      <td align="left" style="padding:0;Margin:0;width:510px"> 
                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                         <tr> 
                                          <td align="center" style="Margin:0;padding-top:10px;padding-bottom:40px;padding-left:40px;padding-right:40px;font-size:0px"><img class="adapt-img" src="https://ldsdvt.stripocdn.email/content/guids/CABINET_9f52f61ac3e4947cf4ec50983d8edcaa/images/footerwhitelogo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="197"></td> 
                                         </tr> 
                                         <tr> 
                                          <td align="center" class="es-m-p10r es-m-p10l" style="padding:0;Margin:0;padding-bottom:30px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#ffffff;font-size:18px">You received this email because you created an order with Xana Medi-Test. Questions or suggestions? Email us at info@xanamedtec.com</p></td> 
                                         </tr> 
                                         <tr> 
                                          <td align="center" class="es-m-p10r es-m-p10l" style="padding:0;Margin:0;padding-bottom:30px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#ffffff;font-size:18px">Suite 1.16 Universal Square Business Centre Devonshire Street North Manchester, M12 6JH</p></td> 
                                         </tr> 
                                       </table></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                                 <tr> 
                                  <td class="esdev-adapt-off" align="left" bgcolor="#1F3D74" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#1f3d74"> 
                                   <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:510px"> 
                                     <tr> 
                                      <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                                       <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                                         <tr> 
                                          <td align="left" style="padding:0;Margin:0;width:263px"> 
                                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                             <tr> 
                                              <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ldsdvt.stripocdn.email/content/guids/CABINET_9f52f61ac3e4947cf4ec50983d8edcaa/images/page1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="200"></td> 
                                             </tr> 
                                           </table></td> 
                                         </tr> 
                                       </table></td> 
                                      <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
                                       <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                                         <tr> 
                                          <td align="left" style="padding:0;Margin:0;width:267px"> 
                                           <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                             <tr> 
                                              <td align="left" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ldsdvt.stripocdn.email/content/guids/CABINET_9f52f61ac3e4947cf4ec50983d8edcaa/images/googleplayicon_1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="200"></td> 
                                             </tr> 
                                           </table></td> 
                                         </tr> 
                                       </table></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                                 <tr> 
                                  <td align="left" bgcolor="#1F3D74" style="padding:20px;Margin:0;background-color:#1f3d74"> 
                                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                     <tr> 
                                      <td align="center" valign="top" style="padding:0;Margin:0;width:510px"> 
                                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                         <tr> 
                                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ffffff;font-size:14px"><strong>©&nbsp;</strong>2021 Xana Medi-Test. All rights reserved</p></td> 
                                         </tr> 
                                       </table></td> 
                                     </tr> 
                                   </table></td> 
                                 </tr> 
                               </table></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table> 
                      </div>  
                     </body>
                    </html>`, // plain text body
                  };
                  transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                      console.log(err);
                      return reject(new Error("Something went wrong", err));
                    } else {
                      console.log("info: >>>>> " + info);
                      return resolve(res);
                    }
                  });
                }
              } else {
                console.log("err", err);
                return reject(new Error("Something went wrong", err));
              }
            });
          }
        }
      );
    }),

  registerGmail: (user) =>
    new Promise((resolve, reject) => {
      // Email duplication check
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        (err, res) => {
          if (res.length !== 0) {
            return reject("User already exists");
          } else {
            const sql = `INSERT into users (first_name,last_name, email, roleId_fk, confirmed) values ('${user.firstName}','${user.lastName}','${user.email}',1, 1)`;
            con.query(sql, async (err, res) => {
              console.log("res", res);
              console.log("error", err);
              if (res.affectedRows > 0) {
                const accessToken = await signJwt({
                  payload: res.insertId,
                });
                const refreshToken = await signRefreshToken({
                  payload: res.insertId,
                });
                const session = await sessionModel.createSession(
                  res.insertId,
                  refreshToken
                );
                const payload = {
                  userId: session.userId,
                  sessionId: session.sessionId,
                  accessToken,
                  refreshToken,
                };
                console.log("payload", payload);
                // send user back
                return resolve(payload);
              } else {
                return reject(new Error("Error adding user"));
              }
            });
          }
        }
      );
    }),
  verifyEmail: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `Update users SET confirmed=1 where id='${user.id}'`,
        (err, res) => {
          if (res) {
            return resolve(res);
          } else {
            console.log(err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),
  login: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where email='${user.email}' AND roleId_fk=1 LIMIT 1`,
        async (err, res) => {
          console.log("res", res);
          console.log("err", err);
          if (res) {
            if (res.length !== 0) {
              if (res[0]["confirmed"] != 1) {
                return reject(
                  new Error("Please verify your email in order to login")
                );
              }
              const { password: hashedPassword } = res[0];
              // = await bcrypt.compare(
              //   user.password,
              //   hashedPassword
              // );
              let validPass = 0;
              const decrypted = await mycrypto.decrypt(hashedPassword);

              if (decrypted === user.password) {
                validPass = true;
              } else {
                validPass = false;
              }

              if (validPass) {
                const accessToken = await signJwt({ payload: res[0].id });

                const refreshToken = await signRefreshToken({
                  payload: res[0].id,
                });
                const session = await sessionModel.createSession(
                  res[0].id,
                  refreshToken
                );

                console.log("res[0].id :: ", res[0].id);
                console.log("session", session);

                const payload = {
                  userId: session.userId,
                  sessionId: session.sessionId,
                  accessToken,
                  refreshToken,
                };

                // send user back
                return resolve(payload);

                // return resolve({ data: res, valid: true });
              } else {
                return reject({
                  data: err,
                  valid: false,
                  status: 500,
                  message: "Password is incorrect",
                });
              }
            } else {
              return reject({
                data: err,
                valid: false,
                status: 404,
                message: "Invalid email/password",
              });
            }
          } else {
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  loginGmail: (user) =>
    new Promise((resolve, reject) => {
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length !== 0) {
              const accessToken = await signJwt({ payload: res[0].id });

              const refreshToken = await signRefreshToken({
                payload: res[0].id,
              });
              const session = await sessionModel.createSession(
                res[0].id,
                refreshToken
              );

              console.log("res[0].id :: ", res[0].id);
              console.log("session", session);

              const payload = {
                userId: session.userId,
                sessionId: session.sessionId,
                accessToken,
                refreshToken,
              };

              // send user back
              return resolve(payload);
            } else {
              reject(new Error("Email not registered", err));
            }
          } else {
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  getProfile: (userId) =>
    new Promise((resolve, reject) => {
      if (!isNaN(userId)) {
        con.query(
          `select * from users where id='${userId}' LIMIT 1`,
          (err, res) => {
            if (res.length !== 0) {
              return resolve(res);
            } else {
              console.log("err", err);
              return reject(new Error("Invalid User Id", err));
            }
          }
        );
      } else {
        return reject(new Error("Invalid user id in token"));
      }
    }),

  getReportUrl: (userId, testId, QrId, Result) =>
    new Promise((resolve, reject) => {
      reportData();
      console.log(
        `SELECT test_info.id, users.first_name, users.last_name, users.dob, users.passport_number, test_info.test_name, test_info.test_description, test_info.test_performance, test_info.test_authorisation, test_info.date_register, test_info.date_conduct
        FROM test_info
        INNER JOIN users
        ON test_info.userId= ${userId}
        WHERE test_info.id = ${testId} LIMIT 1;
        `
      );
      con.query(
        `SELECT test_info.id, users.first_name, users.last_name, users.dob, users.passport_number, test_info.test_name, test_info.test_description, test_info.test_performance, test_info.test_authorisation, test_info.date_register, test_info.date_conduct
      FROM test_info
      INNER JOIN users
      ON test_info.userId= ${userId}
      WHERE test_info.id = ${testId} LIMIT 1;
      `,
        async (err, res) => {
          console.log(res);
          if (res && res.length > 0) {
            return resolve(res);
          } else {
            console.log("err", err);
            return reject(new Error("No test found", err));
          }
        }
      );
    }),

  updateProfile: (userId, userData, file) =>
    new Promise(async (resolve, reject) => {
      // User validation Check
      con.query(
        `select * from users where id='${userId}' LIMIT 1`,
        async (err, res) => {
          console.log("result", res);
          if (res.length === 0) {
            return reject(new Error("User not exists"));
          } else if (err) {
            return reject(new Error("Something went wrong --- ", err));
          } else {
            let image = res.image || "";
            if (file) {
              image = file.path;
              image =
                process.env.IMAGE + image.substring(image.indexOf("/") + 1);
            }
            const firstName = userData.firstName || res.first_name || "";
            const lastName = userData.lastName || res.last_name || "";
            const middleName = userData.middleName || res.middle_name || "";
            const mobile = userData.mobile || res.mobile || "";
            const dob = userData.dob || res.dob || "";
            const passportNumber =
              userData.passportNumber || res.passport_number || 0;
            console.log("PASSPORT");
            console.log(passportNumber);
            const gender = userData.gender || res.gender || "";
            const company = userData.company || res.company || "";
            const address = userData.address || res.address || "";
            const password = userData.password
              ? await mycrypto.encrypt(userData.password || res.password)
              : res.password || "";
            const sql = `UPDATE users SET first_name='${firstName}',last_name='${lastName}',middle_name='${middleName}',mobile='${mobile}',password='${password}',image='${image}', address='${address}', dob='${dob}', passport_number=${passportNumber}, gender='${gender}', company='${company}' WHERE id='${userId}'`;
            console.log("update query-->", sql);
            con.query(sql, (err, res) => {
              if (res) {
                console.log(`Affected Rows: ${res.affectedRows}`.yellow.bold);
                if (res.affectedRows > 0) {
                  console.log(res);
                  console.log(resolve(res));
                  return resolve(res);
                }
              } else {
                console.log("err", err);
                return reject(new Error("Something went wrong", err));
              }
            });
          }
        }
      );
    }),
  resendCode: (email) =>
    new Promise((resolve, reject) => {
      console.log("email", email);
      const code = Math.floor(1000 + Math.random() * 9000);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "mmm28800@gmail.com",
          pass: "  1310125897819  ",
        },
        // host: "mail.codistan.org",
        // port: 465,
        // secure: true, // true for 465, false for other ports
        // auth: {
        //   user: "malik.mubashir@codistan.org",
        //   pass: "Mailk@Mubashir321",
        // },
      });
      const mailOptions = {
        from: "mmm28800@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Password reset Link", // Subject line
        html: `<p>Your new email verification code is ${code}</p>`, // plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          return reject(new Error("Something went wrong", err));
        } else {
          console.log("new code ", code);
          con.query(
            `UPDATE users SET code = '${code}' WHERE email='${email}'`,
            (err, res) => {
              if (err) {
                console.log(err);
                return reject(new Error("Something went wrong"));
              } else {
                console.log("info: " + info);
                return resolve(res);
              }
            }
          );
        }
      });
    }),
  sendForgotPasswordMail: async (user) =>
    await new Promise((resolve, reject) => {
      console.log("user email: ", user.email);
      // Email duplication check
      con.query(
        `select * from users where email='${user.email}' LIMIT 1`,
        async (err, res) => {
          if (res) {
            if (res.length === 0) {
              return reject(new Error("Email not registered"));
            } else {
              const userId = res[0]["id"];
              const code = Math.floor(1000 + Math.random() * 9000);
              console.log("code::>> ", code);
              const emailToken = jwt.sign(
                {
                  id: userId,
                  email: user.email,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "3h",
                }
              );
              const url = `${process.env.URL}/api/user/reset-password/${emailToken}`;
              const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: {
                  user: "mmm28800@gmail.com",
                  pass: "  1310125897819  ",
                },
                // host: "mail.codistan.org",
                // port: 465,
                // secure: true, // true for 465, false for other ports
                // auth: {
                //   user: "malik.mubashir@codistan.org",
                //   pass: "Mailk@Mubashir321",
                // },
              });
              const mailOptions = {
                from: "mmm28800@gmail.com", // sender address
                to: user.email, // list of receivers
                subject: "Password reset Link", // Subject line
                html: `<p>Your email verification code is ${code}</p>`, // plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err);
                  return reject(new Error("Something went wrong", err));
                } else {
                  console.log("in else");
                  con.query(
                    `UPDATE users SET code = '${code}' WHERE id=${userId} `,
                    (err, res) => {
                      console.log("res::", res);
                      console.log("err::", err);
                      if (err) {
                        console.log(err);
                        return reject(new Error("Something went wrong"));
                      } else {
                        console.log("info: " + info);
                        return resolve(res);
                      }
                    }
                  );
                }
              });
            }
          } else {
            console.log(err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),

  resetPasswordVerify: async (token) =>
    await new Promise((resolve, reject) => {
      console.log("token", token);

      con.query(
        `select * from users where code='${token}' LIMIT 1`,
        async (err, res) => {
          if (res.length > 0) {
            return resolve(res);
          } else {
            console.log(err);
            return reject(new Error("Invalid verification code", err));
          }
        }
      );
    }),

  getUserTest: async (token) =>
    await new Promise((resolve, reject) => {
      console.log("token", token);
      console.log(`select * from test where userId=${token}`);
      con.query(
        `select * from test_info where userId=${token}`,
        async (err, res) => {
          if (res.length > 0) {
            return resolve(res);
          } else {
            console.log(err);
            return reject(new Error("No Result found", err));
          }
        }
      );
    }),

  updatePassword: async (password, userId) =>
    await new Promise(async (resolve, reject) => {
      console.log("password", password);
      console.log("userId", userId);
      const hashedPassword = await mycrypto.encrypt(password);
      // await bcrypt.hash(`${password}`, 10);
      con.query(
        `select * from users where id='${userId}' LIMIT 1`,
        (error, result) => {
          if (error) {
            console.log("error", error);
            return reject(
              new Error("Something went wrong while updating password", error)
            );
          } else {
            con.query(
              `UPDATE users SET password = '${hashedPassword}', code=null WHERE id=${userId}`,
              (err, res) => {
                if (res) {
                  return resolve(res);
                } else {
                  console.log("error", err);
                  return reject(
                    new Error(
                      "Something went wrong while updating password",
                      err
                    )
                  );
                }
              }
            );
          }
        }
      );
    }),
};

module.exports = userModel;
