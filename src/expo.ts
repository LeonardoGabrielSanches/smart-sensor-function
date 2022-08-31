import { ExpoPushMessage } from "expo-server-sdk"
import { expo, to } from "./config/expoConfig"

export async function sendNotification(){
  let message = {
    to,
    sound: 'default',
    body: 'O dispositivo Motor de indução apresentou inconsistência em seu funcionamento.',
    title: 'Atenção',
  } as ExpoPushMessage

  await expo.sendPushNotificationsAsync([message]);
}