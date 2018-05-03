import App from './App'
import express from 'express'
import conn from './database'
//Import api restful tương ứng vs database
import './routes/restful';

/**
 * Default ROUTER
 */
// App.use(express.static("./public"))
App.get('/', (req, res) => {
    let object = {}
    let object1 = { id: 1, value: 2 }
    let object2 = {...object1}
    let object3 = {...object2}
    res.json({success: true, message: "This is default API"})
});
/**
 * RUN APP 
 */

conn.connect(err=>{
    console.log(err ? "Can't connect database" : "Connect database Successfully.", err ? err : "")
    let server = App.listen(8880, () => {
        let host = server.address().address
        let port = server.address().port

        console.log("Example app listening at http://%s:%s", host, port)
    });
})


