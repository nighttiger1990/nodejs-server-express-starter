import mysql from 'mysql'
import dotenv from 'dotenv'
import {apiResult} from './constants/message'
const dotenvConfig = dotenv.config()

console.log(dotenvConfig.error? "Can't load .env (config) file": "Load .env (config) successfully!")

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

export const executeQuery = (sql) => {
    const result = {...apiResult}
    return new Promise(resolve => {
        try {
            conn.query(sql, (err, data, fields) => {
                if (err) {
                    result.success = false
                    result.data = err
                } else {
                    result.data = data
                }
                resolve(result)
            })
        } catch (error) {
            result.success = false
            result.data = error
            return resolve(result)
        }

    })
}

export default conn