const auth = firebase.auth()

// Monitoramento do status
auth.onAuthStateChanged((user) => {
    const path = document.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

    if (user && fileName == "index.html") {
        // O usuário está logado
        //location = "/pages/home.html"
    }// Se logado e na tela de login
    else if(!user && fileName != "index.html"){
        // O usuário não está logado 
        //location = "/index.html"
    }// Se não logado e fora da tela de login
});

const createUser = (email,password,name) => {
    return new Promise((resolve,reject) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(credential => {
            firebase.firestore().collection('user').doc(credential.user.uid).set({
                name: name,
            })
            .then(result => resolve(result))
            .catch(error => reject(error.code))
        }) 
        .catch(error => {
            reject(error.code)
        })
    })
}// Create User

const loginUser = (email,password) => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email,password)
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            reject(error.code)
        })
    })
}// Login User

const logoutUser = () => {
    return new Promise((resolve, reject) => {
        auth.signOut()
        .then(res => resolve(res))
        .catch(error => reject(error.code))
    })
}// Logout User

const resetPassword = (email) => {
    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email)
        .then(() => {
            resolve(true)
        })
        .catch(error => {
            reject(error.code)
        })
    })
}// Reset Password User