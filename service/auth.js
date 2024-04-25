const auth = firebase.auth()

// Monitoramento do status
auth.onAuthStateChanged((user) => {
    const path = document.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

    if (user && fileName == "index.html") {
        // O usuário está logado
        setTimeout(() => {
            location = "/pages/home.html"
        }, 1500)// Esperar para o usuário ser add ao firestore
    }// Se logado e na tela de login
    else if(!user && fileName != "index.html"){
        // O usuário não está logado 
        document.querySelector("body").innerHTML = ""
        location = "/index.html"
    }// Se não logado e fora da tela de login
});

const createUser = (email,password,name) => {
    return new Promise((resolve,reject) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(credential => {
            firebase.firestore().collection('user').doc(credential.user.uid).set({
                name: name,
            })
            .then(() => 
                resolve(true)
            )
            .catch(error => 
                reject(error.code)
            )
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
        loading()
        auth.signOut()
        .then(res => {
                resolve(res)
                loading(false)
            })
        .catch(error => {
                reject(error.code)
                loading(false)
            }
        )
        
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