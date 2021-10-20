import fs from 'fs'
import path from 'path'
import matter from "gray-matter";

export default (req, res) => {
    const dirRelativeToPublicFolder = 'works'
    const dir = path.resolve('./datas', dirRelativeToPublicFolder);
    const files = fs.readdirSync(dir)

    let data = []
    for (const file of files) {
        if(file === '/works/_drafts') return false;
        const fullPath = path.join(dir, file)
        const fileContents = fs.readFileSync(fullPath, {encoding:'utf8'})
        const matterResult = matter(fileContents)
        data.push({
            ...matterResult.data,
            url: file.replace('.md',''),
        })
    }

    res.statusCode = 200
    res.json(data)
}