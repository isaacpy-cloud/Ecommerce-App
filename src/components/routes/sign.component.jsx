import { signInWithGooglePopup } from "../utils/firebase.utils"
import createUserDocumentFromAuth from "../utils/firebase.utils";


const SignIn = () => {
    const logGoogleUserr = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user)
    }

    return(
        <div>
            <h1>Sign In Pages</h1>
            <button onClick={logGoogleUserr}>
                Sign In With Google
            </button>
        </div>
    )
}

export default SignIn