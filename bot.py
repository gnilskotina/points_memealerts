
from twitchio.ext import commands
from config import TOKEN,CHANNEL,REWARD
import asyncio
import websockets
import json

async def send_message(message):
    async with websockets.connect("ws://localhost:8765") as websocket:
        await websocket.send(message)
        response = await websocket.recv()
        print(f"Server replied: {response}")

class Bot(commands.Bot):
    def __init__(self):
        super().__init__(token=TOKEN, prefix='?', initial_channels=CHANNEL)

    async def event_ready(self):
        print(f'Logged in as | {self.nick}')
        print(f'User id is | {self.user_id}')

    async def event_message(self,ctx):
        try:
            if ctx.tags['custom-reward-id'] == REWARD:
                data = {
                    'name': ctx.tags['display-name'],
                    'url': ctx.content
                }
                asyncio.get_event_loop().run_until_complete(await send_message(json.dumps(data)))
        except:
            return
    

bot = Bot()
bot.run()




