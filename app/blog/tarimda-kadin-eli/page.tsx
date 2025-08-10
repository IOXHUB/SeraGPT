import BlogPostPage from '../[slug]/page';

export const dynamic = 'force-dynamic';

export default function TarimdaKadinEli() {
  return <BlogPostPage params={{ slug: 'tarimda-kadin-eli' }} />;
}
