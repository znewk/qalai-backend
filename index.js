const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const TelegramApi = require('node-telegram-bot-api')
const db = require('./db')

const token = '5089950192:AAHi1skUKb7DBzSffl9SL6No5LqEjkoFvls'

const bot = new TelegramApi(token, {polling: true})

bot.onText(/\/start/, async (msg, match) => {
    console.log('TgBOT /start command is responsed ')
    await bot.sendMessage(msg.chat.id, 'Здравствуйте!\n' +
        'Qalai Notification Bot служит оповестителем всех взаимодействий пользователей платформы.\n\n' +
        'Для того чтобы начать получать оповещения вам нужно пройти регистрацию. Команда для регистрации - /register.')
})
bot.onText(/\/register/, async (msg, match) => {
    console.log('TgBOT /register command is responsed ')

    const findUser = await db.query(`SELECT id, chat_id, username FROM public.tg_admins where chat_id=${msg.chat.id}`)

    if(findUser.rows[0]!=undefined){
        await bot.sendMessage(msg.chat.id, `Что-то пошло не так! Вы уже зарегистрированны!`)
    } else {
        await db.query(`INSERT INTO public.tg_admins(chat_id, username) VALUES ('${msg.chat.id}', '${msg.chat.first_name}');`)
        await bot.sendMessage(msg.chat.id, `Вы успешно прошли регистрацию!\nВаши данные пользователя: ${msg.chat.id}, ${msg.chat.first_name}. Теперь вы начнете получать уведомления.
        `)
    }


})

const PORT = process.env.PORT || 3030

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, ()=>console.log('server started on port: ' + PORT))
