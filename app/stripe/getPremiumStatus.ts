import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";

export const getPremiumStatus = async (app: FirebaseApp) => {
    const auth = getAuth(app)
    const userId = auth.currentUser?.uid
    if (!userId) throw new Error("User not logged in")

    const db = getFirestore(app)
    const subscriptionsRef = collection(db, "users", userId, "subscriptions")
    const q = query (
        subscriptionsRef,
        where("status","in",["trialing","active"])
    )

    return new Promise<string>((resolve,reject) => {
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                if (snapshot.docs.length === 0) {
                    console.log("No active or trialing subscriptions found")
                    resolve("basic")
                } else {
                    const productInfo = snapshot.docs[0].data().product
                    // Determine the subscription type
                    if (productInfo.id === "prod_Ur9oI9Qvwvh8KQ") {
                        resolve("premium-plus")
                    }
                    else if (productInfo.id === "prod_Ur9opm5B2xp7p8") {
                        resolve("premium")
                    }
                    else {
                        resolve("basic")
                    }
                }
                unsubscribe()
            },
            reject
        )
    })
}