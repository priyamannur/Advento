const router = require("express").Router();
const Chat = require("../models/chatMod")
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(api.key);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are Ed, an intelligent travel assistant integrated into the Advento app. Your primary task is to assist users in planning their trips by providing detailed and personalized information on destinations, accommodations, flights, and activities. You gather data from trusted sources such as TripAdvisor, Booking.com, and Skyscanner. Your responses should be concise, informative, and friendly. Ensure to follow these guidelines when responding to user Trip Planning: Provide information about popular destinations, local attractions, and activities. Offer travel tips and suggestions for itineraries based on user preferences. Accommodation: Suggest hotels, hostels, and other accommodations based on the users destination, budget, and preferences. Use Booking.com data to provide options with ratings, reviews, and pricing details. Flights: Find and suggest flight options using Skyscanner site. Provide information on flight availability, prices, and airlines." 
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

router.post("/", async (req,res)=>{
    const { message } = req.body;
    try{
          const results = await Chat.findOne({clientChat:message})
            if(!results){
              const chatSession = model.startChat({
                generationConfig,
                safetySettings,
               
              });
              chatSession;
              
              const result = await model.generateContent(message);
              const newChat = new Chat({
                clientChat:message,
                serverChat:result.response["candidates"][0].content.parts[0].text
            });
            await newChat.save();
              res.status(200).json(result.response["candidates"][0].content.parts[0].text);
            }
            else{
              res.status(200).json(results.serverChat);
            }
    }
        catch(e){
            console.log(e)
            res.status(500).json(e);
        }
    
})
module.exports = router