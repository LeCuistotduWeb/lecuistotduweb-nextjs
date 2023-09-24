import React, {useLayoutEffect, useRef} from 'react';
import { gsap } from 'gsap';

const SkillsSection = () => {
    const skillSectionRef = useRef();
    const toolsAndSkillData = ["HTML5", "CSS3", "SCSS", "Javascript", "Typescript", "ReactJs", "NextJs", "PHP", "Mysql", "Symfony 3/4", "Adobe suite", "Figma", "Wordpress", "NPM", "Vercel", "Git", "PrismaJs", "Storybook"]
    const toolsAndSkillRef = useRef([])

    useLayoutEffect(()=>{
        let ctx = gsap.context(() => {
            gsap.from(skillSectionRef.current, {
                delay: 1,
                opacity: 0,
                ease: 'ease.inOut',
            })
            gsap.from(toolsAndSkillRef.current, { 
                delay: 1.2,
                duration: .3,
                rotation: 75,
                opacity: 0,
                ease: 'ease.inOut',
                stagger: {
                    amount: 1
                }
            });
        }, skillSectionRef);
        
        return () => ctx.revert();
    }, [])
    
    return (
        <section ref={skillSectionRef} className="skills section" id={"skills"}>
            <div className="container">
                <h2 className="section-title">Technologies et outils</h2>

                <div className="skillsList">
                    <ul initial="hidden" animate="show">
                        {toolsAndSkillData.map((skill,index) => (
                            <li ref={(el) => (toolsAndSkillRef.current[index] = el)} key={index}>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default SkillsSection