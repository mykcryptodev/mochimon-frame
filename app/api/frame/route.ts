import { getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress = '';
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    accountAddress = await getFrameAccountAddress(body, { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
  } catch (err) {
    console.error(err);
  }

  // get a random number between 1 and 3,333
  const random = Math.floor(Math.random() * 3333) + 1;

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://ipfs.io/ipfs/Qmae61Y9tLf5w9vgdjJAjXdXhkqcJViCHUD8SDgviPfTyv/${random}.png" />
    <meta property="fc:frame:button:1" content="#${random}" />
    <meta property="fc:frame:get_url" content="https://opensea.io/assets/base/0x949bed087ff0241e04e98d807de3c3dd97eaa381/${random - 1}" />
    <meta property="fc:frame:button:1" content="Next Mochimon" />
    <meta property="fc:frame:post_url" content="https://farcaster-frame-myk.vercel.app/api/frame" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
