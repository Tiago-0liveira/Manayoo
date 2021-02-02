import fs from "fs"
import path from "path"

const folder = (fname: string) => require(path.join("..","..","..","..","public", "config", fname))

const configFolderNames = ["lang", "themes"]

export function fun() {
    configFolderNames.map(folderName => {
        for (const x in fs.readdirSync(folder(folderName))) {
            console.log(folderName, x)
        }
    })
}
