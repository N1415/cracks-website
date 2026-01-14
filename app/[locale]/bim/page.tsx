import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BIM Company',
  description: 'BIM Company Case Study',
};

export default function BimPage() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <iframe
        src="https://bim-9azfqw3.gamma.site/"
        className="w-full h-full border-none"
        title="BIM Company"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
