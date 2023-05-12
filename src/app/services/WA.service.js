var botId = '101085162988536';
var phoneNbr = '523112356094';
var bearerToken = 'EAAK5RqFZCdycBABfNQYn0BGCkFEGPU0ULnzZCyBT5etpvwYAQNtvljZCaz6PbR6uDOTor2NsoEja2vAhVRRZB9i8L2STdOusGHGZBMmvhwc9NGSg5ZBBZCOloZAUpXkWCYICRpGu3xggVXCJeJqFmZCZAV6ak3qMwzSQJD5ZBrwtr0lBC50Va3vbPLg5XBKiWAhZAQj9yxv1OZBRuawZDZD';

var url = 'https://graph.facebook.com/v16.0/' + botId + '/messages';
var data ={
    messaging_product: 'whatsapp',
    to: phoneNbr,
    type: 'template',
    template: {
        name: 'hello_world',
        language:{ code: 'en_US' }
    }
};

var postReq = {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer' + bearerToken,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    json: true
};
/*
fetch(url, postReq)
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res)
    })
    .catch(error => console.log(error));

    */