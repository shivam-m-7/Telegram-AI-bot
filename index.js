const dotenv=require("dotenv");

const Telegram=require("node-telegram-bot-api");
const {Configuration,OpenAIApi}=require("openai");




 dotenv.config();

const bot=new Telegram(process.env.BOT_KEY, {polling:true});

const config=new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai=new OpenAIApi(config);

bot.on("message", async (msg)=>{
    const chatId=msg.chat.id;

    const reply= await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg.text,
        max_tokens: 4000,
        temperature: 0,

    })

    bot.sendMessage(chatId, reply.data.choices[0].text);
})