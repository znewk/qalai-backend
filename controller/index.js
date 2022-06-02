const db = require('../db')
const TelegramApi = require("node-telegram-bot-api");
const e = require("express");

const token = '5591974267:AAGbyDDu5IiFU07wkxxDOcfTTPhPcBlF2SI'

const bot = new TelegramApi(token, {polling: false})

class Controller {
    async createNewApplication(req, res) {
        const application = {
            name: req.body.name,
            phone: req.body.phone,
            type: req.body.type,
            typeOfNewFurniture: req.body.typeOfNewFurniture,
            typeOfRestFurniture: req.body.typeOfRestFurniture,
            sleepingPlaceSize: req.body.sleepingPlaceSize ? req.body.sleepingPlaceSize : false
        }
        console.log(req.body)
        const tgAdmins = await db.query('SELECT id, chat_id, username FROM public.tg_admins;')


        tgAdmins.rows.map(async (admin) => (
            await bot.sendMessage(admin.chat_id,
                `Новая заявка!\n\nВыбранная услуга: ${application.type}\nВид мебели: ${application.typeOfRestFurniture} ${application.typeOfNewFurniture}\n\nИмя пользователя: ${application.name}\nНомер пользователя: ${application.phone}\n\nСообщение от пользователя:\n${req.body.messageText}\n\nСкорее ответьте ему!
            `)
        ))


        res.send({application_added: true})
    }

    async createOrderToMattress(req, res) {
        const application = {
            name: req.body.name,
            phone: req.body.phone,
            type: req.body.type,
            length: req.body.length,
            width: req.body.width,
            message: req.body.message,
        }
        console.log(req.body)
        const tgAdmins = await db.query('SELECT id, chat_id, username FROM public.tg_admins;')


        tgAdmins.rows.map(async (admin) => (
            await bot.sendMessage(admin.chat_id,
                `Новый заказ на матрасы!\n\nВыбранный матрас: ${application.type}\nШирина х Длина: ${application.width}см x ${application.length}см\n\nИмя пользователя: ${application.name}\nНомер пользователя: ${application.phone}\n\nСообщение от пользователя:\n${req.body.messageText}\n\nСкорее ответьте ему!
            `)
        ))


        res.send({application_added: true})
    }

    async createNewApplicationToConsultation(req, res) {
        const application = {
            name: req.body.name,
            phone: req.body.phone,
        }
        console.log(req.body)
        const tgAdmins = await db.query('SELECT id, chat_id, username FROM public.tg_admins;')


        tgAdmins.rows.map(async (admin) => (
            await bot.sendMessage(admin.chat_id,
                `У клиента возникли вопросы!\n\nИмя пользователя: ${application.name}\nНомер пользователя: ${application.phone}\n\nСообщение от пользователя:\n${req.body.messageText}\n\nСкорее ответьте ему!
            `)
        ))


        res.send({application_added: true})
    }
}

module.exports = new Controller();