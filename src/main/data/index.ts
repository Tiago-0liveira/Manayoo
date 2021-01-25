
let express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())
app.use(morgan('tiny'))
const path = require("path")
const sqlite3 = require("sqlite3")
import { makeid, encrypt, decrypt } from "./helpers/encryption"

const dbName = "testing"
const dbConfigSqlParams = "(firstTime, autoLogin, lastLogin, password, theme, lang)"
const expressPORT: number = 2000;


let db = new sqlite3.Database(path.join(__dirname, "..", "public", "db.db"), (err: any) => {
    if (err) {
        return console.error(err);
    }
    db.run(`CREATE TABLE IF NOT EXISTS ${dbName} (firstTime INTEGER, autoLogin INTEGER, lastLogin TEXT, password TEXT, theme TEXT, lang TEXT)`, (runres: any, err: Error | null) => { if (err) return console.error(err) })
    console.log("database created")
    db.all(`SELECT * FROM ${dbName}`, (err: any, rows: string | any[]) => {
        if (err) console.error(err)
        if (rows.length <= 0) {
            console.log("rows less then 0 or equal, insersting to db")
            db.run(`INSERT INTO ${dbName} ${dbConfigSqlParams} VALUES (?,?,datetime('now', 'localtime'),?,?,?)`, [1, 0, "", "dark", "enEN"])
        }
    })
    console.log(`Connected to the SQlite database.`);
});


app.post("/updateAppConfig", (req: any, res: { json: (arg0: { status: boolean; }) => void; }) => {
    let thing = req.body.data
    const div = thing.split(thing.slice(-12))
    const data = JSON.parse(decrypt(div[0], div[1]))
    db.run(`DELETE FROM ${dbName}`)
    db.run(`INSERT INTO ${dbName} ${dbConfigSqlParams} VALUES (?,?,datetime('now', 'localtime'),?,?,?)`, [data.firstTime ? 1 : 0, data.autoLogin ? 1 : 0, data.password, data.theme, data.lang])
    res.json({ status: true })
})
app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send(`<h1>Listening on Port ${expressPORT}</h1>`)
})
app.get("/ping", (_req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    res.send({ message: "pong" })
})
app.get("/getAppConfig", async (req: { params: { param: string | number; }; }, res: { send: (arg0: any) => any; json: (arg0: string | number) => void; }) => {
    db.get(`SELECT * FROM ${dbName}`, (sql: any, row: any, err: any) => {
        if (err) return res.send(err)
        const { encrypted, key } = encrypt(JSON.stringify({
            ...row,
            firstTime: row.firstTime === 1,
            autoLogin: row.autoLogin === 1
        }))
        const rand = makeid(12)
        res.send(`${encrypted}${rand}${key}${rand}`)
    })
})


app.listen(expressPORT, () => {
    console.log("Listening on " + expressPORT)
})

module.exports = app
