const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb')
const uuidv1 = require('uuid/v1');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'netdaw';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){

  fs = require('fs')
  fs.readFile('index.html', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.send(data)
  });
})

 app.get('/jquery.min.js', function(req, res){

   fs = require('fs')
   fs.readFile('jquery.min.js', 'utf8', function (err,data) {
     if (err) {
       return console.log(err);
     }
     res.send(data)
   });
})

//////////////////////////////////
// Project
  // add
  // tempo
  // get
  // show
//////////////////////////////////

app.get('/getproject', function(req, res){
  res.send('project')
})

app.get('/Project/add', function(req, res) {
  // res.send("Here")
  // var name = req.query.name
  // var phone = req.query.phone
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Channel');
    collection.insertMany([
      {}
    ], function(err, resultC) {

      const collection = db.collection('Track');
      collection.insertMany([
        {Channel: resultC.insertedIds[0]}
      ], function(err, resultT) {

        const collection = db.collection('Mixer_Tracks');
        collection.insertMany([
          {Tracks: [resultT.insertedIds[0]]}
        ], function(err, resultMT) {

          const collection = db.collection('Output_Track');
          collection.insertMany([
            {}
          ], function(err, resultOT) {

            const collection = db.collection('Project');
            collection.insertMany([
              {Mixer_Tracks: resultMT.insertedIds[0], Output_Track: resultOT.insertedIds[0]}
            ], function(err, result) {
              res.send(result)
            });
          });
        });
      });
    });
  });
})

app.get('/Project/tempo', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var tempo = req.query.tempo
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Project');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {tempo: tempo}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Project/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Project');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      // var val = {}
      // docs.forEach(function(v){
      //   if (v["_id"] == _id)
      //     val = v;
      // })
      console.log("Found the following record");
      console.log(result)
      res.send(result)
    });
  });
})

app.get('/Project/show', function(req, res) {
  // res.send("show")
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Project');
  //   // Find some documents
    collection.find({}).toArray(function(err, docs) {
      // console.log("Found the following records");
      // console.log(docs)
      res.send(docs)
    });
  });
})

//////////////////////////////////
// Mixer Tracks
  // get
  // show
//////////////////////////////////

app.get('/Mixer_Tracks/show', function(req, res) {
    // res.send("show")
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    //   console.log("Connected successfully to server");
    //
      const db = client.db(dbName);
    //
      const collection = db.collection('Mixer_Tracks');
    //   // Find some documents
      collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        res.send(docs)
      });
    });
})

app.get('/Mixer_Tracks/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Mixer_Tracks');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      res.send(result)
    });
  });
})

//////////////////////////////////
// Output Track
  // gain
  // get
//////////////////////////////////

app.get('/Output_Track/show', function(req, res) {
    // res.send("show")
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    //   console.log("Connected successfully to server");
    //
      const db = client.db(dbName);
    //
      const collection = db.collection('Output_Track');
    //   // Find some documents
      collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        res.send(docs)
      });
    });
})

app.get('/Output_Track/gain', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var gain = req.query.gain
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Output_Track');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {gain: gain}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Output_Track/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Output_Track');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      res.send(result)
    });
  });
})

//////////////////////////////////
// Track
  // add
  // remove
  // get
  // show
//////////////////////////////////

app.get('/Track/add', function(req, res) {
  // res.send("Here")
  var Mixer_Tracks_id = req.query.Mixer_Tracks_id
  // var phone = req.query.phone
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Channel');
    collection.insertMany([
      {}
    ], function(err, resultC) {

      const collection = db.collection('Track');
      collection.insertMany([
        {Channel: resultC.insertedIds[0]}
      ], function(err, resultT) {

        const collection = db.collection('Mixer_Tracks');
        collection.find({_id: new mongodb.ObjectID(Mixer_Tracks_id)}).toArray(function(err, docs) {
          var Tracks = docs[0].Tracks

          Tracks.push(resultT.insertedIds[0])

          collection.updateOne({_id: new mongodb.ObjectID(Mixer_Tracks_id)}, {$set: {Tracks: Tracks}}, function(err, result) {
              res.send(result)
          });

        });

      });
    });
  });
})

