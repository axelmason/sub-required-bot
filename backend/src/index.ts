import { Markup, Telegraf } from "telegraf";

const bot = new Telegraf()

bot.start((ctx) => {
    const keyboard = Markup.inlineKeyboard([
        Markup.button.webApp('Перейти в приложение', 'https://google.com')
    ])

    ctx.reply('1', keyboard);
})

bot.launch();