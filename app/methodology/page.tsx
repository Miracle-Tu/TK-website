import { getAllMethodologies } from '@/lib/content';
import MethodologyPageClient from './MethodologyPageClient';

export default async function MethodologyPage() {
  const methodologies = await getAllMethodologies();
  return <MethodologyPageClient methodologies={methodologies} />;
}
