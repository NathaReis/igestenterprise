const createUser = async (email, password,name) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(credential => {
        return firebase.firestore().collection('user').doc(credential.user.uid).set({
            name: name
        })
    }) 
    .then(result => {
        return result;
    })
}