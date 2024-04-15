require('dotenv').config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
//import connection from "./config/connectDB";

let app = express();

app.use(cookieParser("secret"));

//config session
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: false,
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
   }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// config view engine
viewEngine(app);

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log(`App is running at the ${port}`);
});


// genai로 데이터를 보내는 부분
app.use(express.json()); // JSON 데이터 처리를 위해 추가

//
const { GoogleGenerativeAI } = require("@google/generative-ai");

// api key
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/homepage', async (req, res) => {
   const msg = req.body.msg;  // 데이터 받는 부분
   console.log('Received message:', msg);
   //console.log(typeof(data)) // str

   try {
      // Gemini 모델 실행
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: "Hello! nice to meet you." }] },
          { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
          { role: "user", parts: [{ text: "You are a psychological counseling expert." }] },
          { role: "model", parts: [{ text: " " }] },
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });
      const result = await chat.sendMessage(msg);  // 데이터 받는 부분
      const response = await result.response;
      const text = response.text();
      console.log('Gemini response:', text);
  
      // 클라이언트에 응답 보내기
      res.json(text); //res.json({ status: 'success', response: text });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to process request' });
    }
  });
