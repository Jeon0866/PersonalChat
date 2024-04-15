import connection from "../config/connectDB";
import bcrypt from "bcryptjs";

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmailUser(user.email);
            if(check === false) {
                //hash user's password
                let salt = bcrypt.genSaltSync(10);
                let data = {
                    fullname: user.fullname,
                    email: user.email,
                    password: bcrypt.hashSync(user.password, salt)
                };

                //create a new user
                connection.query("INSERT INTO users set ? ", data, function(error, rows) {
                    if (error) reject(error);
                    resolve("create a new user successfully");
                })
            }
            if(check === true)
                reject(`The email ${user.email} has already exist. Please choose another email`)

        } catch (e) {
            reject(e);
        }
    });
};

let checkEmailUser = (email) => {
return new Promise((resolve, reject) => {
    try{
        connection.query("SELECT * from users where email = ?", email, function(error, rows) { 
            if(error) reject(error);                                           // 데이터 삽입 중 만약 에러가 있으면 거부
            if(rows.length > 0) resolve(true);                                 // row의 길이가 0보다 크면 기본적으로 성공적
            resolve(false);
        })
    }catch (e) {
        reject(e);
    }
}) ;
};

module.exports = {
    createNewUser: createNewUser
};