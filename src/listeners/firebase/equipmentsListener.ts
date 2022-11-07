import { firebaseApp } from "../..";
import { TEMPERATURE_LIMIT, VIBRATION_LIMIT } from "../../constants/limits";
import { sendNotification } from "../../expo";

type DocType = {
    voltageTemperature: number;
    vibration:number;
}

export async function watchHistory() {
    const equipments = await firebaseApp.firestore().collection('equipments').get();

    equipments.docs.forEach((equipment) => {
        let isFirstSnapshot = true;

        firebaseApp.firestore().collection(`equipments/${equipment.id}/history`).onSnapshot((snapshot) => {
            if (isFirstSnapshot) {
                isFirstSnapshot = false;
                return;
            }
            

            snapshot.docChanges().map(async x => {
                const data = x.doc.data() as DocType

                if (data.vibration > VIBRATION_LIMIT){
                    await sendNotification('Motor com vibração elevada')
                    return
                }

                if (data.voltageTemperature > TEMPERATURE_LIMIT){
                    await sendNotification('Motor com temperatura elevada')
                    return
                }
                
            });
        });
    });
}
