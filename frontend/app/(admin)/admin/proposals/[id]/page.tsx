'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CloudUpload,
  Plus,
  Trash2,
  Loader2,
  CheckCircle,
  Save,
} from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import { scrollToError } from '@/lib/scroll-to-error';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/proposal/rich-text-editor';
import {
  ProposalBanner,
  ProposalDisclaimer,
  ProposalFinancialOverview,
  ProposalBusinessAppraisal,
  YourInvestment,
  MediaReviews,
  TheProcess,
  AboutBlackmont,
  ContactUs,
} from '@/components/proposal';
import { BROKERS } from '@/lib/data/brokers-list';

const TERMS = ['30', '60', '90', '120', '150', '180', '270', '360'];

const inputCls =
  'h-10 rounded-none border-secondary/15 bg-background shadow-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/15';
const selectCls =
  'w-full h-10 px-3 rounded-none border border-secondary/15 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent';
const selectDisabledCls =
  'w-full h-10 px-3 rounded-none border border-secondary/15 text-sm bg-muted text-muted-foreground';

const DEFAULT_FORM = {
  template: 'business_appraisal',
  businessName: '',
  businessValue: '',
  brokerName: '',
  brokerEmail: '',
  financialAssumptions: '',
  customerEmail: '',
  customerName: '',
  agreementTerm: '90',
  businessAddress: '',
  listingPrice: '',
  performanceBonus: '',
  salePrice: '',
  engagementFee: '',
  advertisement: [
    {
      text: 'No Advertisement<br>Internal Website Listing<br>Preparation of Sales Materials<br>Preparation of Sales Memorandum',
      amount: '',
      unit: 'Dollar',
    },
  ],
  successFee: [
    {
      text: 'Successful settlement of business sale<br>Invoice paid upon unconditional sale of business<br>No sale = no success fee<br>Inspections conducted by business owner',
      amount: '',
      unit: 'Percentage',
    },
  ],
};

