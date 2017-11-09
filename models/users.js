module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
        // associations can be defined here
            }
        }
    });
    return users;
};