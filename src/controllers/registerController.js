import registerService from "../services/registerService";

let getRegisterPage = (req, res) => {
    return res.render("register.ejs");
};

let createNewUser = async (req, res) => {
  try{
      let data = {
          fullname: req.body.fullName,
          email: req.body.email,
          password: req.body.password
      };
      //create a new user
      await registerService.createNewUser(data); // 새 사용자가 생성될 때까지 대기
      return res.status(200).json({
          message: "유저 생성 성공"
      })
  }catch (e) {
      return res.status(500).json(e);
  }
};
module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser: createNewUser
};