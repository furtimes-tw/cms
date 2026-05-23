import React from 'react'
import { Link } from '@payloadcms/ui'

export default function FurTimesDashboard() {
  return (
    <section className="furtimes-admin-dashboard">
      <div className="furtimes-admin-dashboard__card">
        <p className="furtimes-admin-dashboard__eyebrow">
          獸時報 CMS
        </p>

        <h1 className="furtimes-admin-dashboard__title">
          歡迎回到獸時報編輯後台
        </h1>

        <p className="furtimes-admin-dashboard__description">
          這裡是獸時報內容管理系統。你可以在左側選單管理文章、公告、標籤、贊助資訊與媒體素材。
        </p>

        <div className="furtimes-admin-dashboard__actions">
          <Link href="/admin/collections/posts/create">
            新增文章
          </Link>

          <Link href="/admin/collections/announcements/create">
            新增公告
          </Link>

          <Link href="/admin/collections/media">
            管理媒體
          </Link>
        </div>
      </div>
    </section>
  )
}
