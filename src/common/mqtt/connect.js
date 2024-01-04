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

client.subscribe('mqtt/topic')
// client.subscribe('mqtt/topic2')
client.on('message', (topic, message) => {
    console.log(`Received message on topic: ${topic}. Message: ${message.toString()}`);
    // if (topic === 'mqtt/topic') {
    // } else {
    //     console.log(topic)
    // }
})

export default client