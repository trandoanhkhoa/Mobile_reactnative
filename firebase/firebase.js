import { initializeApp } from "firebase/app";
import { doc,getDocs, getFirestore, addDoc, collection } from "firebase/firestore";
import { btnCinema, inputCinemaCity, inputCinemaName, btnFilm, btnCinemaFilm, btnRoom ,btnShowTime} from "./declare";
const firebaseConfig = {
    apiKey: "AIzaSyBercxa9lFLtC-ZP3q4WvJDKHtjRBOwfoc",
    authDomain: "didong-reactnative.firebaseapp.com",
    projectId: "didong-reactnative",
    storageBucket: "didong-reactnative.appspot.com",
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: "1:739326894116:android:6e3a0aca054fabab1938b1"
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

btnCinema.addEventListener('click', async () => {
  const objDataCinema = {
    name: inputCinemaName.value,
    city: inputCinemaCity.value
  }
  try {
    const docRef = await addDoc(collection(db, "cinemas"), objDataCinema);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

//*******************Film */
//random show time for film when hours must bewteen 08-22h and minutes must be muptiple of 5, minutes also have 2 digits
const randomShowTime = () => {
  const hours = Math.floor(Math.random() * 15) + 8;
  const minutes = Math.floor(Math.random() * 12) * 5;
  return `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}
// transform 05 june 2017 into 05/06
//transform june into number
const transformOpeningDate = (date) => {
  const arr = date.split(" ");
  const month = arr[1];
  const day = arr[0];
  const year = arr[2];
  const objMonth = {
    January: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  }
  return `${day}/${objMonth[month]}`;
}
let yearFilm = 2022; 
btnFilm.addEventListener('click', async () => {
  try{ 
    const response = await fetch(`http://www.omdbapi.com/?apikey=fba53a2f&t=${ yearFilm-- }`);
    const data = await response.json();
    const objDataFilm = {
      title: data.Title,
      opening_date: transformOpeningDate(data.Released),
      show_time: randomShowTime(),
      img: data.Poster,
      description: data.Plot,
      type: data.Genre,
      rating: data.imdbRating
    }
    const dbRef = await addDoc(collection(db, "films"), objDataFilm);
    console.log("Document written with ID: ", dbRef.id);
  } catch(error){
    console.log(error);
  }
}
);


//how to get all id from collection cinemas ?
// const querySnapshot = await getDocs(collection(db, "cinemas"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id);
// });

//**************cinema-film **************/
btnCinemaFilm.addEventListener('click', async () => {
  const querySnapshotCinemas = await getDocs(collection(db, "cinemas"));
  const arrCinemas = [];
  querySnapshotCinemas.forEach((doc) => {
    arrCinemas.push(doc.id);
  });


  const arrFilms = [];
  const querySnapshotFilms = await getDocs(collection(db, "films"));
  querySnapshotFilms.forEach((doc) => {
    arrFilms.push(doc.id);
  });

  for(let iIndexCinema = 0; iIndexCinema < arrCinemas.length; iIndexCinema++){
    for(let iIndexFilm = 0; iIndexFilm < arrFilms.length; iIndexFilm++){
      const objCinemaFilm = {
        cinemas_id: arrCinemas[iIndexCinema],
        films_id: arrFilms[iIndexFilm]
      }
      try {
        const docRef = await addDoc(collection(db, "cinemas-films"), objCinemaFilm);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
});
//**************rooms **************/
btnRoom.addEventListener('click', async () => {
  const querySnapshotCinemas = await getDocs(collection(db, "cinemas"));
  const arrCinemas = [];
  querySnapshotCinemas.forEach((doc) => {
    arrCinemas.push(doc.id);
  });

  for(let iIndexRoom = 0; iIndexRoom < 5; iIndexRoom++){
    for(let iIndexCinema = 0; iIndexCinema < arrCinemas.length; iIndexCinema++){
      const objRoom = {
        name: `${iIndexRoom + 1}`,
        cinema_id: arrCinemas[iIndexCinema],
        available: true
      }
      try {
        const docRef = await addDoc(collection(db, "rooms"), objRoom);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
})
//**************show-time **************/
btnShowTime.addEventListener('click', async () => {
  const querySnapshotRooms = await getDocs(collection(db, "rooms"));
  const arrRooms = [];
  querySnapshotRooms.forEach((doc) => {
    arrRooms.push(doc.id);
  });

  const querySnapshotFilms = await getDocs(collection(db, "films"));
  const arrFilms = [];
  querySnapshotFilms.forEach((doc) => {
    arrFilms.push(doc.id);
  });

  for(let iIndexShowTime = 0; iIndexShowTime < 5; iIndexShowTime++){
    for(let iIndexRoom = 0; iIndexRoom < arrRooms.length; iIndexRoom++){
      for(let iIndexFilm = 0; iIndexFilm < arrFilms.length; iIndexFilm++){
        const objShowTime = {
          time: randomShowTime(),
          room_id: arrRooms[iIndexRoom],
          film_id: arrFilms[iIndexFilm]
        }
        try {
          const docRef = await addDoc(collection(db, "show-times"), objShowTime);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  }
})