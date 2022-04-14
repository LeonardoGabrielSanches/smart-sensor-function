import { firebaseApp } from "../..";

export async function watchHistory() {
    const equipments = await firebaseApp.firestore().collection('equipments').get();

    equipments.docs.forEach((equipment) => {
        let isFirstSnapshot = true;

        firebaseApp.firestore().collection(`equipments/${equipment.id}/history`).onSnapshot((snapshot) => {
            if (isFirstSnapshot) {
                isFirstSnapshot = false;
                return;
            }

            snapshot.docChanges().map(x => {
                if (x.doc.data().value > equipment.data().maxValue)
                    console.log('enviar notificação');
            });
        });
    });
}
