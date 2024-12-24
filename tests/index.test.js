const axios = require("axios");

const BACKEND_URL = "http://localhost:3000";

describe("Authentication", () => {
  test('User is able to sign up only once', async () => {
    const username = "Ananya" + Math.random();
    const password = "Ananya@2808";
    const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
      type: "admin"
    });
    expect(response.status).toBe(200);
    const Updatedresponse = await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
      type: "admin"
    });
    expect(Updatedresponse.status).toBe(400);
  });

  test('Signup requests fail if username is empty', async () => {
    const password = "Ananya@2808";
    const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
      password,
      type: "admin"
    });
    expect(response.status).toBe(400);
  });

  test('Signin succeeds if the username and password both are correct', async () => {
    const username = "Ananya" + Math.random();
    const password = "Ananya@2808";
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password
    });
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password
    });
    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });

  test('Signin fails if the username and password are incorrect', async () => {
    const username = "Ananya" + Math.random();
    const password = "Ananya@2808";
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password
    });
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username: "WrongUsrname",
      password: "Wrongpass"
    });
    expect(response.status).toBe(403);
  });
});

describe("User metadata endpoints", () => {
  let token = "";
  let avatarId = "";
  beforeAll(async () => {
    const username = "Ananya" + Math.random();
    const password = "Ananya@2808";
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
      type: "admin"
    });
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password
    });
    token = response.data.token;
    const avatarResponse = axios.post(BACKEND_URL+"/api/v1/admin/avatar",{
      
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        "name": "Timmy"
      
    })
    avatarId = avatarResponse.data.avatarId
  });

  test("User can't update their metadata with wrong avatar id", async () => {
    
    const response = await axios.post(BACKEND_URL + "/api/v1/user/metadata", {
      avatarId: "123456543"},
      {
        headers:{
            "authorization":`Bearer${token}`
        }
      }
    );
    expect(response.status).toBe(400);
  });
  test("User can update their metadata with wrong avatar id", async () => {
    
    const response = await axios.post(BACKEND_URL + "/api/v1/user/metadata", {
      avatarId: avatarId},
      {
        headers:{
            "authorization":`Bearer${token}`
        }
      }
    );
    expect(response.status).toBe(200);
  });
  test("User can forget to update their metadata if there is no avatar id", async () => {
    
    const response = await axios.post(BACKEND_URL + "/api/v1/user/metadata", {
      },
      {
        headers:{
            "authorization":`Bearer${token}`
        }
      }
    );
    expect(response.status).toBe(403);
  });
});

describe("User avatar information",()=>{
    let token="";
    let avtarId="";
    let userId="";
    beforeAll(async () => {
        const username = "Ananya" + Math.random();
        const password = "Ananya@2808";
        const responseSignUp = await axios.post(BACKEND_URL + "/api/v1/signup", {
          username,
          password,
          type: "admin"
        });
        userId = responseSignUp.data.userId
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
          username,
          password
        });
        token = response.data.token;
        const avatarResponse = axios.post(BACKEND_URL+"/api/v1/admin/avatar",{
          
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
            "name": "Timmy"
          
        })
        avatarId = avatarResponse.data.avatarId
      });
    test("get back avatar info for a user",async()=>{
        const response = await axios.get(BACKEND_URL+"/api/v1/user/metadata/bulk?ids=[${userId}]");
        expect( response.data.avatars.length).toBe(1);
        expect(response.data.avatars[0].userId).toBe(userId);
    });
    test("get avaliable avatars",async()=>{
        const response = await axios.get(BACKEND_URL+"/api/v1/avatars")
        expect(response.data.avatars.length).not.toBe(0)
        const currentAvatar = response.data.avatars.find(x=>x.id==avatarId);
        expect(currentAvatar).toBeDefined()


    });
})
describe("space information",()=>{
    let mapId;
    let element1Id;
    let element2Id;
    let token="";
    let userId;
    beforeAll(async()=>{
        const username = "Ananya" + Math.random();
        const password = "Ananya@2808";
        const responseSignUp = await axios.post(BACKEND_URL + "/api/v1/signup", {
          username,
          password,
          type: "admin"
        });
        
        userId = responseSignUp.data.userId
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
          username,
          password
        });
        token = response.data.token;
        const element1 = axios.post(BACKEND_URL+"/api/v1/admin/element",{
            
            "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
            "width": 1,
            "height": 1,
          "static": true 
    },{
        headers: {
            authorization:`Bearer ${token}`
        }
    })
    const element2 = axios.post(BACKEND_URL+"/api/v1/admin/element",{
            
        "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        "width": 1,
        "height": 1,
      "static": true 
},{
    headers: {
        authorization: `Bearer ${token}`
    }
})
element1Id = element1.id
element2Id = element2.id
   
const map =await axios.post(BACKEND_URL+"/api/v1/admin/map",{
    "thumbnail": "https://thumbnail.com/a.png",
    "dimensions": "100x200",
    "name": "100 person interview room",
    "defaultElements": [{
            elementId: element1Id,
            x: 20,
            y: 20
        }, {
          elementId: element2Id,
            x: 18,
            y: 20
        }, {
          elementId: element2Id,
            x: 19,
            y: 20
        }, {
          elementId: element1Id,
            x: 19,
            y: 20
        }
    ]
 },{
    headers:{
        authorization:`Bearer $(token)`
    }
 })
 mapId = map.id;
});
})
 