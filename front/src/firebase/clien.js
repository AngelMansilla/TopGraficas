// Firebase nos servirar como un Storage para poder almacenar las imagenes 
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAxW0wFM_NwBXSJDZbYXlHRxVnxB0QDKGU",
  authDomain: "topgraficas-cde90.firebaseapp.com",
  projectId: "topgraficas-cde90",
  storageBucket: "topgraficas-cde90.appspot.com",
  messagingSenderId: "60080004392",
  appId: "1:60080004392:web:21679d8faf0b527c4f841d",
  measurementId: "G-QFSB95JPEF"
}

// Inicializamos al app de firebase si no tenemos ninguna inicializada
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}