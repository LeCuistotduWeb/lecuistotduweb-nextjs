import fs from 'fs'
import path from 'path'
import matter from "gray-matter";

export default (req, res) => {
    let data = []
    const files = fs.readdirSync(path.join('./datas/works'))
    files.map((filename) => {
        const fileData = fs.readFileSync(path.join(`./datas/works/${filename}`), 'utf-8')
        const { data: frontmatter, content } = matter(fileData)
        data.push({
            ...frontmatter,
            slug: filename.replace('.md', ''),
            content
        })
    })

    if(data){
        res.statusCode = 200
        res.json(data.reverse())
    }else {
        res.statusCode = 404
        res.json({error: true, message: 'no found'})
    }
}