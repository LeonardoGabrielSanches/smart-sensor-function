import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import dotenv from 'dotenv';
dotenv.config();

import { firebaseConfig } from "./config/firebaseConfig";
import { watchHistory } from "./listeners/firebase/equipmentsListener";
import { sendNotification } from "./expo";

export const firebaseApp = firebase.initializeApp(firebaseConfig);

console.log(`Projeto foi inicializado ${JSON.stringify(process.env.NODE_ENV)}`);

watchHistory();