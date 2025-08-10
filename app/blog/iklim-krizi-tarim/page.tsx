import BlogPostPage from '../[slug]/page';

export const dynamic = 'force-dynamic';

export default function IklimKriziTarim() {
  return <BlogPostPage params={{ slug: 'iklim-krizi-tarim' }} />;
}
