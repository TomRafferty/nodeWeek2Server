const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get("/albums", (req, res) => {
  res.send(albumsData);
});

app.post("/albums", (req, res) => {
  const foundAlbum = albumsData.find(
    (album) => album.albumId === req.body.albumId
  );
  foundAlbum === undefined ? albumsData.push(req.body) : res.status(400);
  res.send();
});

app.get("/albums/:id", (req, res) => {
  console.log(req.params.albumID);
  console.log(typeof req.params.albumID);
  res.send(albumsData.find((album) => album.albumId === req.params.id));
});

app.put("/albums/:id", function (req, res) {
  //this is a modified version of Mark's code.
  const index = albumsData.findIndex((album) => album.albumId == req.params.id);
  if (index < 0)
    res.status(404).json({ success: false, message: "album not found" });
  const changes = req.body;
  let allowedChanges = {};
  ["collectionName", "artistName"].forEach((key) => {
    if (changes.hasOwnProperty(key)) allowedChanges[key] = changes[key];
  });
  const oldAlbum = albumsData[index];
  const newAlbum = { ...oldAlbum, ...allowedChanges };
  albumsData[index] = newAlbum;
  response.json({ success: true, oldAlbum: oldAlbum, updatedAlbum: newAlbum });
});

app.delete("/albums/:id", (req, res) => {
  const deleteIndex = albumsData.findIndex(
    (album) => album.albumId === req.params.id
  );
  deleteIndex !== -1 ? albumsData.splice(deleteIndex, 1) : res.status(400);
  res.send();
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