export default function ProposalFormPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params?.id === 'new';

  const [formData, setFormData] = useState(DEFAULT_FORM);
  const formRef = useRef<HTMLDivElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load existing proposal for editing
  useEffect(() => {
    if (isNew) return;
    apiClient
      .get(`/api/digital-proposals/${params.id}`)
      .then(({ data }) => {
        const p = data.proposal ?? data;
        setFormData({
          template: p.template || 'business_appraisal',
          businessName: p.businessName || '',
          businessValue: p.businessValue || '',
          brokerName: p.brokerName || '',
          brokerEmail: p.brokerEmail || '',
          financialAssumptions: p.financialAssumptions || '',
          customerEmail: p.customerEmail || '',
          customerName: p.customerName || '',
          agreementTerm: p.agreementTerm || '90',
          businessAddress: p.businessAddress || '',
          listingPrice: p.listingPrice || '',
          performanceBonus: p.performanceBonus || '',
          salePrice: p.salePrice || '',
          engagementFee: p.engagementFee || '',
          advertisement: p.advertisement?.length
            ? p.advertisement
            : DEFAULT_FORM.advertisement,
          successFee: p.successFee?.length
            ? p.successFee
            : DEFAULT_FORM.successFee,
        });
        if (p.backgroundImage) setImagePreview(p.backgroundImage);
      })
      .catch(() =>
        setMessage({ type: 'error', text: 'Failed to load proposal.' }),
      )
      .finally(() => setLoading(false));
  }, [isNew, params?.id]); // eslint-disable-line

  const handleInputChange = (field: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(String(reader.result));
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  // Add / Remove success fee
  const addSuccessFee = () => {
    if (formData.successFee && formData.successFee.length < 3) {
      const incompleteIndex = formData.successFee.findIndex(
        (fee) => !fee.text || !fee.amount,
      );
      if (incompleteIndex !== -1) {
        setMessage({
          type: 'error',
          text: `Please complete Success Fee Option ${incompleteIndex + 1} before adding another one.`,
        });
        return;
      }
      handleInputChange('successFee', [
        ...formData.successFee,
        { text: '', amount: '', unit: 'Percentage' },
      ]);
      setMessage(null);
    }
  };

  const removeSuccessFee = (index: number) => {
    if (formData.successFee && formData.successFee.length > 1) {
      handleInputChange(
        'successFee',
        formData.successFee.filter((_, i) => i !== index),
      );
    }
  };

  // Add / Remove advertisement
  const addAdvertisement = () => {
    if (formData.advertisement && formData.advertisement.length < 3) {
      const incompleteIndex = formData.advertisement.findIndex(
        (ad) => !ad.text || !ad.amount,
      );
      if (incompleteIndex !== -1) {
        setMessage({
          type: 'error',
          text: `Please complete Advertisement Option ${incompleteIndex + 1} before adding another one.`,
        });
        return;
      }
      handleInputChange('advertisement', [
        ...formData.advertisement,
        { text: '', amount: '', unit: 'Dollar' },
      ]);
      setMessage(null);
    }
  };

  const removeAdvertisement = (index: number) => {
    if (formData.advertisement && formData.advertisement.length > 1) {
      handleInputChange(
        'advertisement',
        formData.advertisement.filter((_, i) => i !== index),
      );
    }
  };

  // Save
  const handleSave = async () => {
    setMessage(null);
    const isBusinessAppraisal = formData.template === 'business_appraisal';

    // Required field checks — scroll to first empty field
    const requiredFields: { field: string; value: unknown; label: string }[] = [
      {
        field: 'businessName',
        value: formData.businessName,
        label: 'Business Name',
      },
      ...(isBusinessAppraisal
        ? [
            {
              field: 'businessValue',
              value: formData.businessValue,
              label: 'Business Value',
            },
          ]
        : []),
      {
        field: 'brokerName',
        value: formData.brokerName,
        label: 'Prepared By (Broker)',
      },
      {
        field: 'businessAddress',
        value: formData.businessAddress,
        label: 'Business Address',
      },
      {
        field: 'listingPrice',
        value: formData.listingPrice,
        label: 'Listing Price',
      },
      {
        field: 'customerEmail',
        value: formData.customerEmail,
        label: 'Customer Email',
      },
      {
        field: 'customerName',
        value: formData.customerName,
        label: 'Customer Name',
      },
      ...(isBusinessAppraisal
        ? [
            {
              field: 'financialAssumptions',
              value: formData.financialAssumptions,
              label: 'Financial Assumptions',
            },
          ]
        : []),
    ];

    for (const { field, value, label } of requiredFields) {
      if (!value) {
        setMessage({ type: 'error', text: `${label} is required.` });
        scrollToError(field, formRef.current);
        return;
      }
    }

    // Validate advertisement fields
    if (formData.advertisement && formData.advertisement.length > 0) {
      for (let i = 0; i < formData.advertisement.length; i++) {
        const ad = formData.advertisement[i];
        if (!ad.text || !ad.amount) {
          setMessage({
            type: 'error',
            text: `Please fill in all fields for Advertisement Option ${i + 1}. Both description and amount are required.`,
          });
          scrollToError(`advertisement-${i}`, formRef.current);
          return;
        }
      }
    }

    // Validate success fee fields
    if (formData.successFee && formData.successFee.length > 0) {
      for (let i = 0; i < formData.successFee.length; i++) {
        const fee = formData.successFee[i];
        if (!fee.text || !fee.amount) {
          setMessage({
            type: 'error',
            text: `Please fill in all fields for Success Fee Option ${i + 1}. Both description and amount are required.`,
          });
          scrollToError(`successFee-${i}`, formRef.current);
          return;
        }
      }
    }

    setSaving(true);
    const fd = new FormData();
    fd.append('businessName', formData.businessName);
    fd.append('businessValue', formData.businessValue);
    fd.append('brokerName', formData.brokerName);
    fd.append('brokerEmail', formData.brokerEmail || '');
    fd.append('financialAssumptions', formData.financialAssumptions || '');
    fd.append('customerEmail', formData.customerEmail || '');
    fd.append('customerName', formData.customerName || '');
    fd.append('agreementTerm', formData.agreementTerm || '90');
    fd.append('businessAddress', formData.businessAddress || '');
    fd.append('listingPrice', formData.listingPrice || '');
    fd.append('performanceBonus', formData.performanceBonus || '');
    fd.append('salePrice', formData.salePrice || '');
    fd.append('engagementFee', formData.engagementFee || '0');
    fd.append('advertisement', JSON.stringify(formData.advertisement || []));
    fd.append('successFee', JSON.stringify(formData.successFee || []));
    fd.append('template', formData.template || 'business_appraisal');
    if (imageFile) fd.append('backgroundImage', imageFile);

    try {
      if (isNew) {
        await apiClient.post('/api/digital-proposals', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await apiClient.put(`/api/digital-proposals/${params.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setMessage({
        type: 'success',
        text: isNew
          ? 'Proposal created successfully!'
          : 'Proposal updated successfully!',
      });
      setTimeout(() => router.push('/admin/proposals'), 1500);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      setMessage({
        type: 'error',
        text:
          err?.response?.data?.message ||
          'An error occurred while saving the proposal.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <Loader2 className='w-6 h-6 animate-spin text-accent' />
      </div>
    );
  }

  const isAppraisal = formData.template === 'business_appraisal';

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-7rem)] -m-6'>
      {/* ===== FORM SECTION — Left Side ===== */}
      <div
        ref={formRef}
        className='lg:col-span-2 overflow-y-auto p-6 space-y-4'
      >
        {/* Header */}
        <div className='bg-card border border-border p-5'>
          <Link href='/admin/proposals'>
            <Button
              variant='ghost'
              size='sm'
              className='gap-1.5 mb-3 -ml-2 text-muted-foreground hover:text-foreground'
            >
              <ArrowLeft className='w-4 h-4' /> Back to List
            </Button>
          </Link>
          <h1 className='text-xl font-bold text-secondary'>
            {isNew ? 'Create New Proposal' : 'Edit Proposal'}
          </h1>
        </div>

        {/* Alert */}
        {message && (
          <div
            className={`flex items-center gap-2.5 p-4 text-sm font-medium ${
              message.type === 'success'
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {message.type === 'success' && (
              <CheckCircle className='w-4 h-4 shrink-0' />
            )}
            {message.text}
          </div>
        )}

        <div className='bg-card border border-border p-5 space-y-5'>
          {/* Template Selection */}
          <Field label='Template Type' required>
            <select
              value={formData.template}
              onChange={(e) => handleInputChange('template', e.target.value)}
              className={selectCls}
            >
              <option value='business_appraisal'>Business Appraisal</option>
              <option value='franchise_proposal'>Franchise Proposal</option>
            </select>
          </Field>

          {/* Business Name & Value */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field label='Business Name' required>
              <Input
                name='businessName'
                value={formData.businessName}
                onChange={(e) =>
                  handleInputChange('businessName', e.target.value)
                }
                placeholder='Enter the business name'
                className={inputCls}
              />
            </Field>
            {isAppraisal && (
              <Field label='Business Value' required>
                <Input
                  name='businessValue'
                  value={formData.businessValue}
                  onChange={(e) =>
                    handleInputChange('businessValue', e.target.value)
                  }
                  placeholder='e.g., $2.1M-2.3M + SAV'
                  className={inputCls}
                />
              </Field>
            )}
          </div>

          {/* Agreement Term & Broker */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field label='Agreement Term' required>
              <select
                value={formData.agreementTerm}
                onChange={(e) =>
                  handleInputChange('agreementTerm', e.target.value)
                }
                className={selectCls}
              >
                {TERMS.map((t) => (
                  <option key={t} value={t}>
                    {t} days
                  </option>
                ))}
              </select>
            </Field>
            <Field label='Prepared By (Broker)' required>
              <select
                name='brokerName'
                value={formData.brokerName}
                onChange={(e) => {
                  const b = BROKERS.find((b) => b.name === e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    brokerName: e.target.value,
                    brokerEmail: b?.email ?? '',
                  }));
                }}
                className={selectCls}
              >
                <option value=''>Select Broker</option>
                {BROKERS.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Business Address & Listing Price */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field label='Business Address' required>
              <Input
                name='businessAddress'
                value={formData.businessAddress}
                onChange={(e) =>
                  handleInputChange('businessAddress', e.target.value)
                }
                placeholder='Enter business address'
                className={inputCls}
              />
            </Field>
            <Field label='Listing Price' required>
              <Input
                name='listingPrice'
                type='number'
                value={formData.listingPrice}
                onChange={(e) =>
                  handleInputChange('listingPrice', e.target.value)
                }
                placeholder='e.g., 2500000'
                className={inputCls}
              />
            </Field>
          </div>

          {/* Background Image */}
          <div>
            <Label className='text-sm font-medium text-foreground mb-2 block'>
              Background Image
            </Label>
            <Button
              type='button'
              variant='outline'
              className='w-full gap-2 rounded-none'
              onClick={() => fileRef.current?.click()}
            >
              <CloudUpload className='w-4 h-4' />
              Upload Background Image
            </Button>
            <p className='text-xs text-muted-foreground/70 italic mt-1'>
              Maximum file size: 5MB
            </p>
            <input
              ref={fileRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className='mt-2 overflow-hidden border border-border'>
                <img
                  src={imagePreview}
                  alt='Background Preview'
                  className='w-full h-[200px] object-cover block'
                />
              </div>
            )}
          </div>

          {/* Customer Email & Name */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field label='Customer Email' required>
              <Input
                name='customerEmail'
                type='email'
                value={formData.customerEmail}
                onChange={(e) =>
                  handleInputChange('customerEmail', e.target.value)
                }
                placeholder='customer@example.com'
                className={inputCls}
              />
            </Field>
            <Field label='Customer Name' required>
              <Input
                name='customerName'
                value={formData.customerName}
                onChange={(e) =>
                  handleInputChange('customerName', e.target.value)
                }
                placeholder='Enter customer name'
                className={inputCls}
              />
            </Field>
          </div>

          {/* Financial Assumptions - Business Appraisal only */}
          {isAppraisal && (
            <div data-field='financialAssumptions'>
              <Label className='text-sm font-medium text-foreground mb-2 block'>
                Financial Assumptions <span className='text-red-500'>*</span>
              </Label>
              <RichTextEditor
                value={formData.financialAssumptions}
                onChange={(value) =>
                  handleInputChange('financialAssumptions', value)
                }
                placeholder='Enter financial assumptions, market conditions, and other relevant details...'
              />
            </div>
          )}
        </div>

        {/* Advertisement Section */}
        <div className='bg-card border border-border p-5 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-secondary'>Advertisement</h2>
            {formData.advertisement && formData.advertisement.length < 3 && (
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addAdvertisement}
                className='gap-1'
              >
                <Plus className='w-3.5 h-3.5' /> Add More
              </Button>
            )}
          </div>
          {formData.advertisement?.map((ad, index) => (
            <div
              key={index}
              data-field={`advertisement-${index}`}
              className='border border-border p-4 space-y-3'
            >
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-foreground'>
                  Advertisement Option {index + 1}
                </span>
                {index > 0 && (
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => removeAdvertisement(index)}
                    className='gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600'
                  >
                    <Trash2 className='w-3.5 h-3.5' /> Remove
                  </Button>
                )}
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground mb-1 block'>
                  Description
                </Label>
                <RichTextEditor
                  value={ad.text || ''}
                  onChange={(value) => {
                    const newAd = [...formData.advertisement];
                    newAd[index] = { ...newAd[index], text: value };
                    handleInputChange('advertisement', newAd);
                  }}
                  placeholder='Enter advertisement description...'
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <Field label={`Amount ${index + 1}`}>
                  <Input
                    type='number'
                    value={ad.amount}
                    onChange={(e) => {
                      const newAd = [...formData.advertisement];
                      newAd[index] = {
                        ...newAd[index],
                        amount: e.target.value,
                      };
                      handleInputChange('advertisement', newAd);
                    }}
                    placeholder='e.g., 1500'
                    className={inputCls}
                  />
                </Field>
                <Field label={`Unit ${index + 1}`}>
                  <select
                    value={ad.unit}
                    disabled
                    className={selectDisabledCls}
                  >
                    <option value='Dollar'>Dollar ($)</option>
                    <option value='Percentage'>Percentage (%)</option>
                  </select>
                </Field>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Fee */}
        <div className='bg-card border border-border p-5 space-y-4'>
          <h2 className='font-semibold text-secondary'>Engagement Fee</h2>
          <div className='border border-border p-4'>
            <div className='max-w-xs'>
              <Field label='Amount'>
                <Input
                  type='number'
                  value={formData.engagementFee}
                  onChange={(e) =>
                    handleInputChange('engagementFee', e.target.value)
                  }
                  placeholder='e.g., 5000'
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Success Fee Section */}
        <div className='bg-card border border-border p-5 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-secondary'>Success Fee</h2>
            {formData.successFee && formData.successFee.length < 3 && (
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addSuccessFee}
                className='gap-1'
              >
                <Plus className='w-3.5 h-3.5' /> Add More
              </Button>
            )}
          </div>
          {formData.successFee?.map((fee, index) => (
            <div
              key={index}
              data-field={`successFee-${index}`}
              className='border border-border p-4 space-y-3'
            >
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-foreground'>
                  Success Fee Option {index + 1}{' '}
                  {index === 0 ? '(Required)' : '(Optional)'}
                </span>
                {index > 0 && (
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => removeSuccessFee(index)}
                    className='gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600'
                  >
                    <Trash2 className='w-3.5 h-3.5' /> Remove
                  </Button>
                )}
              </div>
              <div>
                <Label className='text-sm font-medium text-muted-foreground mb-1 block'>
                  Description <span className='text-red-500'>*</span>
                </Label>
                <RichTextEditor
                  value={fee.text || ''}
                  onChange={(value) => {
                    const newFee = [...formData.successFee];
                    newFee[index] = { ...newFee[index], text: value };
                    handleInputChange('successFee', newFee);
                  }}
                  placeholder='Enter success fee description... (Required)'
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <Field label={`Amount ${index + 1}`}>
                  <Input
                    type='number'
                    value={fee.amount}
                    onChange={(e) => {
                      const newFee = [...formData.successFee];
                      newFee[index] = {
                        ...newFee[index],
                        amount: e.target.value,
                      };
                      handleInputChange('successFee', newFee);
                    }}
                    placeholder='e.g., 7'
                    className={inputCls}
                  />
                </Field>
                <Field label={`Unit ${index + 1}`}>
                  <select
                    value={fee.unit}
                    onChange={(e) => {
                      const newFee = [...formData.successFee];
                      newFee[index] = {
                        ...newFee[index],
                        unit: e.target.value,
                      };
                      handleInputChange('successFee', newFee);
                    }}
                    className={selectCls}
                  >
                    <option value='Dollar'>Dollar ($)</option>
                    <option value='Percentage'>Percentage (%)</option>
                  </select>
                </Field>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Bonus & Sale Price */}
        <div className='bg-card border border-border p-5 space-y-4'>
          <h2 className='font-semibold text-secondary'>Additional Details</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field label='Performance Bonus'>
              <Input
                type='number'
                value={formData.performanceBonus}
                onChange={(e) =>
                  handleInputChange('performanceBonus', e.target.value)
                }
                placeholder='e.g., 50000'
                className={inputCls}
              />
            </Field>
            <Field label='Sale Price'>
              <Input
                type='number'
                value={formData.salePrice}
                onChange={(e) => handleInputChange('salePrice', e.target.value)}
                placeholder='e.g., 2300000'
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        {/* Save Button */}
        <div className='bg-card border border-border p-5'>
          <Button
            onClick={handleSave}
            disabled={saving}
            className='h-11 w-full gap-2 rounded-none bg-accent font-semibold text-primary hover:bg-accent-light'
          >
            {saving ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' /> Saving...
              </>
            ) : (
              <>
                <Save className='w-4 h-4' />{' '}
                {isNew ? 'Save Proposal' : 'Update Proposal'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ===== PREVIEW SECTION — Right Side (sticky) ===== */}
      <div className='lg:col-span-3 overflow-y-auto p-6 pl-0'>
        <div className='bg-card border border-border overflow-hidden'>
          <div className='px-5 py-4 border-b border-border'>
            <h2 className='font-semibold text-secondary'>Preview</h2>
          </div>
          <div>
            {/* Banner Section */}
            <ProposalBanner
              businessName={formData.businessName || '[Business Name]'}
              businessValue={formData.businessValue || '[Business Value]'}
              backgroundImage={imagePreview || undefined}
              template={formData.template}
            />

            <div className='px-4'>
              {/* Disclaimer */}
              <ProposalDisclaimer template={formData.template} />

              {/* Financial Overview - Business Appraisal only */}
              {isAppraisal && (
                <ProposalFinancialOverview
                  financialAssumptions={formData.financialAssumptions}
                />
              )}

              {/* Business Appraisal - Business Appraisal only */}
              {isAppraisal && (
                <ProposalBusinessAppraisal
                  businessName={formData.businessName}
                  businessValue={formData.businessValue}
                  brokerName={formData.brokerName}
                />
              )}

              {/* Your Investment */}
              <YourInvestment
                advertisement={formData.advertisement}
                successFee={formData.successFee}
                engagementFee={formData.engagementFee}
                setSelectedAdvertisement={() => {}}
                setSelectedSuccessFee={() => {}}
              />

              {/* Media & Reviews */}
              <MediaReviews />

              {/* The Process */}
              <TheProcess />

              {/* About Blackmont Advisory */}
              <AboutBlackmont />

              {/* Contact Us */}
              <ContactUs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-1.5'>
      <Label className='text-sm font-medium text-foreground'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      {children}
    </div>
  );
}
