import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDa3ohtDMBgZY6JwWPtkkyHHZ0JfqO8PMg",
  authDomain: "e-commerce-test-89bc2.firebaseapp.com",
  projectId: "e-commerce-test-89bc2",
  storageBucket: "e-commerce-test-89bc2.appspot.com",
  messagingSenderId: "507736580933",
  appId: "1:507736580933:web:344c218245554f8492d42c",
  measurementId: "G-0R858NYSR8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)

    const userSnapShop = await getDoc(userDocRef);
    console.log(userSnapShop);

    if(!userSnapShop.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });

        }catch(error){
            console.log(error);
        }
    }
}

export default createUserDocumentFromAuth;
