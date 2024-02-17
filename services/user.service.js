const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;


const getData = async () => fs.readFile('./data/users.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/users.json', JSON.stringify(data));


const addUser = async(user) => {
    if (!user.username || !user.password) {
        throw new Error('user must include username and password');
    }
    const id = uuidv4();
    user.id = id;
    const users = await getData() || [];
    const exists = users.find(u => u.username === user.username);
    if (exists) {
        throw new Error('user with email already exists');
    }
    users.push(user);
    await updateData(users);
    return user;
}

const updateUser = async (id, user) => {
    const users = await getData();
    const _user = await users.find(u => u.id === id);
    Object.assign(_user, user);
    await updateData(users);
    return _user;
}

const getUser = async () => {
    const users = await getData();
    return users;
}

const getUserByUsername = async (username, password) => {
    const users = await getData();
    const _user = await users.find(u => u.username === username && u.password === password);
    return _user;
}


module.exports = {
    addUser,
    updateUser,
    getUserByUsername,
    getUser,
}