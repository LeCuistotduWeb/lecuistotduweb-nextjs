import * as React from 'react';
import { motion } from "framer-motion"

const SkillsSection = (props) => {

    const toolsAndSkillData = ["HTML5", "CSS3", "SCSS", "Javascript", "ReactJs", "NextJs", "PHP", "Mysql", "Symfony 3/4", "Adobe suite", "Figma", "Wordpress", "NPM", "Vercel", "Git",]

    const listAnimation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 0,
                staggerChildren: 0.05,
            }
        }
    }

    const item = {
     hidden: { 
        opacity: 0,
        scale: 0,
    },
     show: { 
        opacity: 1,
        scale: [0,1.05,1], 
        }
    }

    return (
        <section className="skills section" id={"skills"}>
            <div className="container">
                <h2 className="section-title">Technologies et outils</h2>

                <div className="skillsList">
                    <motion.ul initial="hidden" animate="show" variants={listAnimation}>
                        {toolsAndSkillData.map((skill,index) => (
                            <motion.li  variants={item} key={index}>{skill}</motion.li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    )
}

export default SkillsSection