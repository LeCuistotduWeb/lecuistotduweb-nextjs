const { readFileSync, readdirSync } = require('fs')
const { join } = require('path')
import matter from "gray-matter";

export default function handler(req, res) {
    let data = []

    const files = readdirSync(join(process.cwd(), '/_datas/works'))
    // readFileSync(join(__dirname, '_files', 'ci.yml'), 'utf8')
    files.map((filename, index) => {
        const fileData = readFileSync(join(process.cwd(), `/_datas/works/${filename}`), 'utf-8')
        const { data: frontmatter, content } = matter(fileData)
        data.push({
            ...frontmatter,
            slug: filename.replace('.md', ''),
            content
        })
    })

    if(data){
        res.statusCode = 200
        res.json(data.reverse().slice(0,6))
    } else {
        res.statusCode = 404
        res.json({error: true, message: 'no found'})
    }
}