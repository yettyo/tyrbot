import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
const puppeteer = require('puppeteer') //now we have added puppeteer in our code.

dotenv.config()

//Necessary discord library stuff do not delete
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})


//Bot startup (Can think of it as a constructor method in Java programming)
client.on('ready', () => {
    console.log('Tyr!')

    scrapeProduct('https://motd.today');
})

async function scrapeProduct(url: string) {
    const browser = await puppeteer.launch(); //wait for puppeteer to start
    const page = await browser.newPage(); //wait for browser to open up a new page
    await page.goto(url, {"waitUntil": "networkidle0"}); //wait for website to get the data before screenshotting it.
    await page.screenshot({path: 'motd.png'}); //take the screenshot and create a .png file with it
    await browser.close(); //close the browser since we are done with it
}


//This method's purpose is to respond if a user types the command in the chat
client.on('messageCreate', (message) => {
    if(message.author.bot) return;
    if(message.content === '?motd') {
        message.channel.send({files: ['motd.png']}); //take the motd.png and send it in the channel
    }
})





client.login(process.env.TOKEN);