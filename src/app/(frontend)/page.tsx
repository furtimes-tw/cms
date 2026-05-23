import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: '獸時報內容管理系統｜FurTimes CMS',
  description: '獸時報內容管理系統。',
  robots: {
    index: false,
    follow: false,
  },
}

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.badge}>FurTimes CMS</div>

          <h1 className={styles.title}>
            獸時報
            <br />
            內容管理系統
          </h1>

          <p className={styles.description}>
            這裡是獸時報的 CMS 入口。編輯、記者與管理者可以登入後台，
            管理文章、公告、媒體素材、標籤與贊助資訊。
          </p>

          <div className={styles.actions}>
            <Link href="/admin" className={styles.primaryButton}>
              進入後台
            </Link>

            <a href={frontendURL} className={styles.secondaryButton}>
              前往獸時報官網
            </a>
          </div>
        </div>

        <aside className={styles.panel}>
          <div className={styles.panelInner}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelEyebrow}>Dashboard Gateway</p>
                <h2 className={styles.panelTitle}>管理入口</h2>
              </div>

              <div className={styles.logoMark} aria-hidden="true">
                F
              </div>
            </div>

            <div className={styles.statusList}>
              <StatusItem
                title="文章與快訊"
                description="管理報導、專欄、專訪與即時更新。"
              />
              <StatusItem
                title="媒體素材"
                description="上傳縮圖、文章圖片與贊助商 Logo。"
              />
              <StatusItem
                title="贊助資訊"
                description="維護廠商、組織與個人贊助資料。"
              />
            </div>

            <p className={styles.notice}>
              CMS 後台僅供授權成員使用。一般讀者請前往<a href={frontendURL}>正式網站</a>。
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}

function StatusItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className={styles.statusItem}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
