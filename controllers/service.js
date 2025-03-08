const user={
    name: 'Marcel Nyembo',
    age: 25,
    email: 'marcelnyembo@gmail.com'
};
const getUser = (req, res) =>{
    res.send(user);
};

const getName = (req, res) =>{
    res.send(user.name);
};
const getEmail = (req, res) =>{
    res.send(user.email);
}

module.exports = {
    getUser,
    getName,
    getEmail
}