app.get('/Track/remove', function(req, res) {
  // res.send("Here")
  var Mixer_Tracks_id = req.query.Mixer_Tracks_id
  var Track_id = req.query.Track_id
  var Channel_id = req.query.Channel_id
  // var phone = req.query.phone
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Channel');
    collection.deleteOne({_id: new mongodb.ObjectID(Channel_id)}, function(err, docsC) {

      const collection = db.collection('Track');
      collection.deleteOne({_id: new mongodb.ObjectID(Track_id)}, function(err, docsT) {

        const collection = db.collection('Mixer_Tracks');
        collection.find({_id: new mongodb.ObjectID(Mixer_Tracks_id)}).toArray(function(err, docs) {
          var Tracks = docs[0].Tracks

          var index = Tracks.indexOf(Track_id)
          Tracks.splice(index, 1)

          collection.updateOne({_id: new mongodb.ObjectID(Mixer_Tracks_id)}, {$set: {Tracks: Tracks}}, function(err, docsMT) {

              res.send({docsC: docsC, docsT: docsT, docsMT: docsMT})

          });

        });

      });

    });

  });
})

app.get('/Track/show', function(req, res) {
    // res.send("show")
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    //   console.log("Connected successfully to server");
    //
      const db = client.db(dbName);
    //
      const collection = db.collection('Track');
    //   // Find some documents
      collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        res.send(docs)
      });
    });
})

app.get('/Track/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Track');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      res.send(result)
    });
  });
})

app.get('/Track/getm', function(req, res) {
  var ids = req.query.ids
  ids = JSON.parse(ids)
  // res.send(ids)
  // return;
  // return;
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Track');

    // find({"_id" : {"$in" : [ObjectId("55880c251df42d0466919268"), ObjectId("55bf528e69b70ae79be35006")]}});

    // loop through all and convert to objectidtype
    ids.forEach(function(part, index, theArray) {
      theArray[index] = new mongodb.ObjectID(part);
    });

    collection.find({_id: { $in: ids } }).toArray(function(err, result) {
      res.send(result)
    });
  });
})

//////////////////////////////////
// Synth
  // get
//////////////////////////////////

//////////////////////////////////
// Audio
  // add
  // get
//////////////////////////////////

app.get('/Audio/add', function(req, res) {
  var audio = req.query.audio
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Audio');

    collection.insertMany([
      {audio: audio}
    ], function(err, result) {
      res.send(result)
    });
  });
})

app.get('/Audio/show', function(req, res) {
    // res.send("show")
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    //   console.log("Connected successfully to server");
    //
      const db = client.db(dbName);
    //
      const collection = db.collection('Audio');
    //   // Find some documents
      collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        res.send(docs)
      });
    });
})

app.get('/Audio/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Audio');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      res.send(result)
    });
  });
})

//////////////////////////////////
// Channel
  // get
  // show
//////////////////////////////////

app.get('/Channel/show', function(req, res) {
    // res.send("show")
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    //   console.log("Connected successfully to server");
    //
      const db = client.db(dbName);
    //
      const collection = db.collection('Channel');
    //   // Find some documents
      collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        res.send(docs)
      });
    });
})

app.get('/Channel/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Channel');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      res.send(result)
    });
  });
})

app.get('/Channel/getm', function(req, res) {
  var ids = req.query.ids
  ids = JSON.parse(ids)
  // res.send(ids)
  // return;
  // return;
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Channel');

    // find({"_id" : {"$in" : [ObjectId("55880c251df42d0466919268"), ObjectId("55bf528e69b70ae79be35006")]}});

    // loop through all and convert to objectidtype
    ids.forEach(function(part, index, theArray) {
      theArray[index] = new mongodb.ObjectID(part);
    });

    collection.find({_id: { $in: ids } }).toArray(function(err, result) {
      res.send(result)
    });
  });
})

//////////////////////////////////
// Audio Region
  // add
  // start
  // length
  // loop
  // get
  // show
  // remove
//////////////////////////////////

