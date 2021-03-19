const { VK, Keyboard } = require('vk-io');
const { HearManager } = require('@vk-io/hear');
const fs = require('fs');
const base = require('./base')
const config = require('./config.json');
const vk = new VK ({
    token: config.token,
    apiMode: config.api_mode,
    pollingGroupId: config.group_id,
    owner_id: config.owner_id
});

vk.updates.hear(/^(?:(?:💼\s)?Меню)$/i, async (context) => {
    vk.api.messages.send({
        peer_id: context.peerId,
        message: "💡Выберите нужное действие:",
        keyboard: Keyboard.keyboard([
            Keyboard.textButton({
                label: "🗂 FAQ",
                color: "positive"
            }),
            Keyboard.textButton({
                label: "🎱 Вызвать поддержку",
                color: "primary"
            }),
            Keyboard.textButton({
                label: "❕ Закрыть меню",
                color: "negative"
            }),
        ]).oneTime()
    });
});

vk.updates.hear(/^(?:(?:🗂\s)?FAQ)$/i, async (context) => {
    vk.api.messages.send({
        peer_id: context.peerId,
        message: `В данном разделе описаны часто задаваемые вопросы🔔
Вы всегда можете продложить идеи для развития этого раздела через поддержку =)`,
        keyboard: Keyboard.keyboard([
            Keyboard.textButton({
                label: "⬅ Назад",
                color: "negative"
            }),
            Keyboard.textButton({
                label: "В разработке",
                color: "positive"
            }),
            Keyboard.textButton({
                label: "В разработке",
                color: "positive"
            }),
        ]).oneTime()
    });
});

vk.updates.hear(/^🎱 Вызвать поддержку$/i, async (context) => {
    vk.api.messages.send({
        peer_id: context.peerId,
        message: `Пожалуйста, опишите ваш вопрос максимально подробно!
В течение нескольких часов наша поддержка ответит вам.`,
        keyboard: Keyboard.keyboard([
            Keyboard.textButton({
                label: "💼 Меню",
                color: "positive"
            }),
        ]).inline()
    });
});

vk.updates.hear(/^❕ Закрыть меню/i, msg => {
    msg.send(`Меню закрыто ❌
Его всегда можно вызвать повторно, написав: меню.`)
});

async function run() {
    await vk.updates.startPolling();
    console.log(">_ The bot is running");
};

run().catch(console.error);