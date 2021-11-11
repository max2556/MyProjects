//Скрипт для считывания и записи счета игроков
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";


const database = getDatabase();
const _ = "scores/"
export const listOfRecords = await getScores();


export function updateDatabase(score_val, name) {
    let guid = uuidv4();
    //Или можно использовать crypto.randomUUID()
    console.log(guid);
    if (name !== null && name.length >= 3 && name.length < 16) {
        set(ref(database, _ + guid), { name: name, score: score_val });
    }
}

async function getScores() {
    let l = await get(ref(database, _)).then((snapshot) => {
        if (snapshot.exists()) {
            let scores = snapshot.val();
            console.log(scores);
            return scores
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    return l;
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}