app.get('/Audio_Region/add', function(req, res) {
  var Channel_id = req.query.Channel_id

  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Audio_Region');
    collection.insertMany([
      {}
    ], function(err, resultAR) {

      const collection = db.collection('Channel');
      collection.find({_id: new mongodb.ObjectID(Channel_id)}).toArray(function(err, docs) {
        var Audio_Regions = ( typeof docs[0].Audio_Regions === "undefined" ? [] : docs[0].Audio_Regions )

        Audio_Regions.push(resultAR.insertedIds[0])

        collection.updateOne({_id: new mongodb.ObjectID(Channel_id)}, {$set: {Audio_Regions: Audio_Regions}}, function(err, result) {
            res.send(result)
        });
      });
    });
  });
})

app.get('/Audio_Region/remove', function(req, res) {
  var Channel_id = req.query.Channel_id
  var _id = req.query._id

  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Audio_Region');
    collection.deleteOne({_id: new mongodb.ObjectID(_id)}, function(err, docsAR) {

      const collection = db.collection('Channel');
      collection.find({_id: new mongodb.ObjectID(Channel_id)}).toArray(function(err, docs) {
        var Audio_Regions = ( typeof docs[0].Audio_Regions === "undefined" ? [] : docs[0].Audio_Regions )

        var index = Audio_Regions.indexOf(_id)
        Audio_Regions.splice(index, 1)

        collection.updateOne({_id: new mongodb.ObjectID(Channel_id)}, {$set: {Audio_Regions: Audio_Regions}}, function(err, result) {
            res.send(result)
        });
      });
    });
  });
})

app.get('/Audio_Region/start', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var start = req.query.start
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Audio_Region');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {start: start}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Audio_Region/length', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var length = req.query.length
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Audio_Region');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {length: length}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Audio_Region/loop', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var loop = req.query.loop
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Audio_Region');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {loop: loop}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Audio_Region/show', function(req, res) {
    // res.send("show")
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    //   console.log("Connected successfully to server");
    //
      const db = client.db(dbName);
    //
      const collection = db.collection('Audio_Region');
    //   // Find some documents
      collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        res.send(docs)
      });
    });
})

app.get('/Audio_Region/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Audio_Region');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      res.send(result)
    });
  });
})

//////////////////////////////////
// Midi Region
  // add
  // remove
  // start
  // add note
  // delete note
  // edit note
  // length
  // loop
  // get
//////////////////////////////////

app.get('/Midi_Region/add', function(req, res) {
  var Channel_id = req.query.Channel_id

  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Midi_Region');
    collection.insertMany([
      {}
    ], function(err, resultMR) {

      const collection = db.collection('Channel');
      collection.find({_id: new mongodb.ObjectID(Channel_id)}).toArray(function(err, docs) {
        var Midi_Regions = ( typeof docs[0].Midi_Regions === "undefined" ? [] : docs[0].Midi_Regions )

        Midi_Regions.push(resultMR.insertedIds[0])

        collection.updateOne({_id: new mongodb.ObjectID(Channel_id)}, {$set: {Midi_Regions: Midi_Regions}}, function(err, result) {
            res.send(result)
        });
      });
    });
  });
})

app.get('/Midi_Region/remove', function(req, res) {
  var Channel_id = req.query.Channel_id
  var _id = req.query._id

  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Midi_Region');
    collection.deleteOne({_id: new mongodb.ObjectID(_id)}, function(err, docsMR) {

      const collection = db.collection('Channel');
      collection.find({_id: new mongodb.ObjectID(Channel_id)}).toArray(function(err, docs) {
        var Midi_Regions = ( typeof docs[0].Midi_Regions === "undefined" ? [] : docs[0].Midi_Regions )

        var index = Midi_Regions.indexOf(_id)
        Midi_Regions.splice(index, 1)

        collection.updateOne({_id: new mongodb.ObjectID(Channel_id)}, {$set: {Midi_Regions: Midi_Regions}}, function(err, result) {
            res.send(result)
        });
      });
    });
  });
})

app.get('/Midi_Region/start', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var start = req.query.start
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Midi_Region');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {start: start}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Midi_Region/length', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var length = req.query.length
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Midi_Region');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {length: length}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Midi_Region/loop', function(req, res) {
  // res.send("Here")
  var _id = req.query._id
  var loop = req.query.loop
  // var email = req.query.email
  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //
    const collection = db.collection('Midi_Region');
  //   // Insert some documents
    collection.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {loop: loop}}, function(err, result) {
        res.send(result)
    });
  });
})

