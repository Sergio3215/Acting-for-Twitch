const Tmi = require("tmi.js");

const connectTwitch = async ({user, myToken}, setConnect) => {
    let client = {};

    client = new Tmi.Client({
        options: {
          debug: false,
          reconnect: true
        },
        identity: {
          username: user,
          password: myToken
        },
        channels: [user]
      });

      if(location.hash.includes('#access_token=')){
        location.href = location.origin;
      }
    
    setConnect(client);
}


const getAccount = async (token, clientID_, setConnect) => {
    await fetch('https://api.twitch.tv/helix/users',
        {
            headers: {
                "Client-Id": clientID_,
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(async (obj) => {
            // console.log(obj.data)
            if (obj.status == undefined) {
                let myObj = obj.data[0];

                let login = {
                    user: myObj.login,
                    myToken: "oauth:" + token
                }

                connectTwitch(login, setConnect)

                // console.log(myObj.login, "oauth:" + token);
            }
        })
        .catch(err => {
            console.log(err.message)
            sessionStorage.removeItem("token");
        })
}

async function useGetToken(token, clientID_, setConnect) {
    await getAccount(token, clientID_, setConnect);
}

module.exports = {
    useGetToken
}