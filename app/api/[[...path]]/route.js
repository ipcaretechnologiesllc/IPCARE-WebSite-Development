import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

let cachedClient = null
async function getDb() {
  if (cachedClient) return cachedClient.db(process.env.DB_NAME || 'ipcare')
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  cachedClient = client
  return client.db(process.env.DB_NAME || 'ipcare')
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() { return new NextResponse(null, { status: 204, headers: cors }) }

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/')
  if (path === '' || path === 'health') {
    return NextResponse.json({ status: 'ok', service: 'IP Care Technologies API', time: new Date().toISOString() }, { headers: cors })
  }
  if (path === 'rental/quotes') {
    try {
      const db = await getDb()
      const docs = await db.collection('leads').find({ type: { $in: ['rental-quote', 'quote', 'contact'] } }).sort({ createdAt: -1 }).limit(100).toArray()
      return NextResponse.json({ count: docs.length, leads: docs.map(d => ({ ...d, _id: undefined })) }, { headers: cors })
    } catch (e) {
      return NextResponse.json({ error: e.message }, { status: 500, headers: cors })
    }
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))

    if (path === 'newsletter/subscribe') {
      const email = (body.email || '').toString().trim().toLowerCase()
      const source = (body.source || 'website').toString()
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400, headers: cors })
      }
      const db = await getDb()
      const coll = db.collection('newsletter_subscribers')
      const existing = await coll.findOne({ email })
      if (existing) {
        // Idempotent: return success but don't resend welcome
        return NextResponse.json({ success: true, duplicate: true }, { headers: cors })
      }
      const randomToken = Array.from({ length: 32 }, () => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 62))).join('')
      const userAgent = request.headers.get('user-agent') || ''
      const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || ''
      const doc = {
        id: uuidv4(),
        email,
        source,
        subscribedAt: new Date().toISOString(),
        ipAddress,
        userAgent,
        unsubscribeToken: randomToken,
      }
      await coll.insertOne(doc)

      // Send welcome email via SendGrid if configured (otherwise skip silently — MOCKED)
      if (process.env.SENDGRID_API_KEY) {
        try {
          const unsubLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae'}/unsubscribe?token=${randomToken}`
          const htmlBody = `<div style="font-family: Arial, sans-serif; color: #0F245F; max-width: 560px; margin: 0 auto;"><h2 style="color:#E87722;">Welcome to the IP Care Knowledge Base</h2><p>Thanks for subscribing. Once a month we'll send you our best articles on cybersecurity, cloud infrastructure and enterprise IT — straight from our engineers.</p><p>No spam. No promotions. Just insights.</p><p style="color:#666; font-size:13px; margin-top:28px;">If you didn't subscribe, you can <a href="${unsubLink}">unsubscribe here</a>.</p><p style="color:#666; font-size:13px;">— The IP Care Technologies Team</p></div>`
          await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              personalizations: [{ to: [{ email }] }],
              from: { email: 'newsletter@ipcare.ae', name: 'IP Care Technologies' },
              subject: 'Welcome to the IP Care Knowledge Base',
              content: [{ type: 'text/html', value: htmlBody }],
            }),
          })
        } catch (emailErr) {
          console.error('[newsletter/subscribe] SendGrid error:', emailErr.message)
        }
      } else {
        console.log('[newsletter/subscribe] MOCKED email (set SENDGRID_API_KEY to enable) — subscribed:', email)
      }

      return NextResponse.json({ success: true }, { headers: cors })
    }

    if (path === 'contact' || path === 'quote' || path === 'rental/quote' || path === 'careers/apply' || path === 'newsletter') {
      const db = await getDb()
      const typeMap = { 'rental/quote': 'rental-quote', 'careers/apply': 'career-application', 'newsletter': 'newsletter' }
      const type = typeMap[path] || path
      const doc = {
        id: uuidv4(),
        type,
        ...body,
        createdAt: new Date().toISOString(),
        source: body.source || 'website',
      }
      await db.collection('leads').insertOne(doc)
      return NextResponse.json({ ok: true, id: doc.id, reference: `IPC-${Date.now().toString().slice(-8)}` }, { headers: cors })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors })
  }
}
