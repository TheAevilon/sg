'use cliet'

const { default: Image } = require("next/image")


const images = ['chill.gif', 'retro2_live.gif', 'nord_car_live.gif', 'kirokaze_live.gif', 'gruvbox_room.png']
const URL = (image) => `https://raw.githubusercontent.com/D3Ext/aesthetic-wallpapers/main/images/${image}`

export { URL, images }

