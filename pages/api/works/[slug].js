import fs from 'fs'
import path from 'path'
import matter from "gray-matter";

export default (req, res) => {
    const dirRelativeToPublicFolder = 'works'
    const dir = path.resolve('./datas', dirRelativeToPublicFolder);
    const files = fs.readdirSync(dir)
    const file = files.find(file => file.replace('.md','') === req.query.slug)
    let data = []

    if(file) {
        const fullPath = path.join(dir, file)
        const fileContents = fs.readFileSync(fullPath, {encoding:'utf8'})
        const matterResult = matter(fileContents)
        data.push({
            ...matterResult.data,
            url: file.replace('.md',''),
        })
        res.statusCode = 200
        res.json(data)
    } else {
        res.statusCode = 404
        res.json({error: true, message: 'not found'})
    }
}