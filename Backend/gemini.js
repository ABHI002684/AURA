import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const geminiResponse = async (prompt,assistantName,userName) => {
  try{
    const query=`you are virtual assistant named ${assistantName} created by ${userName}
    your are not google. you will now behave like voice enabled assistant.
    your task is to understand user's natural language and respond with a json object like this

    {
       "type": "general" | "google search" | "youtube search"  | "youtube play" | 
               "get time" | "get date" | "get day" | "get month" | "get year" |
               "calculator open" | "instagram open" | "facebook open" | "wheather-show",
        "userInput": < original user input>   {remove username from user input if exist and if there is a search
                       of google or youtube then only search the part which  have been said to search in youtube or google},
        "response": < a short spoken response to read out loud to the user >                    
     }

     Instructions:
     - "type" : determine the intent of user
     - "userInput" : original sentence the user said
     - "response" : a short spoken voice-friendly response e.g if user says "what is your name" then response should be "I am Aura, your virtual assistant"
    
     type meanings:
      "general": "Any normal conversation or question that doesn’t match a specific action.",
      "google search": "Search the web using Google (e.g., 'Search Python tutorials on Google').",
      "youtube search": "Find videos on YouTube without playing them (e.g., 'Find cat videos').",
      "youtube play": "Play a specific YouTube video or song (e.g., 'Play Shape of You').",
      "get-time": "Return the current time.",
      "get-date": "Return today's date.",
      "get-day": "Return the current day of the week.",
      "get-month": "Return the current month.",
      "get-year": "Return the current year.",
      "calculator-open": "Open the calculator app.",
      "instagram-open": "Open Instagram.",
      "facebook-open": "Open Facebook.",
      "weather-show": "Show current weather or forecast."

      Important 
      - use {author name } if asked about who created you
      - only respond with json object nothing else

      now userInput is : ${prompt}  
    `
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
  });
  return response.text;
  console.log(response.text);
  }catch(err){
    return "error in generating response. try after sometime";
  }
}

export default geminiResponse;
 