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
  return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))
    if (path === 'contact' || path === 'quote') {
      const db = await getDb()
      const doc = { id: uuidv4(), type: path, ...body, createdAt: new Date().toISOString() }
      await db.collection('leads').insertOne(doc)
      return NextResponse.json({ ok: true, id: doc.id }, { headers: cors })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors })
  }
}