app.get('/Midi_Region/add_note', function(req, res) {
  var Midi_Region_id = req.query.Midi_Region_id
  var note = req.query.note
  var position = req.query.position
  var _id = uuidv1(); // ⇨ 'f64f2940-fae4-11e7-8c5f-ef356f279131'

  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Midi_Region');
    collection.find({_id: new mongodb.ObjectID(Midi_Region_id)}).toArray(function(err, docs) {
      var Notes = ( typeof docs[0].Notes === "undefined" ? [] : docs[0].Notes )

      Notes.push({_id: _id, note: note, position: position})

      collection.updateOne({_id: new mongodb.ObjectID(Midi_Region_id)}, {$set: {Notes: Notes}}, function(err, result) {
          res.send(result)
      });
    });

  });
})

app.get('/Midi_Region/edit_note', function(req, res) {
  var Midi_Region_id = req.query.Midi_Region_id
  var note = req.query.note
  var position = req.query.position
  var _id = req.query._id;

  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Midi_Region');
    collection.find({_id: new mongodb.ObjectID(Midi_Region_id)}).toArray(function(err, docs) {
      var Notes = ( typeof docs[0].Notes === "undefined" ? [] : docs[0].Notes )

      for(var i = 0; i < Notes.length; i++)
      {
        if(Notes[i]._id === _id)
        {
          Notes[i].note = note
          Notes[i].position = position
        }
      }

      collection.updateOne({_id: new mongodb.ObjectID(Midi_Region_id)}, {$set: {Notes: Notes}}, function(err, result) {
          res.send(result)
      });
    });

  });
})

app.get('/Midi_Region/remove_note', function(req, res) {
  var Midi_Region_id = req.query.Midi_Region_id
  var _id = req.query._id;

  // // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  //   console.log("Connected successfully to server");
  //
    const db = client.db(dbName);
  //

    const collection = db.collection('Midi_Region');
    collection.find({_id: new mongodb.ObjectID(Midi_Region_id)}).toArray(function(err, docs) {
      var Notes = ( typeof docs[0].Notes === "undefined" ? [] : docs[0].Notes )

      for(var i = 0; i < Notes.length; i++)
      {
        if(Notes[i]._id === _id)
        {
          Notes.splice(i, 1)
        }
      }

      collection.updateOne({_id: new mongodb.ObjectID(Midi_Region_id)}, {$set: {Notes: Notes}}, function(err, result) {
          res.send(result)
      });
    });

  });
})

app.get('/Midi_Region/show', function(req, res) {
    // res.send("show")
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    //   console.log("Connected successfully to server");
    //
      const db = client.db(dbName);
    //
      const collection = db.collection('Midi_Region');
    //   // Find some documents
      collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs)
        res.send(docs)
      });
    });
})

app.get('/Midi_Region/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('Midi_Region');
    // Find some documents
    collection.find({_id: new mongodb.ObjectID(_id)}).toArray(function(err, result) {
      res.send(result)
    });
  });
})


//////////////////////////////////
// Other
//////////////////////////////////

app.get('/add', function(req, res) {
  var name = req.query.name
  var phone = req.query.phone
  var email = req.query.email
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {name: name, phone: phone, email: email}
    ], function(err, result) {
      console.log(result)
      console.log("Inserted document into the collection");
      client.close();
      res.send('Added')
    });
  });
})

app.get('/show', function(req, res) {

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs)
      res.send(docs)
    });
  });
})

app.get('/get', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      var val = {}
      docs.forEach(function(v){
        if (v["_id"] == _id)
          val = v;
      })
      console.log("Found the following record");
      console.log(val)
      res.send(val)
    });
  });
})

app.get('/remove', function(req, res) {
  var _id = req.query._id
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection('documents');
    // Find some documents
    collection.deleteOne({_id: new mongodb.ObjectID(_id)}, function(err, docs) {
      console.log("Removed record");
      res.send("Removed")
    });
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
