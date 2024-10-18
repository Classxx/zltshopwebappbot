import asyncio
import logging
import json

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import CallbackQuery
from aiogram import F, types
import keyboards as kb
from config import TOKEN

# Настройка бота и диспетчера
bot = Bot(token=TOKEN)
dp = Dispatcher()

# Приветственное и информационное сообщение
hello_message = '''Рады приветствовать вас в ZLT SHOP!
Нажмите на кнопку "Каталог", чтобы попасть на страницу с актуальными предложениями.'''

reviews_message = '''Впервые попав в наш канал и охнув от цен, по сравнению с ценами в магазине игры, будущие клиенты хотят увидеть отзывы о нашей работе, и мы это прекрасно понимаем. Но существует весомая причина, из-за которой мы всегда были противниками «сбора» отзывов. Это мошенники (кидалы).
...

Мы дорожим нашими клиентами и не хотим, чтобы они были обмануты.'''

# Обработчики команд и колбеков
@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    await message.answer(hello_message, reply_markup=kb.settings)

@dp.callback_query(F.data == 'reviews')
async def catalog(callback: CallbackQuery):
    await callback.answer()
    await callback.message.edit_text(reviews_message, reply_markup=kb.reviews_kb)

@dp.callback_query(F.data == 'goback_from_reviews')
async def goback(callback: CallbackQuery):
    await callback.answer()
    await callback.message.edit_text(hello_message, reply_markup=kb.settings)

# Обработчик вебхуков (точка входа для Yandex Cloud Functions)
async def handler(event, context):
    """Основная точка входа для Cloud Functions"""
    logging.info("Received event: %s", event)  # Логирование входящих данных
    try:
        # Проверка и декодирование JSON
        if isinstance(event['body'], bytes):
            body = event['body'].decode('utf-8')
        else:
            body = event['body']

        logging.info("Body: %s", body)  # Логирование тела запроса
        update_data = json.loads(body)  # Парсинг JSON
        logging.info("Update data: %s", update_data)  # Логирование данных обновления
        update = types.Update.to_object(update_data)  # Обработка JSON
        await dp.process_update(update)

        # Возвращаем успешный ответ
        return {
            "statusCode": 200,
            "body": json.dumps({"status": "success"})
        }
    except Exception as e:
        logging.error(f"Error processing update: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"status": "error", "message": str(e)})
        }

# Настройка вебхука
async def on_startup():
    webhook_url = "https://functions.yandexcloud.net/d4et07k8r0a2t13h9ecq"
    await bot.set_webhook(webhook_url)

# Основная функция
async def main():
    await on_startup()  # Устанавливаем вебхук

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print('Exit')
