import mqtt from 'mqtt'
import dotenv from 'dotenv'
dotenv.config()

const options = {
    username: process.env.REACT_APP_MQTT_USERNAME,
    password: process.env.REACT_APP_MQTT_PASSWORD
}

const MQTT_URL = process.env.REACT_APP_MQTT_URL

const client = mqtt.connect(MQTT_URL, options)

client.on('connect', () => {
    console.log('Connected to mqtt')
})

// Subscribe to topic
client.subscribe('home/data')
client.subscribe('home/device')


export default client