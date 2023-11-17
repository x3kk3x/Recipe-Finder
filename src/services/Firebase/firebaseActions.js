// firebaseActions.js
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';


const db = getFirestore(); // Initialize Firestore

export const saveRecipe = async (userId, recipeId) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        savedRecipes: arrayUnion(recipeId)
    });
    // Update local state as needed
};

export const unsaveRecipe = async (userId, recipeId) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        savedRecipes: arrayRemove(recipeId)
    });
    // Update local state as needed
};
