import fs from 'fs'
import path from 'path'
import matter from "gray-matter";

export default (req, res) => {
    let data;
    let exist = fs.existsSync(`./datas/works/${req.query.slug}.md`)

    if(exist){
        const fileData = fs.readFileSync(path.join(`./datas/works/${req.query.slug}.md`), 'utf-8')
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