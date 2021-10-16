import fs from 'fs'
import path from 'path'
import matter from "gray-matter";

export default (req, res) => {
    const data = []
    const dirRelativeToPublicFolder = 'works'
    const dir = path.resolve('./datas', dirRelativeToPublicFolder);
    const filenames = fs.readdirSync(dir)
    const files = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

    for (const file of files) {
        const fullPath = path.join(dir, file)
        const fileContents = fs.readFileSync(fullPath, {encoding:'utf8'})
        const matterResult = matter(fileContents)
        data.push(matterResult.data)
    }

    res.statusCode = 200
    res.json(filenames)
}