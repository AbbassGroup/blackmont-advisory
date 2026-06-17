export default function AgreementContent() {
  return (
    <div className='text-xs text-gray-500 leading-relaxed [&_p]:mb-2 [&_ol]:list-none [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:text-gray-700'>
      <p>
        You request further information concerning the business for the purpose of determining
        whether to pursue its acquisition.
      </p>

      <p><strong>In this Agreement:</strong></p>
      <ol type='A' className='list-none pl-5 space-y-1 mb-2'>
        <li><strong>&quot;The Vendor&quot;</strong> is the proprietor of the business that is advertised for sale.</li>
        <li><strong>&quot;The Vendor&apos;s Agent&quot;</strong> is Abbass Advocacy Pty Ltd (ACN 674 429 255) trading as Abbass Business Brokers (ABN 78 674 429 255).</li>
        <li><strong>&quot;The Prospective Purchaser&quot;</strong> means you and includes any natural person or legal entity, together with any related entity and any agent or authorised representative of that person or entity.</li>
        <li><strong>&quot;The Purpose&quot;</strong> means the evaluation by the Prospective Purchaser of the Vendor&apos;s business for the purpose of purchasing the business.</li>
        <li>
          <strong>&quot;The Confidential Information&quot;</strong> means all information relating to the Vendor&apos;s business which is provided by the Vendor&apos;s Agent to the Prospective Purchaser, including:
          <ol type='I' className='pl-5 mt-1 space-y-1'>
            <li>financial and commercial information about the Vendor, the Vendor&apos;s business, or persons with whom the Vendor deals, including details of agreements with employees, contractors, customers and others;</li>
            <li>product and market information; and</li>
            <li>any information marked &quot;confidential&quot; or which the Vendor&apos;s Agent informs the Prospective Purchaser is confidential or a trade secret;</li>
          </ol>
          <p className='mt-1'>but excluding:</p>
          <ol type='I' start={4} className='pl-5 mt-1 space-y-1'>
            <li>information available to the public (other than through disclosure by the Prospective Purchaser or by a person to whom the Prospective Purchaser disclosed the Confidential Information);</li>
            <li>information which the Prospective Purchaser can prove it lawfully possessed before obtaining it from the Vendor&apos;s Agent.</li>
          </ol>
        </li>
      </ol>

      <p><strong>By clicking SUBMIT, you agree to the terms of this Confidentiality Agreement.</strong></p>

      <ol className='list-decimal pl-5 space-y-2 mb-2'>
        <li>
          <strong>You undertake to:</strong>
          <ol type='a' className='pl-5 mt-1 space-y-1'>
            <li>take all steps necessary to safeguard the confidentiality of the Confidential Information;</li>
            <li>only use the Confidential Information for the Purpose or with written consent of the Vendor&apos;s Agent;</li>
            <li>not copy, reproduce, or extract any part of the Confidential Information except in accordance with this Agreement;</li>
            <li>only disclose the Confidential Information to professional advisers for the Purpose, or as required by law;</li>
            <li>not use the Confidential Information for any purpose other than the Purpose;</li>
            <li>not make direct contact with the Vendor or any member of the Vendor&apos;s staff without prior written consent of the Vendor&apos;s Agent; and</li>
            <li>not enter into any negotiations or agreement to purchase the business except through the Vendor&apos;s Agent.</li>
          </ol>
        </li>
        <li>
          <strong>You acknowledge that:</strong>
          <ol type='a' className='pl-5 mt-1 space-y-1'>
            <li>the Confidential Information has commercial value and is the property of the Vendor;</li>
            <li>the intellectual property rights in the Confidential Information remain the exclusive property of the Vendor;</li>
            <li>the Vendor may suffer substantial damage as a result of any unauthorised disclosure;</li>
            <li>the Vendor&apos;s Agent is entitled to specific performance or injunctive relief for any actual or threatened breach.</li>
          </ol>
        </li>
        <li>The Vendor&apos;s Agent does not guarantee or warrant the accuracy, completeness, or truthfulness of any Confidential Information provided.</li>
        <li>
          <strong>You agree to:</strong>
          <ol type='a' className='pl-5 mt-1 space-y-1'>
            <li>immediately report to the Vendor&apos;s Agent any unauthorised access or improper use of the Confidential Information; and</li>
            <li>immediately return all Confidential Information upon request if negotiations cease.</li>
          </ol>
        </li>
        <li>You agree to indemnify the Vendor&apos;s Agent against any claim, loss, damage, cost and expense arising from a breach of this Agreement.</li>
        <li>This Agreement survives completion of the Purpose and any related agreement.</li>
        <li>The Prospective Purchaser must not assign any rights or obligations under this Agreement without prior written consent.</li>
        <li>This agreement is governed by the laws of Victoria.</li>
      </ol>

      <p className='italic mt-3'>
        By clicking the &quot;Submit&quot; button on this form, you acknowledge that you have read and understood,
        and agree to be bound by, the terms of this Agreement. You agree that this action constitutes valid
        electronic acceptance and satisfies the requirements for signature under the{' '}
        <em>Electronic Transactions (Victoria) Act 2000</em> (Vic), and that this Agreement is legally binding
        without the need for a handwritten signature.
      </p>
    </div>
  );
}
