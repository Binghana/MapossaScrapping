import axios from "axios";
const url = 'https://us-central1-mapossadatatech.cloudfunctions.net/sms';
async function save(tableauSMS) {
  var data = JSON.stringify({
    data: tableauSMS,
  });

  var config = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      
    },
    data: data,
  };
  console.log("Let's save to database");
  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
async function getALL(){
    var config = {
      method: 'get',
      url: url,
      headers: {},
    };

    return axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

}
async function saveUnknow(tableauSMS) {
  var data = JSON.stringify({
    data: tableauSMS,
  });

  var config = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      "hasModel": false
    },
    data: data,
  };
  console.log("Let's save unknow to database");
  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
const smsDataBase = {
  save: save,
  get: getALL,
  saveUnknow : saveUnknow
  //otherGet : otherGet
};
export default smsDataBase;
