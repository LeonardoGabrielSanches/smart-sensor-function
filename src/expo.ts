import { ExpoPushMessage } from "expo-server-sdk"
import { expo, to } from "./config/expoConfig"

export async function sendNotification(body:string){
  let message = {
    to,
    sound: 'default',
    body,
    title: 'Atenção',
  } as ExpoPushMessage

  await expo.sendPushNotificationsAsync([message]);
}