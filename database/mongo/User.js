const mongoose = require('mongoose');

exports.schema = {
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    fullName: {type: String, default: null},
    username: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number},
    role: {type: String}
};


exports.indexes = [
    {firstName: 1, lastName: 1},
    {username: 1}
];

