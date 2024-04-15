import connection from "../config/connectDB";
import bcrypt from "bcryptjs";

let findUserByEmail = (email)=>{
 return new Promise((resolve, reject) => {
     try{     // ? 는 이메일 입력 매개변수
         connection.query("SELECT * from users where email = ?", email, function(error, rows) {
            if(error) reject(error);
            let user = rows[0];  // rows는 배열 객체를 반환하고
            resolve(user);       // 사용자는 하나만 찾으므로 해당 배열 객체의 첫 번째를 가져와야함
         });
     }catch (e) {
         reject(e);
     }
 })
};

let compareUserPassword =  (user, password)=>{
    return new Promise(async (resolve, reject) => {                    // async / await 비동기 
        try{
            let match = await bcrypt.compare(password, user.password); // 입력비밀번호, 해시 비밀번호를 비교
            if(match) resolve(true);
            else resolve("사용자의 비밀번호가 올바르지 않습니다.")
        }catch (e) {
            reject(e);
        }
    })
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try{
            connection.query("SELECT * from users where id = ?", id, function(error, rows) {
                if(error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        }catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    compareUserPassword: compareUserPassword,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById
};