const bcrypt = require('bcrypt');
const saltRounds = 10;

const localDB = [
    {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('admin', saltRounds),
        isAdmin: true
    }
];

function logUser(username, password) {
    return new Promise((resolve, reject) => {
        const user = localDB.find(user => user.username === username);
        if (!user) return reject({ status: 404, message: 'User not found' });

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return reject({ status: 500, message: 'Error comparing passwords' });
            if (!result) return reject({ status: 401, message: 'Invalid password' });

            resolve({ username: user.username, isAdmin: user.isAdmin });
        });
    });
}

function registerUserService(username, password) {
    return new Promise((resolve, reject) => {
        if (localDB.find(u => u.username === username)) {
            return reject({ status: 400, message: 'Username already exists' });
        }

        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) return reject({ status: 500, message: 'Error hashing password' });

            const newUser = {
                id: localDB.length + 1,
                username,
                password: hashedPassword,
                isAdmin: false
            };

            localDB.push(newUser);
            resolve({ username: newUser.username });
        });
    });
}

module.exports = { logUser, registerUserService, localDB };
