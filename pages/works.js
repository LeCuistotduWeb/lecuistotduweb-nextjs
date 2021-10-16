import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import * as fs from 'fs';
import path from 'path'
import matter from 'gray-matter'

export async function getStaticprops() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

const WorksPage = (props) => {
    const {allPostsData} = props
  return (
      <DefaultLayout>
          <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="works">
              {allPostsData.map(({ id, date, title }) => (
                  <li className={utilStyles.listItem} key={id}>
                      {title}
                      <br />
                      {id}
                      <br />
                      {date}
                  </li>
              ))}
          </main>

      </DefaultLayout>
  )
}

export default WorksPage
