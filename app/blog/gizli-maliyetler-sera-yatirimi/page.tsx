import BlogPostPage from '../[slug]/page';

export const dynamic = 'force-dynamic';

export default function GizliMaliyetler() {
  return <BlogPostPage params={{ slug: 'gizli-maliyetler-sera-yatirimi' }} />;
}
