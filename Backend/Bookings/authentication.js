var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var documentClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });

module.exports.userVerifier = async (id) => {

    var params = {
        TableName: 'Users',
        Key: {
            id: id,
        }
    }

    var data = await documentClient.get(params).promise();

    if(!data.Item) {
        return {
            success: false
        };
    } else {
        return {
            success: true,
            user: data.Item
        };
    }

}

module.exports.serviceVerifier = async (id) => {

    var params = {
        TableName: 'Services',
        Key: {
            id: id,
        },
        ProjectionExpression: 'role',
    }

    var data = await documentClient.get(params).promise();

    if(!data.Item) {
        return{ 
            success: false
        };
    } else {
        return {
            success: true,
            data: data.Item
        };
    }

}

module.exports.addedBefore = async (userId, serviceId) => {

    var params = {
        TableName: 'Carts',
        Key: {
            userId: userId,
            serviceId: serviceId
        }
    }

    var data = await documentClient.get(params).promise();

    if(!data.Item) {
        return true;
    } else {
        return false;
    }

}