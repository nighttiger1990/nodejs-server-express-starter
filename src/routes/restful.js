import App from '../App'
import conn, { executeQuery } from '../database'
import { apiResult } from '../constants/message'
App.get("/api/restful/:tableName", (req, res) => {
    let tableName = req.params.tableName
    let sql = "SELECT * from " + tableName
    let id = req.query.id
    executeQuery(sql).then(data => {
        res.json(data)
    })
})
App.post("/api/restful/:tableName", (req, res) => {
    let tableName = req.params.tableName
    let body = {...req.body}
    let sqlGetAllColumn = "SHOW COLUMNS FROM " + tableName

    console.log(body)
    executeQuery(sqlGetAllColumn).then(data => {
        if (data.success) {
            let columns = columns = Array.isArray(data.data) ? data.data : [];
            //Loại đi id vì id auto increment
            if(columns.length>0 && columns[0].Field === 'id'){
                columns.shift()
            }
            let arrColumnValue = columns.map(e => {
                return {
                    columnName: e.Field,
                    value: typeof body[e.Field] === 'string' ? `'${body[e.Field]}'` : body[e.Field]
                }
            })
            //Tạo câu lệnh SQL dựa vào thông tin có được
            let joinColumns = arrColumnValue.map(item=>item.columnName).join(', ')
            let joinValues = arrColumnValue.map(item=>item.value).join(', ')
            let sqlInsert = `INSERT INTO ${tableName} (${joinColumns}) VALUES (${joinValues})`
            executeQuery(sqlInsert)
                .then(data => {
                    //Thêm sql vào data trả về
                    data.sql = sqlInsert
                    res.json(data)
                })

        } else {
            res.json(data)
        }

    }).catch(err => {
        let result = { ...apiResult }
        result.success = false
        result.data = err
        res.json(result)
    })
})