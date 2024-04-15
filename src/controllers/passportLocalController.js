import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../services/loginService";

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use("localLogin", new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {    
            try {
                await loginService.findUserByEmail(email).then(async (user) => {    // 사용자를 찾는다
                    // 사용자가 없으면 "메일을 찾을 수 없습니다."를 보여주고 인증 실패
                    if (!user) return done(null, false, { message: `This user email "${email}" doesn't exist` })
                    if (user) {    // 사용자가 있으면 
                        //compare password(loginService.js -> compareUserPassword)
                        let match = await loginService.compareUserPassword(user, password);  
                        if (match === true) return done(null, user, null);  // 비밀번호를 비교하여 인증 성공
                        return done(null, false, { message: match });
                    }
                });

            } catch (err) {
                return done(null, false, { message: err });
            }
        }));
};

// 사용자 객체를 user.id에서 추출해서 세션에 저장
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// 사용자 id를 찾고나면 done(null, user);로 반환 
passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;