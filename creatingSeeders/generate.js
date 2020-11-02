const faker = require("faker");
const fetch = require('node-fetch');
const fs = require("fs");
const bcrypt = require("bcryptjs")

const getImages = async () =>{
    const res = await fetch("https://api.unsplash.com/photos/random?client_id=-cb9ZXL5S31Ll-ypFGj0qWuc23uKs__uAlGBIsMBraY&count=30");
    const data = await res.json();
    const urls = data.map(el=>el.urls.small);
    return urls
}

const create30FakeUsers = async () =>{
    const profileImages = await getImages();
    const users = [];
    for(let i=0;i<30;i++){
        const user = {};
        const name = faker.name.findName().split(" ");
        user.firstName = name[0];
        user.lastName = name[1];
        user.artistName = faker.internet.userName();
        user.email = faker.internet.email();
        user.hashedPassword = bcrypt.hashSync("password", 10);
        user.profileImageUrl = profileImages[i]
        users.push(user);
    }
    let userString = "";
    users.forEach(el=>{
        userString = userString + `{firstName: "${el.firstName}", lastName:"${el.lastName}", email: "${el.email}", artistName:"${el.artistName}", hashedPassword:"${el.hashedPassword}", profileImageUrl:"${el.profileImageUrl}", createdAt: new Date(), updatedAt: new Date()},
        `
    })
    fs.writeFile("./30FakeUsers.js", userString, ()=>{console.log("Done")})
}

//   create30FakeUsers();


const generate120FakeAlbums = async () =>{
    const albumImage = [...(await getImages()),...(await getImages()),...(await getImages()),...(await getImages())];
    const albums = [];
    for(let i = 0; i < 120; i++){
        const album = {};
        album.title = faker.commerce.productAdjective() + " " + faker.commerce.productMaterial();
        album.userId = Math.ceil(Math.random() * 30) + 2;
        album.artworkUrl = albumImage[i];
        album.genreId = Math.ceil(Math.random() * 12);
        albums.push(album)
    }
    let albumString = "";
    albums.forEach(el=>{
        albumString = albumString + `{title:"${el.title}", userId: ${el.userId}, artworkUrl: "${el.artworkUrl}", genreId: ${el.genreId}, createdAt: new Date(), updatedAt: new Date()},
        `
    })
    fs.writeFile("./120FakeAlbums", albumString, ()=>{console.log("Done")})
    


}

// generate120FakeAlbums();

const generate700FakeSongs = async () =>{
    const songs = [];
    for(let i=0; i< 700; i++){
        const song = {};
        song.title = faker.lorem.words();
        song.length = 30;
        song.albumId = Math.ceil(Math.random() *120) + 3;
        song.audioUrl = "https://gaseoussoundaudio.s3.us-east-2.amazonaws.com/FillerTrack.mp3"
        songs.push(song)
    }
    let songString = "[";
    songs.forEach(el=>{
        songString = songString + `{title: "${el.title}", length: ${el.length}, albumId: ${el.albumId}, audioUrl: "${el.audioUrl}", createdAt: new Date(), updatedAt: new Date()},
        `
    })
    songString = songString + `]`;
    fs.writeFile("./700FakeSongs.js", songString, ()=>console.log("done"))
}

// generate700FakeSongs();


const generate100FakePlaylists = () =>{
    const playlists = [];
    for(let i=0; i<100; i++){
        const playlist = {};
        playlist.userId = Math.ceil(Math.random() * 33);
        playlist.title = faker.company.bsAdjective() + " " + faker.company.bsNoun();
        playlist.public = true;
        playlists.push(playlist)
    }
    let playlistString = "[";
    playlists.forEach(el=>{
        playlistString = playlistString + `{userId:${el.userId}, title: "${el.title}", public: true, createdAt: new Date(), updatedAt: new Date()},
        `
    });
    playlistString += "]"
    fs.writeFile("./100FakePlaylists.js", playlistString, ()=>console.log("done"))
}

// generate100FakePlaylists();

const generate1000PlaylistSongs = () =>{
    let joinString = "[";
    for(let i = 0; i< 1000; i++){
        joinString += `{songId: ${Math.ceil(Math.random() * 700)}, playlistId: ${Math.ceil(Math.random() * 100)}, createdAt: new Date(), updatedAt: new Date()},
        `
    }
    joinString += "]";
    fs.writeFile("./1000PlaylistSongs.js", joinString, ()=>console.log("done"))
}

generate1000PlaylistSongs();