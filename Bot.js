import axios from "axios";
import { JSDOM } from "jsdom";
import TelegramBot from "node-telegram-bot-api";
import { Express } from "express";
import path from "path";

const server = express();
const port = process.env.PORT || 5000;
const tRexGame = "T-Rex";
const queries = {};

// SYMBOL_X = '❌'
// SYMBOL_O = '⭕'
// SYMBOL_UNDEF = '◻'
const token = "5673090770:AAHZYfYHuCh8tzfshFf8Ro3jbKETTmdi9j8";

const bot = new TelegramBot(token, { polling: true });

const urlGame = "https://n1c0re.github.io/TicTacToe.html";

const TicTacToeGame = "TicTacToe";

const keyboard = [
  [
    {
      text: "Мемчики",
      callback_data: "mem",
    },
  ],
  [
    {
      text: "Крестики-Нолики",
      callback_data: "ticTacToe",
    },
  ],
  [
    {
      text: "Илья",
      callback_data: "ilya",
    },
  ],
];

const ticTacToe = [
  [
    {
      text: "1 Кнопка",
      callback_data: "1 button",
    },
    {
      text: "2 Кнопка",
      callback_data: "2 button",
    },
    {
      text: "3 Кнопка",
      callback_data: "3 button",
    },
  ],
  [
    {
      text: "4 Кнопка",
      callback_data: "4 button",
    },
    {
      text: "5 Кнопка",
      callback_data: "5 button",
    },
    {
      text: "6 Кнопка",
      callback_data: "6 button",
    },
  ],
  [
    {
      text: "7 Кнопка",
      callback_data: "7 button",
    },
    {
      text: "8 Кнопка",
      callback_data: "8 button",
    },
    {
      text: "9 Кнопка",
      callback_data: "9 button",
    },
  ],
];

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userFirstName = msg.from.first_name;

  await bot.sendVideo(chatId, "./Ban.mp4");
  bot.sendMessage(chatId, `Дарова, ${userFirstName}`);
});

// обработчик события присылания нам любого сообщения
bot.on("message", (msg) => {
  const userFirstName = msg.from.first_name;
  const userLastName = msg.from.last_name;
  const userNickName = msg.from.username;
  const userMessage = msg.text;
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  //   if ((userId = "1492333208")) {
  //     bot.sendMessage(chatId, "Я твой рот ебал");
  //   }
  // fs.writeFileSync("./message/a.json", JSON.stringify(msg));

  console.log(
    `(id: ${userId}) ${userFirstName} ${userLastName} (${userNickName}): ${userMessage}`
  );

  bot.sendMessage(chatId, "Привет, Друг! чего хочешь?", {
    // прикрутим клаву
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

// обработчик событий нажатий на клавиатуру
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "mem") {
    // const urlMem = "https://www.memify.ru/";

    // let randomNumber;

    // axios.get(urlMem).then((Response) => {
    //   const currentPage = Response.data;

    //   const dom = new JSDOM(currentPage);

    //   const allElementsOfPage = dom.window.document.querySelectorAll(
    //     ".infinite-item.card"
    //   );

    //   randomNumber = Math.round(Math.random() * allElementsOfPage.length);

    //   console.log(allElementsOfPage.length);
    //   console.log(randomNumber);
    //   let imageText;

    //   imageText = allElementsOfPage[randomNumber]
    //     .querySelector(".card-text")
    //     .textContent.trim();

    //   let image = allElementsOfPage[randomNumber].querySelector("img").src;

    //   bot.sendPhoto(chatId, image, { caption: imageText });
    // });
    let urlMeme = "https://www.memify.ru/meme/";

    let randomNumber = Math.round(Math.random() * 90000);

    urlMeme += randomNumber;

    console.log(urlMeme);

    axios.get(urlMeme).then((Response) => {
      const currentPage = Response.data;

      const dom = new JSDOM(currentPage);

      const allElementsOfPage =
        dom.window.document.querySelectorAll(".card.meme-detail");

      console.log(allElementsOfPage.length);

      let imageText;

      //console.log(allElementsOfPage[0]);

      imageText = allElementsOfPage[0].querySelector("div.card-text").text.trim();

      console.log(imageText);
        // .textContent.trim();

      // let image = allElementsOfPage[randomNumber].querySelector("img").src;
      // bot.sendPhoto(chatId, image, { caption: imageText });
    });
  }

  if (query.data === "ticTacToe") {
    //bot.sendMessage(chatId, "Game", {
    //  reply_markup: {
    //    inline_keyboard: ticTacToe,
    //  },
    //});
    bot.sendGame(chatId, TicTacToeGame);
  }

  if (query.data === "tRex"){
    bot.sendGame(chatId, tRexGame);
  }

  if (query.data === "ilya") {
    bot.sendMessage("1492333208", "Ты лох");
  }
});

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { urlGame });
});

bot.on("callback_query", function (query) {
  if (query.game_short_name !== gameName) {
      bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
  } else {
      queries[query.id] = query;
      let gameurl = "https://trexgame.herokuapp.com/index.html?id="+query.id;
      bot.answerCallbackQuery({
          callback_query_id: query.id,
          url: gameurl
      });
  }
});

server.use(express.static(path.join(__dirname, 'public')));