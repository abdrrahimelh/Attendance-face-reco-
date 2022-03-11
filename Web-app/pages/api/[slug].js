// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  MongoClient
} from 'mongodb';

export default async function handler(req, res) {
  let pid = req.query.slug
  let date = pid.slice(0, 10)
  let seance = parseInt(pid.slice(10, 11))
 //We are leaving the database credentials on purpose. We could've stored it in .env file or in github secrets
  const client = await MongoClient.connect('mongodb+srv://root:qRlyzvz7IAgs1ug3@cluster0.qyoik.mongodb.net/attendance?retryWrites=true&w=majority')
  const db = client.db();
  const doc = await db.collection('attendance').find({
    day: date,
    séance: seance
  }).toArray();
  client.close();
  let presnom = [];
  let presim = []
  let absents = [];
  let datapres = [];
  var data = doc[0].data;
  for (var i = 0; i < data.length; i++) {
    if (data[i].attendance) {
      presnom.push(data[i].nom)
      presim.push(data[i].image)
    } else {
      absents.push(data[i].nom)
    }
    
   
  }
  for (var i = 0; i < presnom.length; i++) {
    datapres.push({nom:presnom[i],image:presim[i]})
  }
  res.status(200).json({
    presentsnoms: presnom,
    presimage: presim,
    absents: absents,
    datapres:datapres
  });
}