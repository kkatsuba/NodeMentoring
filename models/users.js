'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        login: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: false
    });
};