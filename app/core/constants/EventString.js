// // import React, { useState, useEffect } from 'react';
// // import { openDatabase } from 'react-native-sqlite-storage';

// // var db = openDatabase({ name: 'EventDatabase1.db' });

// // const Eventdata = () => {
// //   let [flatListItems, setFlatListItems] = useState([]);

// //   useEffect(() => {
// //     db.transaction((tx) => {
// //       tx.executeSql('SELECT * FROM table_event_1', [], (tx, results) => {
// //         var temp = [];
// //         for (let i = 0; i < results.rows.length; ++i)
// //           temp.push(results.rows.item(i));
// //         setFlatListItems(temp);
// //       });
// //     });
// //   }, []);

// //   const EventInfo = flatListItems.map((item) => ({
// //     id: item.event_id,
// //     Title: item.event_name,
// //     Date: item.event_date,
// //     Time: item.event_time,
// //     Address: item.event_address,
// //     Description: item.event_description,
// //   }));

// //   console.log(EventInfo);
// //   //  console.log(Eventdata)
// //   //  return { Eventdata, EventInfo };
// //  };

// // export  {Eventdata,EventInfo};



// import React, { useState, useEffect } from 'react';
// import { openDatabase } from 'react-native-sqlite-storage';

// var db = openDatabase({ name: 'EventDatabase1.db' });

// const Eventdata = () => {
//   let [flatListItems, setFlatListItems] = useState([]);

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql('SELECT * FROM table_event_1', [], (tx, results) => {
//         var temp = [];
//         for (let i = 0; i < results.rows.length; ++i)
//           temp.push(results.rows.item(i));
//         setFlatListItems(temp);
//       });
//     });
//   }, []);

//   const EventInfo = flatListItems.map((item) => ({
//     id: item.event_id,
//     Title: item.event_name,
//     Date: item.event_date,
//     Time: item.event_time,
//     Address: item.event_address,
//     Description: item.event_description,
//   }));

//   return EventInfo ;
// };

// export default Eventdata;



// // const Eventdata =
// //  [{
// //     "id":"1",
// //     "Title":"Holi Celebration",
// //     "Date": "8 March",
// //     "Time":"7 pm",
// //     "Location":"SBR",
// //     "imageUrl":'https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_800/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1675949370%2Fasxf0w82bnt88nyeivmh.jpg',
// //     "Description":"We are coming up with MKSHFT, Punjabi dholis and best of the DJ`s from Gujrat . The artist lineup will bring you the most joyful Holi celebration."
// //     },
// //     {
// //     "id":"2",
// //     "Title":"Sunburn Arena Ft. Martin Garrix",
// //     "Date": "12 March",
// //     "Time":"4 pm",
// //     "Location":"Nirvana Party plot,Ahmedabad",
// //     "imageUrl":'https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-sunburn-arena-ft-martin-garrix-ahmedabad-0-2023-3-6-t-10-8-47.jpg' ,
// //     "Description":"The stage is set for the world's number one DJ -  Martin Garrix!! Get ready for the biggest-ever Sunburn Arena tour across eight cities this Holi season!!"
// //     },
// //     {
// //     "id":"3",
// //     "Title":"Jati Rehje - Gujarati Stand-up Comedy",
// //     "Date": "18 March",
// //     "Time":"9 pm",
// //     "Location":"HK Hall,Ahmedabad",
// //     "imageUrl":'https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-jati-rehje-gujarati-stand-up-comedy-ahmedabad-0-2023-1-24-t-3-57-3.jpg' ,
// //     "Description":"The comedy special with many stories but only ONE punchline. Jati Rehje maate Aavti Rehje. Manan is back with his new comedy special after the infamous first special “Ashudh Gujarati”"
// //     },
// //     {
// //     "id":"4",
// //     "Title":"SILENT DISCO VIBES BY DJ NIHAR",
// //     "Date": "11 March",
// //     "Time":"8 pm",
// //     "Location":"Frizbee SBR,Ahmedabad",
// //     "imageUrl":'https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-silent-disco-vibes-by-dj-nihar-0-2023-3-1-t-14-34-0.jpg',
// //     "Description":"A silent disco or silent rave is an event where people dance to music listened to on wireless headphones."
// //     }
// // ];

// // export default Eventdata;

