import { LegalPage } from '@/components/global/legal-page';

const CONTENT = {
  title: 'Privacy Policy',
  intro:
    'This Privacy Policy applies to all personal information collected by Blackmont Advisory via the website located at https://www.blackmontadvisory.com/.',
  sections: [
    {
      id: 'what-is-personal',
      navLabel: 'Personal information',
      heading: '1. What is "personal information"?',
      paragraphs: [
        'The Privacy Act 1988 (Cth) currently defines "personal information" as meaning information or an opinion about an identified individual or an individual who is reasonably identifiable: whether the information or opinion is true or not; and whether the information or opinion is recorded in a material form or not.',
        'If the information does not disclose your identity or enable your identity to be ascertained, it will in most cases not be classified as "personal information" and will not be subject to this privacy policy.',
      ],
    },
    {
      id: 'what-info',
      navLabel: 'Information we collect',
      heading: '2. What information do we collect?',
      paragraphs: [
        'The kind of personal information that we collect from you will depend on how you use the website. The personal information which we collect and hold about you may include: Full name, email address and contact number.',
      ],
    },
    {
      id: 'how-collect',
      navLabel: 'How we collect information',
      heading: '3. How we collect your personal information',
      paragraphs: [
        '(a) We may collect personal information from you whenever you input such information into the website.',
        '(b) We also collect cookies from your computer which enable us to tell when you use the website and also to help customise your website experience. As a general rule, however, it is not possible to identify you personally from our use of cookies.',
      ],
    },
    {
      id: 'purpose',
      navLabel: 'Purpose of collection',
      heading: '4. Purpose of collection',
      paragraphs: [
        '(a) The purpose for which we collect personal information is to provide you with the best service experience possible on the website.',
        '(b) We customarily disclose personal information only to our service providers who assist us in operating the website. Your personal information may also be exposed from time to time to maintenance and support personnel acting in the normal course of their duties.',
        '(c) By using our website, you consent to the receipt of direct marketing material. We will only use your personal information for this purpose if we have collected such information direct from you, and if it is material of a type which you would reasonably expect to receive from us. We do not use sensitive personal information in direct marketing activity. Our direct marketing material will include a simple means by which you can request not to receive further communications of this nature.',
      ],
    },
    {
      id: 'access-correction',
      navLabel: 'Access and correction',
      heading: '5. Access and correction',
      paragraphs: [
        'Australian Privacy Principle 12 permits you to obtain access to the personal information we hold about you in certain circumstances, and Australian Privacy Principle 13 allows you to correct inaccurate personal information subject to certain exceptions. If you would like to obtain such access, please contact us as set out below.',
      ],
    },
    {
      id: 'complaint',
      navLabel: 'Complaints',
      heading: '6. Complaint procedure',
      paragraphs: [
        'If you have a complaint concerning the manner in which we maintain the privacy of your personal information, please contact us as set out below. All complaints will be considered by Blackmont Advisory and we may seek further information from you to clarify your concerns. If we agree that your complaint is well founded, we will, in consultation with you, take appropriate steps to rectify the problem. If you remain dissatisfied with the outcome, you may refer the matter to the Office of the Australian Information Commissioner.',
      ],
    },
    {
      id: 'overseas',
      navLabel: 'Overseas transfers',
      heading: '7. Overseas transfer',
      paragraphs: [
        'Your personal information may be transferred to recipients located in countries outside of Australia. Those countries in question have data protection laws which protect personal information in a way which is at least substantially similar to the Australian Privacy Principles, and there will be mechanisms available to you to enforce protection of your personal information under that overseas law. In the circumstances, we do not require the overseas recipients to comply with the Australian Privacy Principles and we will not be liable for a breach of the Australian Privacy Principles if your personal information is mishandled.',
      ],
    },
    {
      id: 'contact',
      navLabel: 'Privacy enquiries',
      heading: '8. How to contact us about privacy',
      paragraphs: [
        'If you have any queries, or if you seek access to your personal information, or if you have a complaint about our privacy practices, you can contact us through: info@blackmontadvisory.com',
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title={CONTENT.title}
      description='Learn how we handle and protect your personal information.'
      path='/privacy'
      intro={CONTENT.intro}
      sections={CONTENT.sections}
    />
  );
}
