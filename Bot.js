import axios from "axios";
import { JSDOM } from "jsdom";
import TelegramBot from "node-telegram-bot-api";
// import fs from "fs";

// SYMBOL_X = '❌'
// SYMBOL_O = '⭕'
// SYMBOL_UNDEF = '◻'
const token = "5673090770:AAHZYfYHuCh8tzfshFf8Ro3jbKETTmdi9j8";

const bot = new TelegramBot(token, { polling: true });

// ссылка на игру в сети интернет
let url = 'https://n1c0re.github.io/TicTacToe.html'

// название игры (то, что указывали в BotFather)
const gameName = "TicTacToe"

//конфиг клавиатуры
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
    const url = "https://www.memify.ru/";
    let randomNumber;

    axios.get(url).then((Response) => {
      const currentPage = Response.data;

      const dom = new JSDOM(currentPage);

      const allElementsOfPage =
        dom.window.document.getElementsByClassName("infinite-item card");

      randomNumber = Math.floor(Math.random() * allElementsOfPage.length);
      console.log(allElementsOfPage.length);
      console.log(randomNumber);

      let imageText = allElementsOfPage[randomNumber]
        .getElementsByClassName("card-text")[0]
        .textContent.trim();

      let image = allElementsOfPage[randomNumber].querySelector("img").src;

      bot.sendPhoto(chatId, image, { caption: imageText });
    });
  }

  if (query.data === "ticTacToe") {
    //bot.sendMessage(chatId, "Game", {
    //  reply_markup: {
    //    inline_keyboard: ticTacToe,
    //  },
    //});
      bot.sendGame(chatId, gameName);
  }

  if (query.data === "ilya") {
    bot.sendMessage("1492333208", "Ты лох");
  }
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url });
});