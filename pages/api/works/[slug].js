const { readFileSync, existsSync } = require('fs')
const { join } = require('path')
import matter from "gray-matter";

export default function handle(req, res) {
    let data;
    let exist = existsSync(join(process.cwd(), `/_datas/works/${req.query.slug}.md`))

    if(exist){
        const fileData = readFileSync(join(process.cwd(), `/_datas/works/${req.query.slug}.md`), 'utf-8')
        const { data: frontmatter, content } = matter(fileData)
        data = {
            ...frontmatter,
            slug: `${req.query.slug}.md`,
            content,
        }
        res.statusCode = 200
        res.json(data)
    } else {
        res.statusCode = 404
        res.json({error: true, message: 'no found'})
    }
}