import BlogPostPage from '../[slug]/page';

export const dynamic = 'force-dynamic';

export default function TicariUrunRehberi() {
  return <BlogPostPage params={{ slug: 'ticari-urun-rehberi' }} />;
}
